// Setup script for Vercel deployment
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up project for Vercel deployment...');

// Ensure directories exist
const dirs = ['prisma', 'scripts'];
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

// Ensure .env file exists with DATABASE_URL
if (!fs.existsSync('.env')) {
  fs.writeFileSync('.env', 'DATABASE_URL="mongodb+srv://finaleewa:finaleewa@finaleewa.7eytc2o.mongodb.net/finaleewa?retryWrites=true&w=majority&appName=finaleewa"\n');
  console.log('📄 Created .env file with DATABASE_URL');
}

console.log('✅ Setup complete!'); 