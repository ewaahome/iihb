// Script to generate Prisma client
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Prisma client generation from root directory...');

// Ensure prisma directory exists
const prismaDir = path.join(process.cwd(), 'prisma');
if (!fs.existsSync(prismaDir)) {
  console.log('📁 Creating prisma directory...');
  fs.mkdirSync(prismaDir, { recursive: true });
}

// Check if schema.prisma exists in the prisma directory
const schemaPrismaPath = path.join(prismaDir, 'schema.prisma');
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
  process.exit(1);
} 