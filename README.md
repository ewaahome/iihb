# منصة إيواء هوم

منصة إيواء هوم هي نظام متكامل لحجز العقارات مكتوب باستخدام Next.js 13 App Router، مع واجهة مستخدم عربية. المشروع مبني على إطار عمل React، Tailwind CSS، Prisma ORM، وقاعدة بيانات PostgreSQL.


## مميزات المشروع

- واجهة مستخدم كاملة باللغة العربية 
- تصميم متجاوب يعمل على جميع الأجهزة
- نظام حجز عقارات متكامل مع تقويم للحجوزات
- نظام مصادقة متعدد (بريد إلكتروني، GitHub، Google)
- نظام رفع ومعالجة الصور مع Cloudinary
- إدارة كاملة للعقارات (إضافة، تعديل، حذف)
- إدارة كاملة للحجوزات (حجز، إلغاء)
- مفضلة للعقارات
- بحث متقدم حسب (الفئة، المدينة، تاريخ السفر، عدد الضيوف، الغرف، الحمامات)
- مشاركة روابط تصفية البحث

## المتطلبات

- Node.js 18 أو أحدث
- قاعدة بيانات PostgreSQL
- حساب Cloudinary لتخزين الصور
- (اختياري) حسابات مزودي المصادقة (GitHub، Google)

## التثبيت والتشغيل - بيانات جاهزة للعمل

جميع المتغيرات البيئية موجودة في ملف `.env.example` ويمكن استخدامها مباشرة للتشغيل المحلي والنشر:

1. **استنساخ المشروع**
   ```bash
   git clone https://github.com/yourusername/eiwaahome.git
   cd eiwaahome
   ```

2. **تثبيت التبعيات**
   ```bash
   npm install
   ```

3. **إعداد ملفات البيئة**
   - قم بنسخ ملف `.env.example` إلى `.env`
   ```bash
   cp .env.example .env
   ```
   - البيانات جاهزة للاستخدام ولا تحتاج إلى تعديل إلا إذا كنت تريد تغييرها

4. **إعداد قاعدة البيانات**
   ```bash
   npx prisma migrate dev
   ```

5. **تشغيل المشروع محليًا**
   ```bash
   npm run dev
   ```
   - سيكون المشروع متاحًا على `http://localhost:3010`
   
6. **تنظيف ملفات الذاكرة المؤقتة إذا واجهت مشاكل**
   ```bash
   npm run clean
   ```

## النشر التلقائي باستخدام GitHub Actions

تم إعداد المشروع للنشر التلقائي باستخدام GitHub Actions. عندما تقوم بدفع التغييرات إلى الفرع الرئيسي (main أو master)، سيتم تنفيذ سير العمل التالي تلقائيًا:

### النشر على Vercel

1. قم بإضافة أسرار GitHub التالية في مستودعك:
   - `VERCEL_TOKEN`: رمز API من حسابك على Vercel
   - `VERCEL_PROJECT_ID`: معرف المشروع من Vercel
   - `VERCEL_ORG_ID`: معرف المنظمة من Vercel

2. بعد إضافة هذه الأسرار، سيقوم GitHub Actions تلقائيًا بنشر تطبيقك على Vercel عند كل دفع للكود.

### النشر على Netlify

1. قم بإضافة أسرار GitHub التالية في مستودعك:
   - `NETLIFY_AUTH_TOKEN`: رمز المصادقة من حسابك على Netlify
   - `NETLIFY_SITE_ID`: معرف الموقع من Netlify

2. بعد إضافة هذه الأسرار، سيقوم GitHub Actions تلقائيًا بنشر تطبيقك على Netlify عند كل دفع للكود.

## حل المشاكل الشائعة

إذا واجهت مشاكل في عملية البناء أو النشر، يمكنك تجربة الحلول التالية:

1. **تنظيف ذاكرة التخزين المؤقت**:
   ```bash
   npm run clean
   ```

2. **إعادة تثبيت التبعيات**:
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **إعادة توليد Prisma Client**:
   ```bash
   npx prisma generate
   ```

4. **تحقق من سجلات GitHub Actions** للحصول على معلومات مفصلة حول أي أخطاء في عملية البناء أو النشر.

## المساهمة في المشروع

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:

1. قم بعمل Fork للمشروع
2. إنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. إجراء التغييرات
4. إضافة التغييرات (`git add .`)
5. عمل Commit (`git commit -m 'إضافة ميزة رائعة'`)
6. دفع التغييرات (`git push origin feature/amazing-feature`)
7. فتح طلب Pull Request

## الترخيص

هذا المشروع مرخص تحت [ترخيص MIT](LICENSE).

# Full Stack Airbnb Clone with Next.js 13 App Router: React, Tailwind, Prisma, MongoDB, NextAuth 2023

![Copy of Fullstack Twitter Clone (8)](https://user-images.githubusercontent.com/23248726/229031522-64a49ad0-66f7-4ea8-94a8-f64a0bb56736.png)


This is a repository for a Full Stack Airbnb Clone with Next.js 13 App Router: React, Tailwind, Prisma, MongoDB, NextAuth.

[VIDEO TUTORIAL](https://youtu.be/c_-b_isI4vg)

Features:

- Tailwind design
- Tailwind animations and effects
- Full responsiveness
- Credential authentication
- Google authentication
- Github authentication
- Image upload using Cloudinary CDN
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Calendars with react-date-range
- Page loading state
- Page empty state
- Booking / Reservation system
- Guest reservation cancellation
- Owner reservation cancellation
- Creation and deletion of properties
- Pricing calculation
- Advanced search algorithm by category, date range, map location, number of guests, rooms and bathrooms
    - For example we will filter out properties that have a reservation in your desired date range to travel
- Favorites system
- Shareable URL filters
    - Lets say you select a category, location and date range, you will be able to share URL with a logged out friend in another browser and they will see the same results
- How to write POST and DELETE routes in route handlers (app/api)
- How to fetch data in server react components by directly accessing database (WITHOUT API! like Magic!)
- How to handle files like error.tsx and loading.tsx which are new Next 13 templating files to unify loading and error handling
- How to handle relations between Server and Child components!

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/next13-airbnb-clone.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
```

### Setup Prisma

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |

# Airbnb Clone - Next.js Project

This is a full-featured Airbnb clone built with Next.js, Prisma, MongoDB, and TypeScript.

## Deploying to Netlify

### Automatic Deployment

1. Fork this repository to your GitHub account
2. Connect your GitHub account to Netlify
3. Create a new site from Git in Netlify, selecting the forked repository
4. Configure the following environment variables in Netlify:
   - `DATABASE_URL`: Your MongoDB connection string
   - `NEXTAUTH_SECRET`: A secure random string for NextAuth.js
   - `NEXTAUTH_URL`: The URL of your Netlify deployment (e.g., https://your-site.netlify.app)
   - `GITHUB_ID`: GitHub OAuth client ID
   - `GITHUB_SECRET`: GitHub OAuth client secret
   - `GOOGLE_CLIENT_ID`: Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name

5. Deploy your site with the default settings (Netlify will use the `netlify.toml` configuration)

### Manual Deployment

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Pre-build Process

The Netlify deployment includes a pre-build script that:

1. Validates environment variables
2. Sets up the database connection
3. Generates the Prisma client
4. Prepares other necessary configurations

## Troubleshooting

If you encounter issues with the Netlify deployment:

1. Check the Netlify deployment logs
2. Verify all environment variables are correctly set
3. Check the database connection status using the health check endpoint
4. Make sure your Node.js version is compatible (this project uses Node.js 18.x)

## License

MIT

## Netlify Deployment Information

### Server-Side Rendering with Next.js

This project uses server-side rendering with the Next.js App Router, which enables API Routes and Middleware functionality.

Initially, we attempted to use static export (`next export`), but this approach has limitations:

> **⚠️ WARNING**: Using static export disables API Routes, Middleware, and other dynamic features of Next.js.
>
> For more information, see the [Next.js documentation on static exports](https://nextjs.org/docs/messages/api-routes-static-export).

Since this application requires API Routes for features like favorites, listings, and reservations, we've configured it for server-side rendering.

### Netlify Configuration

To deploy this project on Netlify:

1. Connect your GitHub repository to Netlify
2. Configure the following build settings:
   - Build command: `npm run netlify-build`
   - Publish directory: `.next`
3. Add the required environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - Other environment variables as specified in `.env.example`
4. Enable the Next.js Runtime (Netlify will detect and suggest this automatically)

The `@netlify/plugin-nextjs` package is included in the project dependencies and will be used automatically by Netlify.
