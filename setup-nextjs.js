#!/usr/bin/env node
/**
 * Next.js Setup Script
 * 
 * This script handles Next.js-specific setup requirements for the Netlify deployment
 * It ensures that the app directory structure is properly configured
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Next.js setup process...');

// Directory paths
const rootDir = process.cwd();
const appDir = path.join(rootDir, 'app');

// Check if app directory exists and has required files
function ensureAppDirectory() {
  console.log('Checking Next.js app directory structure...');

  if (!fs.existsSync(appDir)) {
    console.log('⚠️ app directory not found, creating it...');
    fs.mkdirSync(appDir, { recursive: true });
    
    // Create minimal Next.js app structure if needed
    const files = {
      'page.tsx': `export default function Home() {
  return (
    <div>
      <h1>Next.js App</h1>
      <p>This is a minimal Next.js app created for Netlify deployment.</p>
    </div>
  );
}`,
      'layout.tsx': `export const metadata = {
  title: 'Next.js App',
  description: 'Next.js App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
      'globals.css': `* {
  box-sizing: border-box;
}

html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}`
    };
    
    // Write files
    Object.entries(files).forEach(([filename, content]) => {
      const filePath = path.join(appDir, filename);
      fs.writeFileSync(filePath, content);
      console.log(`✅ Created ${filename}`);
    });
  } else {
    console.log('✅ app directory exists');
    
    // Verify required files
    const requiredFiles = ['page.tsx', 'layout.tsx'];
    const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(appDir, file)));
    
    if (missingFiles.length > 0) {
      console.log(`⚠️ Missing required files in app directory: ${missingFiles.join(', ')}`);
      
      // Create missing files
      if (!fs.existsSync(path.join(appDir, 'page.tsx'))) {
        fs.writeFileSync(path.join(appDir, 'page.tsx'), `export default function Home() {
  return (
    <div>
      <h1>Next.js App</h1>
      <p>This is a minimal Next.js app created for Netlify deployment.</p>
    </div>
  );
}`);
        console.log('✅ Created page.tsx');
      }
      
      if (!fs.existsSync(path.join(appDir, 'layout.tsx'))) {
        fs.writeFileSync(path.join(appDir, 'layout.tsx'), `export const metadata = {
  title: 'Next.js App',
  description: 'Next.js App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`);
        console.log('✅ Created layout.tsx');
      }
    }
  }
}

// Check if next.config.js exists and has proper configuration
function ensureNextConfig() {
  const nextConfigPath = path.join(rootDir, 'next.config.js');
  if (fs.existsSync(nextConfigPath)) {
    console.log('✅ next.config.js exists');
  } else {
    console.log('⚠️ next.config.js not found, creating it...');
    const nextConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  experimental: {
    appDir: true,
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;`;
    
    fs.writeFileSync(nextConfigPath, nextConfigContent);
    console.log('✅ Created next.config.js');
  }
}

// Main function to run all Next.js setup tasks
function main() {
  try {
    ensureAppDirectory();
    ensureNextConfig();
    
    // Create a file to indicate successful setup
    fs.writeFileSync(path.join(rootDir, '.nextjs-setup-success'), new Date().toISOString());
    console.log('✅ Next.js setup completed successfully');
  } catch (error) {
    console.error('❌ Next.js setup failed:', error);
    process.exit(1);
  }
}

// Run the main function
main(); 