# دليل النشر على Vercel - منصة صدقة

## المتطلبات الأساسية

1. حساب GitHub مجاني
2. حساب Vercel مجاني ([vercel.com](https://vercel.com))
3. حساب قاعدة بيانات PostgreSQL (اختر واحد من الخيارات التالية):
   - **Vercel Postgres** (موصى به - تكامل سلس)
   - **Supabase** ([supabase.com](https://supabase.com))
   - **Neon** ([neon.tech](https://neon.tech))
4. حساب Cloudinary مجاني ([cloudinary.com](https://cloudinary.com))

---

## الخطوة 1: إعداد Cloudinary

### 1.1 إنشاء حساب
1. اذهب إلى [cloudinary.com](https://cloudinary.com)
2. اضغط "Sign Up" وأنشئ حساب مجاني
3. بعد التسجيل، انتقل إلى Dashboard

### 1.2 الحصول على بيانات API
من صفحة Dashboard ستجد:
- **Cloud Name** (اسم فريد لحسابك)
- **API Key** (مفتاح API)
- **API Secret** (السر - لا تشاركه مع أحد)

احتفظ بهذه المعلومات، ستحتاجها لاحقاً.

---

## الخطوة 2: رفع المشروع على GitHub

### 2.1 تهيئة Git
افتح Terminal في مجلد المشروع وقم بتشغيل:

```bash
git init
git add .
git commit -m "Initial commit: Sadaqa platform"
```

### 2.2 إنشاء مستودع على GitHub
1. اذهب إلى [github.com](https://github.com)
2. اضغط على "+" في الأعلى ثم "New repository"
3. اكتب اسم المستودع: `sadaqa-platform`
4. دع الخيارات الأخرى كما هي (Public أو Private حسب تفضيلك)
5. اضغط "Create repository"

### 2.3 رفع الكود
نسخ الأوامر من صفحة GitHub التي ظهرت وقم بتشغيلها:

```bash
git remote add origin https://github.com/YOUR_USERNAME/sadaqa-platform.git
git branch -M main
git push -u origin main
```

---

## الخطوة 3: إعداد قاعدة البيانات

### الخيار 1: Vercel Postgres (موصى به)

سنقوم بإنشاء قاعدة البيانات بعد ربط المشروع بـ Vercel في الخطوة التالية.

### الخيار 2: Supabase

1. اذهب إلى [supabase.com](https://supabase.com)
2. اضغط "Start your project"
3. سجل الدخول بحساب GitHub
4. اضغط "New project"
5. اختر اسم للمشروع وكلمة مرور قوية
6. اختر المنطقة الأقرب إليك
7. انتظر حتى تنتهي عملية الإنشاء (2-3 دقائق)
8. اذهب إلى Settings > Database
9. انسخ "Connection string" وتحت "Connection pooling"
10. استبدل `[YOUR-PASSWORD]` بكلمة المرور التي اخترتها

### الخيار 3: Neon

1. اذهب إلى [neon.tech](https://neon.tech)
2. اضغط "Sign up" وسجل بحساب GitHub
3. اضغط "Create a project"
4. اختر اسم للمشروع والمنطقة
5. اضغط "Create project"
6. انسخ "Connection string" من صفحة Dashboard

---

## الخطوة 4: النشر على Vercel

### 4.1 إنشاء حساب Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط "Sign Up"
3. سجل باستخدام حساب GitHub الخاص بك

### 4.2 استيراد المشروع
1. من لوحة تحكم Vercel، اضغط "Add New" > "Project"
2. ابحث عن مستودع `sadaqa-platform`
3. اضغط "Import"

### 4.3 إعداد Environment Variables

في صفحة "Configure Project"، اضغط على "Environment Variables" وأضف:

#### المتغيرات الإلزامية:

**1. DATABASE_URL**
```
DATABASE_URL=postgresql://username:password@host:5432/database?sslmode=require
```
(استخدم الـ Connection String من Supabase أو Neon، أو انتظر إنشاء Vercel Postgres)

**2. NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME**
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

**3. CLOUDINARY_API_KEY**
```
CLOUDINARY_API_KEY=your-api-key
```

**4. CLOUDINARY_API_SECRET**
```
CLOUDINARY_API_SECRET=your-api-secret
```

**5. NEXT_PUBLIC_BASE_URL**
```
NEXT_PUBLIC_BASE_URL=https://your-project.vercel.app
```
(سيتم تحديثه بعد النشر)

### 4.4 إنشاء Vercel Postgres (إذا اخترت هذا الخيار)

1. من صفحة المشروع في Vercel، اذهب إلى تبويب "Storage"
2. اضغط "Create Database"
3. اختر "Postgres"
4. اضغط "Continue"
5. اختر منطقة قريبة
6. اضغط "Create"
7. بعد الإنشاء، اذهب إلى تبويب ".env.local"
8. انسخ قيمة `POSTGRES_PRISMA_URL`
9. عد إلى Settings > Environment Variables
10. أضف/عدل `DATABASE_URL` بالقيمة المنسوخة

### 4.5 النشر!
1. اضغط "Deploy"
2. انتظر 2-3 دقائق حتى ينتهي النشر
3. بعد النشر الناجح، ستحصل على رابط مثل: `https://sadaqa-platform.vercel.app`

---

## الخطوة 5: تشغيل Migrations

### 5.1 تثبيت Vercel CLI (اختياري)

```bash
npm install -g vercel
```

### 5.2 تسجيل الدخول

```bash
vercel login
```

### 5.3 ربط المشروع المحلي

```bash
vercel link
```

### 5.4 سحب Environment Variables

```bash
vercel env pull .env.local
```

### 5.5 تشغيل Migration

```bash
npx prisma migrate deploy
```

**أو** من خلال Vercel Dashboard:
1. اذهب إلى Settings > Functions
2. في قسم "Serverless Function Region"، اضغط على "Redeploy"
3. سيقوم Vercel بتشغيل `prisma generate` تلقائياً

---

## الخطوة 6: تحديث Base URL

1. بعد النشر الناجح، انسخ رابط المشروع من Vercel
2. اذهب إلى Settings > Environment Variables
3. عدل `NEXT_PUBLIC_BASE_URL` إلى الرابط الفعلي
4. اضغط "Save"
5. اذهب إلى "Deployments" واضغط على النقاط الثلاث بجانب آخر نشر
6. اضغط "Redeploy"

---

## الخطوة 7: التحقق من النشر

### 7.1 افتح الموقع
افتح الرابط في المتصفح: `https://your-project.vercel.app`

### 7.2 اختبر الميزات
1. ✅ الصفحة الرئيسية تظهر بشكل صحيح
2. ✅ الضغط على "ابدأ الآن" يوجهك لصفحة الإنشاء
3. ✅ ملء النموذج وإنشاء صفحة صدقة
4. ✅ رفع صورة يعمل (Cloudinary)
5. ✅ صفحة الصدقة تظهر بشكل صحيح
6. ✅ عدادات الأذكار تعمل
7. ✅ مشاركة الصفحة تعمل (Open Graph)

---

## نصائح مهمة

### 🔒 الأمان
- **لا تشارك** Environment Variables أبداً
- **لا ترفع** ملف `.env` أو `.env.local` إلى GitHub
- GitHub يتجاهل هذه الملفات تلقائياً بفضل `.gitignore`

### 🚀 الأداء
- Vercel تقوم بتحسين الصور تلقائياً
- استخدم Edge Functions إذا كنت تريد أداءً أسرع
- راقب استخدامك من Vercel Dashboard

### 💰 الحدود المجانية

**Vercel:**
- 100 GB Bandwidth شهرياً
- Unlimited deployments
- Edge Functions: 100,000 requests/month

**Cloudinary:**
- 25 GB Storage
- 25 GB Bandwidth شهرياً

**Vercel Postgres:**
- 256 MB حجم قاعدة البيانات
- 60 ساعة Compute time شهرياً

**Supabase:**
- 500 MB حجم قاعدة البيانات
- Unlimited API requests

**Neon:**
- 3 GB حجم قاعدة البيانات
- Unlimited queries

---

## استكشاف الأخطاء

### مشكلة: Database connection failed

**الحل:**
1. تأكد من صحة `DATABASE_URL`
2. تأكد من وجود `?sslmode=require` في نهاية الرابط
3. جرب Redeploy

### مشكلة: Image upload fails

**الحل:**
1. تأكد من صحة بيانات Cloudinary
2. تأكد من كتابة الـ Cloud Name بدون `https://`
3. تحقق من Cloudinary Dashboard > Settings > Security

### مشكلة: 404 on memorial page

**الحل:**
1. تأكد من تشغيل Prisma migrations
2. تحقق من Vercel Logs في Dashboard
3. جرب إعادة build: Deployments > Redeploy

---

## الدعم

إذا واجهت أي مشكلة:
1. تحقق من Vercel Logs: Dashboard > Project > Logs
2. تحقق من Database status
3. تحقق من Cloudinary Dashboard

---

**مبروك! 🎉 منصة صدقة أصبحت متاحة للعالم!**

يمكنك الآن مشاركة الرابط مع الناس ليستخدموا المنصة ويصل الأجر للمتوفين.

**اللهم اجعل هذا العمل في ميزان حسناتنا**
