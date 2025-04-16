/**
 * Script to prepare files for Netlify Drop deployment
 * 
 * This script:
 * 1. Copies the _redirects file to the output directory
 * 2. Creates a minimal netlify.toml in the output directory
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing files for Netlify Drop deployment...');

// Define paths
const outDir = path.join(process.cwd(), 'out');
const publicDir = path.join(process.cwd(), 'public');

// Create out directory if it doesn't exist (should exist after build)
if (!fs.existsSync(outDir)) {
  console.log('📁 Creating output directory...');
  fs.mkdirSync(outDir, { recursive: true });
}

// Copy _redirects file
const redirectsSource = path.join(publicDir, '_redirects');
const redirectsTarget = path.join(outDir, '_redirects');

if (fs.existsSync(redirectsSource)) {
  console.log('📄 Copying _redirects file...');
  fs.copyFileSync(redirectsSource, redirectsTarget);
  console.log('✅ _redirects file copied successfully');
} else {
  console.log('⚠️ _redirects file not found in public directory, creating one...');
  const redirectsContent = `# Redirects for Netlify Drop deployment
# Handles client-side routing for single page applications

# SPA fallback - Send all routes to index.html
/*      /index.html     200`;
  
  fs.writeFileSync(redirectsTarget, redirectsContent);
  console.log('✅ Created _redirects file in out directory');
}

// Create a minimal netlify.toml file
const netlifyTomlContent = `# SPA configuration for Netlify Drop
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`;

const netlifyTomlPath = path.join(outDir, 'netlify.toml');
console.log('📄 Creating minimal netlify.toml file...');
fs.writeFileSync(netlifyTomlPath, netlifyTomlContent);
console.log('✅ Created netlify.toml file');

console.log('🎉 Files prepared successfully for Netlify Drop!');
console.log('📋 Instructions:');
console.log('1. Go to https://app.netlify.com/drop');
console.log('2. Drag and drop the entire "out" directory');
console.log('3. Your site will be deployed with proper routing'); 