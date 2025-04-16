/**
 * Netlify Setup Script
 * 
 * This script runs before the build to ensure all necessary directories and files exist.
 * It creates the functions directory, copies api-bridge.js, and ensures Prisma files are in place.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Running Netlify setup script...');

// Create required directories
const dirs = [
  'netlify/functions',
  'prisma',
  '.netlify/functions-internal'
];

dirs.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`📁 Creating directory: ${dir}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Copy files from source to netlify/functions if they don't exist
const functionsDir = path.join(process.cwd(), 'netlify/functions');
const sourceFiles = [
  { src: 'netlify/functions/api-bridge.js', dest: 'api-bridge.js' },
  { src: 'netlify/functions/prisma-provider.js', dest: 'prisma-provider.js' }
];

sourceFiles.forEach(({ src, dest }) => {
  const sourcePath = path.join(process.cwd(), src);
  const destPath = path.join(functionsDir, dest);
  
  // Only copy if source exists and destination doesn't
  if (fs.existsSync(sourcePath) && !fs.existsSync(destPath)) {
    console.log(`📄 Copying ${src} to ${dest}`);
    fs.copyFileSync(sourcePath, destPath);
  }
});

// Check and handle Prisma schema
const prismaDir = path.join(process.cwd(), 'prisma');
const schemaPath = path.join(prismaDir, 'schema.prisma');
const rootSchemaPath = path.join(process.cwd(), 'schema.prisma');

// Copy schema from root to prisma directory if needed
if (fs.existsSync(rootSchemaPath) && !fs.existsSync(schemaPath)) {
  console.log('📄 Copying schema.prisma from root to prisma directory');
  fs.copyFileSync(rootSchemaPath, schemaPath);
} else if (!fs.existsSync(schemaPath) && !fs.existsSync(rootSchemaPath)) {
  // Create a basic schema if none exists
  console.log('⚠️ No schema.prisma found, creating basic schema');
  const basicSchema = `// Basic Prisma schema for MongoDB
generator client {
  provider        = "prisma-client-js"
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
  
  fs.writeFileSync(schemaPath, basicSchema);
}

// Create empty functions if they don't exist
const requiredFunctions = [
  { name: 'nextjs.js', content: `
// Basic Next.js handler for Netlify Functions
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Next.js function is working" })
  };
};`
  }
];

requiredFunctions.forEach(({ name, content }) => {
  const filePath = path.join(functionsDir, name);
  if (!fs.existsSync(filePath)) {
    console.log(`📄 Creating function: ${name}`);
    fs.writeFileSync(filePath, content.trim());
  }
});

console.log('✅ Netlify setup completed successfully'); 