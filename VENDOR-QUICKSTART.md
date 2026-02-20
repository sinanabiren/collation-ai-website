# Quick Start: Adding New Vendors Every 2 Weeks

## 🎯 The 5-Minute Process

### Step 1: Create CSV (1 minute)

Create a file `new-vendors.csv`:

```csv
name,category,logo_filename,status
Adminis,direct,Adminis.png,pipeline
Advyzon,direct,Advyzon.png,pipeline
Bill,direct,Bill.png,active
```

**Fields:**
- `name`: Full vendor name
- `category`: `direct` or `partner`
- `logo_filename`: Logo file name (leave blank if no logo)
- `status`: `active`, `pipeline`, or `deprecated`

### Step 2: Collect Logos (1 minute)

Put all PNG logos in one folder (e.g., `~/Desktop/new-logos/`)

### Step 3: Run Script (30 seconds)

```bash
cd /Users/sinanbiren/Documents/websiteclone
node scripts/add-vendors.js ~/Desktop/new-vendors.csv ~/Desktop/new-logos
```

### Step 4: Verify (1 minute)

```bash
# Check everything is correct
node scripts/verify-vendors.js

# Test the site
npm run dev
# Visit http://localhost:3000/connections
```

### Step 5: Commit (1 minute)

```bash
git add .
git commit -m "Add new vendors: Vendor1, Vendor2, Vendor3"
git push
```

---

## 📋 What Gets Updated Automatically

✅ **app/connections/data.ts**
- Vendors added in alphabetical order
- Logo mappings created
- File size stays optimized (uses PNG paths, not base64)

✅ **app/connections/page.tsx**
- Total count updated
- Direct count updated
- Partner count updated

✅ **lib/knowledge/product-info.ts (AI Chatbot)**
- Total integration count
- Direct integration count
- Vendor names added to categorized lists
- Comprehensive vendor list updated
- All statistics updated throughout file

✅ **public/assets/vendor-logos/**
- Logo files copied automatically

---

## 🔧 Troubleshooting

### Browser shows "Connection Refused"
**Solution**: Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

### Logos not showing
**Solution**:
1. Check logo files are PNG format
2. Verify filenames match exactly (case-sensitive)
3. Hard refresh browser
4. Check browser console for 404 errors

### Counts don't match
**Solution**: Run `node scripts/verify-vendors.js` - it will show you what's wrong

### Script errors
**Solution**:
1. Make sure CSV is properly formatted (no quotes around values)
2. Check logo files exist in the directory you specified
3. Verify you're in the project root directory

---

## 📊 Verification Command

Always run this after adding vendors:

```bash
node scripts/verify-vendors.js
```

This checks:
- All counts match across all files ✓
- All logos are present ✓
- Recent vendors listed ✓

---

## 🎨 Logo Guidelines

**Recommended:**
- Format: PNG with transparent background
- Size: 200x200px to 500x500px
- File naming: Match vendor name
  - Good: `Vendor-Name.png`
  - Bad: `Vendor Name.png` (has spaces)

**If you don't have a logo:** Just leave `logo_filename` blank in CSV

---

## 📁 File Locations

```
scripts/
├── add-vendors.js         ← Main script
├── verify-vendors.js      ← Verification tool
├── vendors-template.csv   ← CSV example
└── README.md             ← Full documentation

app/connections/
├── data.ts               ← Vendor database
└── page.tsx              ← Counts displayed here

lib/knowledge/
└── product-info.ts       ← AI Chatbot knowledge

public/assets/vendor-logos/
└── *.png                 ← All vendor logos
```

---

## ⚡ Pro Tips

1. **Test with 1-2 vendors first** before bulk adding
2. **Keep CSV file** for your records
3. **Run verify-vendors.js** after every batch
4. **Use descriptive commit messages**
5. **Check /connections page** in browser before pushing

---

## 🚀 Next Level (Future)

Want to make this even easier? Consider:
- Web UI for adding vendors (drag & drop)
- Automated logo optimization
- Bulk import from Excel
- Integration with your CRM/vendor database

---

**Questions?** Check `scripts/README.md` for detailed documentation.

**Current Status:**
- ✅ 89 Direct Integrations
- ✅ 11,190 Partner Integrations
- ✅ 11,279 Total Connections
- ✅ All 8 new vendor logos working perfectly
