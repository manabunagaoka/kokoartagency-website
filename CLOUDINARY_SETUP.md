# Cloudinary Setup Instructions

## Step 1: Create Cloudinary Account
1. Go to https://cloudinary.com/users/register/free
2. Sign up for a free account (25GB storage, 25GB bandwidth/month)
3. Verify your email address

## Step 2: Get Your Credentials
1. After logging in, go to your Dashboard
2. You'll see your account details:
   - **Cloud Name**: (e.g., "dxxxxxxxx")
   - **API Key**: (e.g., "123456789012345")
   - **API Secret**: (click "Reveal" to see it)

## Step 3: Set Environment Variables
1. Create a `.env.local` file in your project root
2. Add your Cloudinary credentials:

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Replace the placeholder values with your actual Cloudinary credentials.

## Step 4: Upload Images
Once you've set up the environment variables, run:

```bash
node scripts/upload-to-cloudinary.js
```

This will:
- Upload all artist images to Cloudinary
- Optimize them automatically (resize to max 1200x1200, compress)
- Generate a `cloudinary-urls.json` file with all the new URLs

## Step 5: Update API Routes
After uploading, we'll update the API routes to use the Cloudinary URLs instead of local file paths.

## Benefits
- ✅ No more Vercel 100MB static file limit
- ✅ Automatic image optimization and compression
- ✅ Fast global CDN delivery
- ✅ Responsive image loading
- ✅ Free tier handles your current usage (444MB → optimized)

## Next Steps
1. Set up your Cloudinary account
2. Add the credentials to `.env.local`
3. Run the upload script
4. I'll update the API to use Cloudinary URLs
