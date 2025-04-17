// Script to clean up stray vercel.json files
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Cleaning up project configuration...');

// Function to find all vercel.json files recursively
function findVercelJsonFiles(dir, filesFound = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
      findVercelJsonFiles(filePath, filesFound);
    } else if (file === 'vercel.json') {
      filesFound.push(filePath);
    }
  }
  
  return filesFound;
}

// Find all vercel.json files
const vercelJsonFiles = findVercelJsonFiles(process.cwd());

console.log(`Found ${vercelJsonFiles.length} vercel.json file(s):`);
vercelJsonFiles.forEach(file => console.log(`- ${file}`));

// Ensure only one vercel.json exists at the root level with the correct content
const rootVercelJson = path.join(process.cwd(), 'vercel.json');
const correctContent = JSON.stringify({
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npm run vercel-build",
  "installCommand": "npm install --legacy-peer-deps",
  "outputDirectory": ".next",
  "env": {
    "DATABASE_URL": "mongodb+srv://finaleewa:finaleewa@finaleewa.7eytc2o.mongodb.net/finaleewa?retryWrites=true&w=majority&appName=finaleewa",
    "NEXTAUTH_SECRET": "eiwaahomeauthsecretkey2024",
    "NEXTAUTH_URL": "https://cc1-git-main-ewaahomes-projects.vercel.app",
    "NEXT_PUBLIC_NEXTAUTH_URL": "https://cc1-git-main-ewaahomes-projects.vercel.app",
    "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME": "dzwkeydij",
    "CLOUDINARY_URL": "cloudinary://261241242864329:KS0GJUBWc5m5gyMXLC2yPPozVuA@dzwkeydij",
    "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET": "airbnb_upload",
    "CLOUDINARY_API_KEY": "261241242864329",
    "CLOUDINARY_API_SECRET": "KS0GJUBWc5m5gyMXLC2yPPozVuA",
    "NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN": "pk.eyJ1IjoiZXdhYWhvbWUiLCJhIjoiY204ZGpranNkMWs4cTJtczU0dmwxaXlpdiJ9.0xFsZgp69DtYp5iwQh9Ivw",
    "NEXT_PUBLIC_MAPBOX_STYLE": "mapbox://styles/mapbox/streets-v11",
    "ESLINT_CONFIG_FILE": ".eslintrc.vercel.js",
    "PRISMA_SCHEMA_PATH": "./prisma/schema.prisma"
  }
}, null, 2);

// Delete all other vercel.json files
vercelJsonFiles.forEach(file => {
  if (file !== rootVercelJson) {
    console.log(`🗑️ Deleting extra vercel.json at ${file}`);
    fs.unlinkSync(file);
  }
});

// Update the root vercel.json
fs.writeFileSync(rootVercelJson, correctContent);
console.log('✅ Updated root vercel.json with clean configuration');

// Check for stray .vercel folders that might contain cached configuration
const vercelFolders = [];
function findVercelFolders(dir, foldersFound = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    
    try {
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
        if (file === '.vercel') {
          foldersFound.push(filePath);
        } else {
          findVercelFolders(filePath, foldersFound);
        }
      }
    } catch (err) {
      console.log(`Error accessing ${filePath}: ${err.message}`);
    }
  }
  
  return foldersFound;
}

try {
  const vercelFolders = findVercelFolders(process.cwd());
  
  if (vercelFolders.length > 0) {
    console.log(`Found ${vercelFolders.length} .vercel folder(s):`);
    vercelFolders.forEach(folder => {
      console.log(`- ${folder}`);
      try {
        const outputJson = path.join(folder, 'output', 'config.json');
        if (fs.existsSync(outputJson)) {
          console.log(`🗑️ Deleting potentially problematic config at ${outputJson}`);
          fs.unlinkSync(outputJson);
        }
      } catch (err) {
        console.log(`Couldn't remove cached config: ${err.message}`);
      }
    });
  }
} catch (err) {
  console.log(`Error searching for .vercel folders: ${err.message}`);
}

console.log('✅ Configuration cleanup complete!');

// Run a list of files in the project root for debugging
try {
  console.log('\n📂 Files in project root:');
  const rootFiles = fs.readdirSync(process.cwd());
  rootFiles.forEach(file => console.log(`- ${file}`));
} catch (err) {
  console.log(`Error listing root files: ${err.message}`);
}

console.log('\n🔍 Checking for API directories:');
// Check for app/api folder and its contents
const apiPath = path.join(process.cwd(), 'app', 'api');
if (fs.existsSync(apiPath)) {
  console.log('✅ app/api directory exists');
  const apiContents = fs.readdirSync(apiPath);
  console.log('Contents:');
  apiContents.forEach(item => console.log(`- ${item}`));
} else {
  console.log('❌ app/api directory does not exist');
} 