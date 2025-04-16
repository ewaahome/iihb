/**
 * Install dependencies for Netlify Functions
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Installing Netlify Functions dependencies...');

// Check if functions directory exists
const functionsDir = path.join(process.cwd(), 'netlify/functions');
if (!fs.existsSync(functionsDir)) {
  console.log('📁 Creating functions directory...');
  fs.mkdirSync(functionsDir, { recursive: true });
}

// Check if functions package.json exists
const packageJsonPath = path.join(functionsDir, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.log('⚠️ Functions package.json not found, creating...');
  // Create minimal package.json
  const packageJson = {
    "name": "netlify-functions",
    "version": "1.0.0",
    "description": "Netlify Functions for the application",
    "private": true,
    "dependencies": {
      "@prisma/client": "^6.6.0",
      "bcrypt": "^5.1.1",
      "mongodb": "^6.15.0"
    }
  };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// Install dependencies
try {
  console.log('🔄 Installing functions dependencies...');
  process.chdir(functionsDir);
  // Add --no-deprecation flag to suppress deprecation warnings
  execSync('npm install --no-audit --no-deprecation --production --no-fund --loglevel=error', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: '--no-deprecation' }
  });
  console.log('✅ Functions dependencies installed successfully');
  
  // Return to original directory
  process.chdir(process.cwd());
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  // Don't exit with an error code to allow the build to continue
  console.log('⚠️ Continuing build despite dependency installation issues');
} 