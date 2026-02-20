# Vendor Management System

This directory contains automated scripts for managing vendor integrations on the Collation AI website.

## Quick Start: Adding New Vendors

### Every 2 Weeks Workflow

**Step 1: Prepare Your Data**

Create a CSV file with your new vendors:

```csv
name,category,logo_filename,status
Adminis,direct,Adminis.png,active
Advyzon,direct,Advyzon.png,pipeline
Bill,direct,Bill.png,active
```

- **name**: Full vendor name (e.g., "LGT Wealth Management Australia")
- **category**: `direct` or `partner`
- **logo_filename**: Logo file name (e.g., "Vendor-Name.png") - leave blank if no logo
- **status**: `active`, `pipeline`, or `deprecated`

**Step 2: Collect Logos**

Put all vendor logos (PNG format, transparent background preferred) in one folder.

**Step 3: Run the Script**

```bash
cd /Users/sinanbiren/Documents/websiteclone

# If logos are in the same directory as CSV:
node scripts/add-vendors.js path/to/new-vendors.csv path/to/logos-folder

# Example:
node scripts/add-vendors.js ~/Desktop/new-vendors.csv ~/Desktop/logos
```

**Step 4: Verify Changes**

```bash
# Review what changed
git diff

# Test the site
npm run dev
# Visit http://localhost:3000/connections

# Verify counts and logos display correctly
```

**Step 5: Commit**

```bash
git add .
git commit -m "Add new vendors: Vendor1, Vendor2, Vendor3"
git push
```

## What the Script Does Automatically

✅ **Adds vendors to data.ts** in alphabetical order
✅ **Copies logos** to public/assets/vendor-logos/
✅ **Updates logo mappings** in data.ts
✅ **Updates counts** in connections/page.tsx (Total, Direct, Partner)
✅ **Updates AI Chatbot knowledge base** with new vendor names
✅ **Updates integration counts** in multiple places

## Manual Alternative (Not Recommended)

If you prefer to add vendors manually:

1. Edit `app/connections/data.ts`:
   - Add vendor entry to `direct` or `partner` array (keep alphabetical)
   - Add logo mapping to `logoData` object

2. Copy logo to `public/assets/vendor-logos/`

3. Update counts in `app/connections/page.tsx`:
   ```typescript
   const stats = {
     total: X,    // Update this
     direct: Y,   // Update this
     partner: Z,  // Update this
   };
   ```

4. Update `lib/knowledge/product-info.ts`:
   - Update total count in "## Connections & Integrations"
   - Add vendor names to categorized lists
   - Update comprehensive vendor list
   - Update "When Users Ask About Integrations" section
   - Update "## Collation AI Integration Ecosystem" section

**This is tedious and error-prone - use the script instead!**

## Troubleshooting

### "Could not find insertion position"
- Check that data.ts is properly formatted
- Ensure there are no syntax errors in the arrays

### "Logo file not found"
- Verify the logo filename matches exactly (case-sensitive)
- Ensure logos are in the directory you specified
- Check file extensions (.png, .jpg, etc.)

### Counts don't match
- Run the script again - it will update counts automatically
- Or manually verify vendor entries in data.ts

### Chatbot doesn't know about new vendors
- Verify vendors were added to product-info.ts
- Restart the dev server to reload knowledge base
- Check browser console for API errors

## Advanced: Bulk Operations

### Adding 20+ Vendors at Once

The script handles any number of vendors efficiently:

```csv
name,category,logo_filename,status
Vendor 1,direct,vendor1.png,active
Vendor 2,direct,vendor2.png,active
Vendor 3,partner,,active
...
Vendor 20,partner,vendor20.png,pipeline
```

### Updating Existing Vendors

To update a vendor (change category, status, or logo):
1. Manually edit the entry in data.ts
2. Run the update-counts script (if we create one)

### Removing Vendors

To remove a vendor:
1. Delete the entry from data.ts (direct or partner array)
2. Delete the logo from public/assets/vendor-logos/
3. Remove logo mapping from logoData
4. Update counts manually or re-run add-vendors with empty CSV

## File Structure

```
scripts/
├── add-vendors.js         # Main automation script
├── vendors-template.csv   # CSV template
└── README.md             # This file

app/connections/
├── data.ts               # Vendor data source
└── page.tsx              # Connections page (counts)

lib/knowledge/
└── product-info.ts       # AI Chatbot knowledge base

public/assets/vendor-logos/
└── *.png                 # All vendor logos
```

## Best Practices

### Logo Guidelines
- **Format**: PNG with transparent background
- **Size**: 200x200px to 500x500px recommended
- **File naming**: Match vendor name, use hyphens for spaces
  - ✅ `LGT-Wealth-Management.png`
  - ✅ `lgt-wealth-management.png`
  - ❌ `LGT Wealth Management.png` (has spaces)

### CSV Guidelines
- Use UTF-8 encoding
- No commas in vendor names (use semicolons if needed)
- Test with 1-2 vendors first before bulk adding
- Keep a backup of the CSV for your records

### Git Workflow
- Review diffs before committing
- Use descriptive commit messages
- Tag releases after adding major vendor batches
- Keep main branch stable

## Future Enhancements

Potential improvements for the future:
- Web UI for adding vendors (drag-and-drop)
- Vendor validation (check for duplicates)
- Logo optimization (auto-resize, compress)
- Integration testing
- Vendor search/filter in script
- Export current vendors to CSV
- Undo/rollback functionality

## Need Help?

If you encounter issues:
1. Check this README
2. Review git diff to see what changed
3. Test with vendors-template.csv first
4. Check browser console for errors
5. Verify file permissions

---

**Last Updated**: February 2026
**Script Version**: 1.0
