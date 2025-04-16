# منصة إيواء هوم

منصة إيواء هوم هي نظام متكامل لحجز العقارات مكتوب باستخدام Next.js 13 App Router، مع واجهة مستخدم عربية. المشروع مبني على إطار عمل React، Tailwind CSS، Prisma ORM، وقاعدة بيانات PostgreSQL.

![صورة للموقع](https://user-images.githubusercontent.com/23248726/229031522-64a49ad0-66f7-4ea8-94a8-f64a0bb56736.png)

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
