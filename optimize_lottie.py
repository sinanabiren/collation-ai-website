#!/usr/bin/env python3
import json
import sys
import re
from pathlib import Path

def round_number(n, precision=2):
    """Round numbers to reduce file size"""
    if isinstance(n, (int, float)):
        if isinstance(n, int):
            return n
        # Round to specified precision
        return round(n, precision)
    return n

def optimize_value(value, precision=2):
    """Recursively optimize values in the JSON structure"""
    if isinstance(value, dict):
        return {k: optimize_value(v, precision) for k, v in value.items()}
    elif isinstance(value, list):
        return [optimize_value(item, precision) for item in value]
    elif isinstance(value, float):
        return round_number(value, precision)
    return value

def optimize_lottie(input_file, output_file, precision=2):
    """Optimize a Lottie JSON file"""
    print(f"Optimizing {input_file}...")

    # Read the file
    with open(input_file, 'r') as f:
        data = json.load(f)

    original_size = Path(input_file).stat().st_size

    # Remove metadata that's not needed
    if 'metadata' in data:
        del data['metadata']

    # Optimize numeric precision
    data = optimize_value(data, precision)

    # Write optimized file
    with open(output_file, 'w') as f:
        # Use separators without spaces to reduce size
        json.dump(data, f, separators=(',', ':'))

    optimized_size = Path(output_file).stat().st_size
    reduction = (1 - optimized_size / original_size) * 100

    print(f"  Original: {original_size / 1024 / 1024:.2f}MB")
    print(f"  Optimized: {optimized_size / 1024 / 1024:.2f}MB")
    print(f"  Reduction: {reduction:.1f}%")

    return reduction

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
        output_file = sys.argv[2] if len(sys.argv) > 2 else input_file
        optimize_lottie(input_file, output_file)
    else:
        print("Usage: python3 optimize_lottie.py <input.json> [output.json]")
