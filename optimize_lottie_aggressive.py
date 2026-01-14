#!/usr/bin/env python3
import json
import sys
import re
import base64
from io import BytesIO
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Installing Pillow for image optimization...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow", "-q"])
    from PIL import Image

def optimize_base64_image(base64_str, quality=60):
    """Optimize a base64 encoded image"""
    try:
        # Extract the base64 data
        if ',' in base64_str:
            header, data = base64_str.split(',', 1)
        else:
            return base64_str

        # Decode the base64 image
        img_data = base64.b64decode(data)
        img = Image.open(BytesIO(img_data))

        # Convert RGBA to RGB if necessary
        if img.mode == 'RGBA':
            # Create white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3] if len(img.split()) > 3 else None)
            img = background

        # Optimize and save as JPEG
        output = BytesIO()
        img.save(output, format='JPEG', quality=quality, optimize=True)
        optimized_data = output.getvalue()

        # Re-encode to base64
        optimized_base64 = base64.b64encode(optimized_data).decode('utf-8')

        # Calculate reduction
        original_size = len(data)
        optimized_size = len(optimized_base64)
        reduction = (1 - optimized_size / original_size) * 100

        print(f"    Image optimized: {original_size/1024:.1f}KB -> {optimized_size/1024:.1f}KB ({reduction:.1f}% reduction)")

        return f"data:image/jpeg;base64,{optimized_base64}"
    except Exception as e:
        print(f"    Could not optimize image: {e}")
        return base64_str

def round_number(n, precision=1):
    """Round numbers to reduce file size"""
    if isinstance(n, (int, float)):
        if isinstance(n, int):
            return n
        # Round to specified precision
        rounded = round(n, precision)
        # Convert to int if it's a whole number
        if rounded == int(rounded):
            return int(rounded)
        return rounded
    return n

def optimize_value(value, precision=1, optimize_images=True, image_quality=60):
    """Recursively optimize values in the JSON structure"""
    if isinstance(value, dict):
        # Check if this is an asset with an embedded image
        if optimize_images and 'p' in value and isinstance(value.get('p'), str) and value['p'].startswith('data:image'):
            optimized_dict = {k: v for k, v in value.items()}
            optimized_dict['p'] = optimize_base64_image(value['p'], image_quality)
            # Optimize other values
            for k, v in value.items():
                if k != 'p':
                    optimized_dict[k] = optimize_value(v, precision, optimize_images, image_quality)
            return optimized_dict
        else:
            return {k: optimize_value(v, precision, optimize_images, image_quality) for k, v in value.items()}
    elif isinstance(value, list):
        return [optimize_value(item, precision, optimize_images, image_quality) for item in value]
    elif isinstance(value, float):
        return round_number(value, precision)
    return value

def optimize_lottie(input_file, output_file, precision=1, optimize_images=True, image_quality=60):
    """Optimize a Lottie JSON file"""
    print(f"\nOptimizing {input_file}...")
    print(f"  Settings: precision={precision}, optimize_images={optimize_images}, image_quality={image_quality}")

    # Read the file
    with open(input_file, 'r') as f:
        data = json.load(f)

    original_size = Path(input_file).stat().st_size

    # Remove metadata that's not needed
    if 'metadata' in data:
        del data['metadata']

    # Remove markers if present (timeline markers, usually not needed)
    if 'markers' in data and len(data.get('markers', [])) == 0:
        del data['markers']

    # Optimize numeric precision and images
    data = optimize_value(data, precision, optimize_images, image_quality)

    # Write optimized file
    with open(output_file, 'w') as f:
        # Use separators without spaces to reduce size
        json.dump(data, f, separators=(',', ':'))

    optimized_size = Path(output_file).stat().st_size
    reduction = (1 - optimized_size / original_size) * 100

    print(f"\n  Final Results:")
    print(f"  Original: {original_size / 1024 / 1024:.2f}MB")
    print(f"  Optimized: {optimized_size / 1024 / 1024:.2f}MB")
    print(f"  Reduction: {reduction:.1f}%\n")

    return reduction

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
        output_file = sys.argv[2] if len(sys.argv) > 2 else input_file

        # Get quality parameter if provided (default 60)
        quality = int(sys.argv[3]) if len(sys.argv) > 3 else 60

        optimize_lottie(input_file, output_file, precision=1, optimize_images=True, image_quality=quality)
    else:
        print("Usage: python3 optimize_lottie_aggressive.py <input.json> [output.json] [quality=60]")
        print("  quality: 1-100, lower = smaller file but worse quality (default: 60)")
