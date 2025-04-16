# Deploying to Netlify

This guide provides instructions for deploying this Next.js Airbnb clone application to Netlify.

## Prerequisites

1. A [Netlify account](https://app.netlify.com/signup)
2. [Git](https://git-scm.com/) installed locally
3. [Node.js](https://nodejs.org/) (version 18.17.0 or later)
4. MongoDB database (e.g., MongoDB Atlas)

## Environment Variables

You'll need to set up the following environment variables in your Netlify site settings:

```
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/your-database
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-site-name.netlify.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_URL=cloudinary://api-key:api-secret@your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your-mapbox-token
NEXT_PUBLIC_MAPBOX_STYLE=mapbox://styles/mapbox/streets-v12
```

## Deployment Steps

### Option 1: Deploy from Git

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to your Netlify account
3. Click "New site from Git"
4. Choose your Git provider and authorize Netlify
5. Select the repository
6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
7. Click "Deploy site"
8. Add environment variables in site settings
9. Wait for deployment to complete

### Option 2: Deploy using Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Log in to Netlify:
   ```bash
   netlify login
   ```

3. Initialize your site:
   ```bash
   netlify init
   ```

4. Follow the prompts to configure your site
5. Deploy your site:
   ```bash
   netlify deploy --prod
   ```

## Troubleshooting

### Prisma Client Generation

If you encounter issues with Prisma client generation, check:
- The `DATABASE_URL` environment variable is correctly set
- The MongoDB connection is accessible from Netlify's servers
- The Prisma schema is valid

### Next.js Static Output

This application is configured for static output. If dynamic functionality is not working:
- Ensure all API endpoints are configured to use Netlify functions
- Verify that client-side code correctly calls the functions via `/api/` endpoints

### Image Optimization

If images aren't displaying correctly:
- Check that Cloudinary is properly configured
- Verify that the `next.config.js` includes all necessary image domains
- Ensure image paths use relative URLs that work in the static site context

## Local Development

To test your Netlify deployment locally:

```bash
netlify dev
```

This will run your site with the Netlify runtime environment, including functions and redirects. 