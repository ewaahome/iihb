// Setup script for Vercel deployment
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up project for Vercel deployment...');

// Run the cleanup script first if it exists
if (fs.existsSync('cleanup-config.js')) {
  console.log('🧹 Running cleanup script...');
  try {
    require('./cleanup-config.js');
  } catch (error) {
    console.warn('⚠️ Error running cleanup script:', error.message);
  }
}

// Ensure directories exist
const dirs = ['prisma', 'scripts', 'app', 'app/api'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created ${dir} directory`);
  }
});

// Ensure prisma schema exists
const schemaPath = path.join('prisma', 'schema.prisma');
if (!fs.existsSync(schemaPath)) {
  const schemaContent = `// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider        = "prisma-client-js"
  previewFeatures = []
  binaryTargets   = ["native", "rhel-openssl-1.0.x"]
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

// Basic models for the application
model User {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  name           String?
  email          String?   @unique
  emailVerified  DateTime?
  image          String?
  hashedPassword String?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}`;
  
  fs.writeFileSync(schemaPath, schemaContent);
  console.log('📄 Created schema.prisma file');
}

// Ensure prisma/generate-client.js exists
const generateClientPath = path.join('prisma', 'generate-client.js');
if (!fs.existsSync(generateClientPath)) {
  const generateClientContent = `// Script to generate Prisma client
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Prisma client generation...');

// Check if schema.prisma exists in the prisma directory
const schemaPrismaPath = path.join(__dirname, 'schema.prisma');
const rootSchemaPrismaPath = path.join(process.cwd(), 'schema.prisma');

if (!fs.existsSync(schemaPrismaPath) && fs.existsSync(rootSchemaPrismaPath)) {
  console.log('⚠️ schema.prisma not found in prisma directory, copying from root...');
  fs.copyFileSync(rootSchemaPrismaPath, schemaPrismaPath);
  console.log('✅ schema.prisma copied to prisma directory');
}

try {
  console.log('📊 Generating Prisma client...');
  execSync('npx prisma generate --schema=prisma/schema.prisma', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully');
} catch (error) {
  console.error('❌ Error generating Prisma client:', error.message);
  process.exit(0); // Don't fail the build
}`;
  
  fs.writeFileSync(generateClientPath, generateClientContent);
  console.log('📄 Created generate-client.js file');
}

// Ensure app directory has necessary files for Next.js
const appLayoutPath = path.join('app', 'layout.tsx');
if (!fs.existsSync(appLayoutPath)) {
  const layoutContent = `import './globals.css';
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Ewaa Home',
  description: 'Vacation Homes & Apartment Rentals',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}`;
  
  fs.writeFileSync(appLayoutPath, layoutContent);
  console.log('📄 Created app/layout.tsx file');
}

const appPagePath = path.join('app', 'page.tsx');
if (!fs.existsSync(appPagePath)) {
  const pageContent = `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to Ewaa Home</h1>
    </main>
  );
}`;
  
  fs.writeFileSync(appPagePath, pageContent);
  console.log('📄 Created app/page.tsx file');
}

const appGlobalsPath = path.join('app', 'globals.css');
if (!fs.existsSync(appGlobalsPath)) {
  const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
}`;
  
  fs.writeFileSync(appGlobalsPath, cssContent);
  console.log('📄 Created app/globals.css file');
}

// Ensure .env file exists with DATABASE_URL
if (!fs.existsSync('.env')) {
  fs.writeFileSync('.env', 'DATABASE_URL="mongodb+srv://finaleewa:finaleewa@finaleewa.7eytc2o.mongodb.net/finaleewa?retryWrites=true&w=majority&appName=finaleewa"\n');
  console.log('📄 Created .env file with DATABASE_URL');
}

// Create the scripts/vercel-build-info.js file if it doesn't exist
const buildInfoPath = path.join('scripts', 'vercel-build-info.js');
if (!fs.existsSync(buildInfoPath)) {
  const buildInfoContent = `// Script to print environment information during Vercel build
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\\n🔍 Gathering build information for Vercel deployment...');

// Build information
const buildInfo = {
  timestamp: new Date().toISOString(),
  nodeVersion: process.version,
  npmVersion: execSync('npm --version').toString().trim(),
  environment: process.env.VERCEL_ENV || 'development',
  buildId: process.env.VERCEL_BUILD_ID || 'local',
  region: process.env.VERCEL_REGION || 'local',
  platform: process.platform,
  arch: process.arch
};

// Write build info to a file
const buildInfoPath = path.join(process.cwd(), '.vercel-build-info.json');
fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));

console.log('✅ Build information collected successfully');
console.log('🏗️ Proceeding with Next.js build...\\n');

// This is just for build information, so exit successfully
process.exit(0);`;
  
  fs.writeFileSync(buildInfoPath, buildInfoContent);
  console.log('📄 Created scripts/vercel-build-info.js file');
}

// Create a minimal tailwind.config.js if it doesn't exist
if (!fs.existsSync('tailwind.config.js')) {
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
  
  fs.writeFileSync('tailwind.config.js', tailwindConfig);
  console.log('📄 Created tailwind.config.js file');
}

// Create a minimal postcss.config.js if it doesn't exist
if (!fs.existsSync('postcss.config.js')) {
  const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
  
  fs.writeFileSync('postcss.config.js', postcssConfig);
  console.log('📄 Created postcss.config.js file');
}

// Create a basic API route for Next.js App Router
const apiRoutePath = path.join('app', 'api', 'route.js');
if (!fs.existsSync(apiRoutePath)) {
  const apiContent = `// Route handler for App Router
export async function GET(request) {
  return new Response(JSON.stringify({ 
    message: 'API is working' 
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}`;
  
  fs.writeFileSync(apiRoutePath, apiContent);
  console.log('📄 Created app/api/route.js file');
}

// Create vercel.json with correct configuration
const vercelJsonPath = path.join(process.cwd(), 'vercel.json');
const vercelConfig = {
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
};

fs.writeFileSync(vercelJsonPath, JSON.stringify(vercelConfig, null, 2));
console.log('📄 Updated vercel.json with clean configuration');

console.log('✅ Setup complete!'); 