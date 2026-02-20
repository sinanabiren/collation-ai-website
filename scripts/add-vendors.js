#!/usr/bin/env node

/**
 * Vendor Management Script
 *
 * Usage:
 *   node scripts/add-vendors.js vendors.csv
 *
 * CSV Format:
 *   name,category,logo_filename,status
 *   Vendor Name,direct,vendor-logo.png,active
 *
 * Categories: direct or partner
 * Status: active, pipeline, deprecated
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DATA_FILE = path.join(__dirname, '../app/connections/data.ts');
const KNOWLEDGE_FILE = path.join(__dirname, '../lib/knowledge/product-info.ts');
const LOGO_DIR = path.join(__dirname, '../public/assets/vendor-logos');
const PAGE_FILE = path.join(__dirname, '../app/connections/page.tsx');

function parseCSV(csvPath) {
  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const vendor = {};
    headers.forEach((header, i) => {
      vendor[header] = values[i] || '';
    });
    return vendor;
  });
}

function addVendorToDataTs(vendor) {
  let content = fs.readFileSync(DATA_FILE, 'utf-8');

  // Determine which array to add to
  const arrayName = vendor.category === 'direct' ? 'direct' : 'partner';
  const categoryLabel = vendor.category === 'direct' ? 'Collation.ai Direct' : 'Via Partner Network';

  // Build vendor entry
  const logoFields = vendor.logo_filename ?
    `,\n      "logo": "${vendor.logo_filename}",\n      "logo_category": "collation_${vendor.status || 'active'}"` : '';

  const vendorEntry = `    {
      "name": "${vendor.name}",
      "status": "${vendor.status || 'active'}",
      "category": "${categoryLabel}"${logoFields}
    },`;

  // Find the alphabetical position in the array
  const arrayPattern = new RegExp(`export const integrationData = \\{[\\s\\S]*?${arrayName}: \\[([\\s\\S]*?)\\]`, 'm');
  const match = content.match(arrayPattern);

  if (!match) {
    console.error(`Could not find ${arrayName} array in data.ts`);
    return false;
  }

  // Parse existing vendors to find insertion point
  const vendorPattern = /"name": "([^"]+)"/g;
  let insertAfter = null;
  let lastPos = 0;

  while ((m = vendorPattern.exec(match[1])) !== null) {
    const existingName = m[1];
    if (existingName.localeCompare(vendor.name) < 0) {
      insertAfter = existingName;
      lastPos = m.index;
    } else {
      break;
    }
  }

  // Find insertion position
  let insertPos;
  if (insertAfter) {
    const afterPattern = new RegExp(`"name": "${insertAfter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*\\},`);
    const afterMatch = afterPattern.exec(content);
    if (afterMatch) {
      insertPos = afterMatch.index + afterMatch[0].length;
    }
  } else {
    // Insert at beginning of array
    const arrayStartPattern = new RegExp(`${arrayName}: \\[\\s*`);
    const startMatch = arrayStartPattern.exec(content);
    if (startMatch) {
      insertPos = startMatch.index + startMatch[0].length;
    }
  }

  if (!insertPos) {
    console.error('Could not find insertion position');
    return false;
  }

  // Insert vendor
  content = content.slice(0, insertPos) + '\n' + vendorEntry + content.slice(insertPos);

  // Add logo data if logo exists
  if (vendor.logo_filename) {
    const logoKey = `collation_${vendor.status || 'active'}/${vendor.logo_filename}`;
    const logoPath = `/assets/vendor-logos/${vendor.logo_filename}`;
    const logoEntry = `  "${logoKey}": "${logoPath}",\n`;

    // Find last logo entry
    const logoDataEnd = content.lastIndexOf('};', content.indexOf('export const logoData'));
    if (logoDataEnd > 0) {
      const lastComma = content.lastIndexOf(',', logoDataEnd);
      content = content.slice(0, lastComma + 1) + '\n' + logoEntry + content.slice(lastComma + 1);
    }
  }

  fs.writeFileSync(DATA_FILE, content, 'utf-8');
  return true;
}

function updateCounts() {
  // Count vendors in data.ts
  const content = fs.readFileSync(DATA_FILE, 'utf-8');

  const directMatches = content.match(/"category": "Collation\.ai Direct"/g);
  const partnerMatches = content.match(/"category": "Via Partner Network"/g);

  const directCount = directMatches ? directMatches.length : 0;
  const partnerCount = partnerMatches ? partnerMatches.length : 0;
  const totalCount = directCount + partnerCount;

  // Update page.tsx stats
  let pageContent = fs.readFileSync(PAGE_FILE, 'utf-8');
  pageContent = pageContent.replace(
    /const stats = \{[\s\S]*?\};/,
    `const stats = {\n    total: ${totalCount},\n    direct: ${directCount},\n    partner: ${partnerCount},\n  };`
  );
  fs.writeFileSync(PAGE_FILE, pageContent, 'utf-8');

  // Update knowledge base
  let knowledgeContent = fs.readFileSync(KNOWLEDGE_FILE, 'utf-8');

  // Update main integration section
  knowledgeContent = knowledgeContent.replace(
    /## Connections & Integrations \(\d+[,\d]* Total Integrations\)/,
    `## Connections & Integrations (${totalCount.toLocaleString()} Total Integrations)`
  );

  knowledgeContent = knowledgeContent.replace(
    /Collation\.AI connects to \*\*\d+[,\d]*\+ data sources\*\*/,
    `Collation.AI connects to **${totalCount.toLocaleString()}+ data sources**`
  );

  knowledgeContent = knowledgeContent.replace(
    /- \*\*\d+ Collation\.AI Direct Integrations\*\*/,
    `- **${directCount} Collation.AI Direct Integrations**`
  );

  knowledgeContent = knowledgeContent.replace(
    /### Collation\.AI Direct Integrations \(\d+ Native Connections\):/,
    `### Collation.AI Direct Integrations (${directCount} Native Connections):`
  );

  knowledgeContent = knowledgeContent.replace(
    /- We support \d+[,\d]*\+ connections total/,
    `- We support ${totalCount.toLocaleString()}+ connections total`
  );

  knowledgeContent = knowledgeContent.replace(
    /- \d+ direct native integrations with major platforms/,
    `- ${directCount} direct native integrations with major platforms`
  );

  // Update Integration Ecosystem section
  knowledgeContent = knowledgeContent.replace(
    /- \*\*Total Connections:\*\* \d+[,\d]* integrations/,
    `- **Total Connections:** ${totalCount.toLocaleString()} integrations`
  );

  knowledgeContent = knowledgeContent.replace(
    /- \*\*Direct Integrations \(Collation\.ai Direct\):\*\* \d+ platforms/,
    `- **Direct Integrations (Collation.ai Direct):** ${directCount} platforms`
  );

  knowledgeContent = knowledgeContent.replace(
    /### Direct Integrations \(\d+ platforms\)/,
    `### Direct Integrations (${directCount} platforms)`
  );

  fs.writeFileSync(KNOWLEDGE_FILE, knowledgeContent, 'utf-8');

  return { total: totalCount, direct: directCount, partner: partnerCount };
}

function addVendorToKnowledgeBase(vendor) {
  let content = fs.readFileSync(KNOWLEDGE_FILE, 'utf-8');

  // Add to comprehensive list (alphabetically)
  const listPattern = /### Direct Integrations \(\d+ platforms\)\nCollation AI directly integrates with the following[^:]*:\n\n([^\.]+)\./;
  const match = content.match(listPattern);

  if (match) {
    const vendorList = match[1].split(',').map(v => v.trim());
    vendorList.push(vendor.name);
    vendorList.sort((a, b) => a.localeCompare(b));

    const newList = vendorList.join(', ');
    content = content.replace(match[1], newList);
  }

  fs.writeFileSync(KNOWLEDGE_FILE, content, 'utf-8');
}

function copyLogo(vendor, sourceLogoPath) {
  if (!vendor.logo_filename || !sourceLogoPath) return;

  const destPath = path.join(LOGO_DIR, vendor.logo_filename);

  if (fs.existsSync(sourceLogoPath)) {
    fs.copyFileSync(sourceLogoPath, destPath);
    console.log(`  ✓ Copied logo: ${vendor.logo_filename}`);
  } else {
    console.warn(`  ⚠ Logo file not found: ${sourceLogoPath}`);
  }
}

// Main execution
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node scripts/add-vendors.js vendors.csv [logo-directory]');
    console.log('\nCSV Format:');
    console.log('name,category,logo_filename,status');
    console.log('Vendor Name,direct,vendor-logo.png,active');
    console.log('\nCategories: direct | partner');
    console.log('Status: active | pipeline | deprecated');
    process.exit(1);
  }

  const csvPath = args[0];
  const logoSourceDir = args[1] || process.cwd();

  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  const vendors = parseCSV(csvPath);

  console.log(`\n📦 Adding ${vendors.length} vendor(s)...\n`);

  let added = 0;
  vendors.forEach(vendor => {
    console.log(`Processing: ${vendor.name}`);

    // Add to data.ts
    if (addVendorToDataTs(vendor)) {
      console.log('  ✓ Added to data.ts');
      added++;
    } else {
      console.log('  ✗ Failed to add to data.ts');
      return;
    }

    // Copy logo if exists
    if (vendor.logo_filename) {
      const logoPath = path.join(logoSourceDir, vendor.logo_filename);
      copyLogo(vendor, logoPath);
    }

    // Add to knowledge base
    if (vendor.category === 'direct') {
      addVendorToKnowledgeBase(vendor);
      console.log('  ✓ Added to knowledge base');
    }

    console.log('');
  });

  // Update all counts
  console.log('📊 Updating counts...');
  const counts = updateCounts();
  console.log(`  ✓ Total: ${counts.total}`);
  console.log(`  ✓ Direct: ${counts.direct}`);
  console.log(`  ✓ Partner: ${counts.partner}`);

  console.log(`\n✅ Successfully added ${added} vendor(s)!\n`);
  console.log('Next steps:');
  console.log('1. Review changes: git diff');
  console.log('2. Test the site: npm run dev');
  console.log('3. Commit changes: git add . && git commit -m "Add new vendors"');
}

main();
