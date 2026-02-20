#!/usr/bin/env node

/**
 * Vendor Verification Script
 *
 * Verifies that vendors in data.ts match:
 * - Logo files in public/assets/vendor-logos/
 * - Counts in page.tsx
 * - Entries in product-info.ts knowledge base
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../app/connections/data.ts');
const PAGE_FILE = path.join(__dirname, '../app/connections/page.tsx');
const KNOWLEDGE_FILE = path.join(__dirname, '../lib/knowledge/product-info.ts');
const LOGO_DIR = path.join(__dirname, '../public/assets/vendor-logos');

function extractVendors() {
  const content = fs.readFileSync(DATA_FILE, 'utf-8');

  const directMatches = [...content.matchAll(/"name": "([^"]+)"[^}]*"category": "Collation\.ai Direct"/g)];
  const partnerMatches = [...content.matchAll(/"name": "([^"]+)"[^}]*"category": "Via Partner Network"/g)];

  const direct = directMatches.map(m => m[1]);
  const partner = partnerMatches.map(m => m[1]);

  return { direct, partner, total: direct.length + partner.length };
}

function extractPageCounts() {
  const content = fs.readFileSync(PAGE_FILE, 'utf-8');
  const match = content.match(/const stats = \{[\s\S]*?total: (\d+),[\s\S]*?direct: (\d+),[\s\S]*?partner: (\d+)/);

  if (match) {
    return {
      total: parseInt(match[1]),
      direct: parseInt(match[2]),
      partner: parseInt(match[3])
    };
  }
  return null;
}

function extractKnowledgeCounts() {
  const content = fs.readFileSync(KNOWLEDGE_FILE, 'utf-8');

  const totalMatch = content.match(/## Connections & Integrations \((\d+[,\d]*) Total Integrations\)/);
  const directMatch = content.match(/- \*\*(\d+) Collation\.AI Direct Integrations\*\*/);

  return {
    total: totalMatch ? parseInt(totalMatch[1].replace(/,/g, '')) : null,
    direct: directMatch ? parseInt(directMatch[1]) : null
  };
}

function checkLogos(vendors) {
  const content = fs.readFileSync(DATA_FILE, 'utf-8');
  const logoFiles = fs.readdirSync(LOGO_DIR);

  const missing = [];
  const found = [];

  vendors.direct.forEach(vendor => {
    const logoMatch = content.match(new RegExp(`"name": "${vendor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*"logo": "([^"]+)"`));

    if (logoMatch) {
      const logoFile = logoMatch[1];
      if (logoFiles.includes(logoFile)) {
        found.push({ vendor, logo: logoFile });
      } else {
        missing.push({ vendor, logo: logoFile });
      }
    }
  });

  return { found, missing };
}

function main() {
  console.log('\n🔍 Verifying Vendor Data...\n');

  // Extract data
  const vendors = extractVendors();
  const pageCounts = extractPageCounts();
  const knowledgeCounts = extractKnowledgeCounts();
  const logos = checkLogos(vendors);

  // Check counts
  console.log('📊 Vendor Counts:');
  console.log(`   data.ts:       ${vendors.total} total (${vendors.direct.length} direct, ${vendors.partner.length} partner)`);
  console.log(`   page.tsx:      ${pageCounts.total} total (${pageCounts.direct} direct, ${pageCounts.partner} partner)`);
  console.log(`   product-info:  ${knowledgeCounts.total} total (${knowledgeCounts.direct} direct)`);

  let hasErrors = false;

  if (vendors.total !== pageCounts.total || vendors.direct.length !== pageCounts.direct) {
    console.log('   ❌ Counts don\'t match in page.tsx!');
    hasErrors = true;
  } else {
    console.log('   ✅ page.tsx counts match');
  }

  if (vendors.total !== knowledgeCounts.total || vendors.direct.length !== knowledgeCounts.direct) {
    console.log('   ❌ Counts don\'t match in product-info.ts!');
    hasErrors = true;
  } else {
    console.log('   ✅ product-info.ts counts match');
  }

  // Check logos
  console.log(`\n🖼️  Logo Files:`);
  console.log(`   Found:   ${logos.found.length} logos`);
  console.log(`   Missing: ${logos.missing.length} logos`);

  if (logos.missing.length > 0) {
    console.log('\n   ❌ Missing logos:');
    logos.missing.forEach(({ vendor, logo }) => {
      console.log(`      - ${vendor}: ${logo}`);
    });
    hasErrors = true;
  } else {
    console.log('   ✅ All logos present');
  }

  // List recent vendors (last 10 direct)
  console.log(`\n📋 Recent Direct Vendors (last 10):`);
  vendors.direct.slice(-10).forEach(vendor => {
    console.log(`   - ${vendor}`);
  });

  if (hasErrors) {
    console.log('\n❌ Verification found issues. Run update script to fix.\n');
    process.exit(1);
  } else {
    console.log('\n✅ All checks passed!\n');
    process.exit(0);
  }
}

main();
