# 🚀 دليل رفع المشروع على الإنترنت مجاناً

## 📋 نظرة عامة

سنستخدم هذه الخدمات المجانية **100%**:
- ✅ **Vercel** - لاستضافة الموقع (مجاني للأبد)
- ✅ **Neon** أو **Supabase** - لقاعدة البيانات PostgreSQL (مجاني)
- ✅ **Cloudinary** - لتخزين الصور (مجاني حتى 25GB)

---

## 🎯 الخطوات الكاملة

### الخطوة 1️⃣: إنشاء حساب GitHub (إذا لم يكن لديك)

1. اذهب إلى: https://github.com
2. اضغط **Sign Up**
3. أدخل Email, Password, Username
4. أكمل التسجيل

---

### الخطوة 2️⃣: رفع المشروع على GitHub

#### أ) تثبيت Git (إذا لم يكن مثبت)

قم بتحميله من: https://git-scm.com/download/win

#### ب) رفع المشروع

افتح PowerShell في مجلد المشروع واكتب:

```powershell
# تهيئة Git
git init

# إضافة كل الملفات
git add .

# عمل commit
git commit -m "Initial commit - Premium Sadaqa Platform"

# إنشاء repo على GitHub
# اذهب إلى https://github.com/new
# اسم الـ repo: sadaqa
# اضغط Create repository
# ثم ارجع للـ PowerShell:

# استبدل YOUR_USERNAME باسم المستخدم الخاص بك
git remote add origin https://github.com/YOUR_USERNAME/sadaqa.git
git branch -M main
git push -u origin main
```

---

### الخطوة 3️⃣: إنشاء قاعدة بيانات مجانية

لديك خيارين ممتازين:

#### الخيار أ) Neon (موصى به ⭐)

1. اذهب إلى: https://neon.tech
2. اضغط **Sign Up** (يمكنك التسجيل بـ GitHub)
3. اضغط **Create your first project**
4. اختر اسم للـ database: `sadaqa`
5. اختر المنطقة الأقرب لك (Europe/Middle East)
6. اضغط **Create Project**

**احصل على رابط الاتصال:**
7. اضغط على اسم المشروع
8. اذهب لتبويب **Connection Details**
9. انسخ الـ `Connection string` (تبدو كده):
```
postgresql://username:password@ep-xxx.region.neon.tech/sadaqa?sslmode=require
```

#### الخيار ب) Supabase

1. اذهب إلى: https://supabase.com
2. اضغط **Start your project**
3. سجل بـ GitHub
4. اضغط **New Project**
5. اختر:
   - Name: `sadaqa`
   - Database Password: (اختر كلمة سر قوية واحفظها!)
   - Region: أقرب منطقة
6. انتظر 2 دقيقة
7. اذهب لـ **Project Settings** → **Database**
8. انسخ الـ `Connection String` من قسم `URI`

---

### الخطوة 4️⃣: Cloudinary (للصور)

1. اذهب إلى: https://cloudinary.com
2. اضغط **Sign Up for Free**
3. املأ البيانات
4. بعد التسجيل اذهب لـ **Dashboard**
5. ستجد:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
6. احفظهم كلهم!

---

### الخطوة 5️⃣: إعداد Vercel

1. اذهب إلى: https://vercel.com
2. اضغط **Sign Up**
3. سجل بـ **GitHub** (الأسهل)
4. بعد تسجيل الدخول:
   - اضغط **Add New...** → **Project**
   - اختر الـ repository اللي رفعته (`sadaqa`)
   - اضغط **Import**

---

### الخطوة 6️⃣: إضافة Environment Variables في Vercel

في صفحة الـ project على Vercel:

1. اضغط **Environment Variables**
2. أضف المتغيرات دي واحدة واحدة:

```bash
# Database
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
# (الرابط اللي نسخته من Neon أو Supabase)

# NextAuth
NEXTAUTH_SECRET=اكتب-اي-نص-طويل-وعشوائي-هنا-مثل-abc123xyz789
NEXTAUTH_URL=https://your-project-name.vercel.app
# (هتعرف الرابط بعد الـ deploy)

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=cloud-name-من-cloudinary
CLOUDINARY_API_KEY=api-key-من-cloudinary
CLOUDINARY_API_SECRET=api-secret-من-cloudinary
```

**ملاحظة مهمة للـ NEXTAUTH_SECRET:**
- اكتب أي نص عشوائي طويل (على الأقل 32 حرف)
- مثال: `my-super-secret-key-for-sadaqa-platform-2026`
- أو استخدم موقع: https://generate-secret.vercel.app

3. لكل متغير:
   - اكتب الـ **Name** (زي `DATABASE_URL`)
   - اكتب الـ **Value** (القيمة)
   - اختر **Production**, **Preview**, **Development** (الثلاثة)
   - اضغط **Add**

---

### الخطوة 7️⃣: Deploy المشروع

1. بعد إضافة كل المتغيرات:
   - اضغط **Deploy**
2. انتظر 2-3 دقائق
3. ستظهر رسالة **Congratulations!** 🎉
4. اضغط على الرابط اللي ظهر
5. موقعك الآن شغال! 🚀

---

### الخطوة 8️⃣: تحديث NEXTAUTH_URL

**مهم جداً!**

1. بعد أول deploy، انسخ رابط الموقع (مثال: `https://sadaqa-xyz.vercel.app`)
2. ارجع لـ Vercel → Project Settings → Environment Variables
3. ابحث عن `NEXTAUTH_URL`
4. اضغط **Edit**
5. غير القيمة للرابط الحقيقي
6. اضغط **Save**
7. ارجع لتبويب **Deployments**
8. اضغط على آخر deployment → **⋯** → **Redeploy**

---

### الخطوة 9️⃣: تشغيل Database Migrations

بعد أول deploy ناجح، لازم نعمل database setup:

**الطريقة الأولى (من Vercel):**

1. في Vercel Dashboard:
   - اذهب لـ Projects → sadaqa
   - اضغط **Settings** → **General**
   - تحت **Build & Development Settings**
   - في **Install Command** اكتب:
   ```bash
   npm install && npx prisma generate && npx prisma db push
   ```
2. ارجع لـ Deployments واعمل Redeploy

**الطريقة الثانية (من جهازك):**

```powershell
# غير DATABASE_URL بالرابط الحقيقي من Neon/Supabase
$env:DATABASE_URL="postgresql://..."
npx prisma db push
```

---

## ✅ التأكد من نجاح الـ Deploy

افتح موقعك وجرب:

1. ✓ الصفحة الرئيسية تفتح
2. ✓ اضغط "ابدأ الآن"
3. ✓ جرب إنشاء صفحة memorial جديدة
4. ✓ ارفع صورة (للتأكد من Cloudinary)
5. ✓ جرب العدادات

---

## 🔄 تحديث الموقع مستقبلاً

كل ما تعدل في الكود:

```powershell
git add .
git commit -m "وصف التعديل"
git push
```

Vercel هيعمل deploy تلقائياً! ⚡

---

## 📊 الموارد المجانية المتاحة

### Vercel
- ✅ Bandwidth: غير محدود
- ✅ Deployments: غير محدود
- ✅ Custom Domain: مجاني
- ✅ SSL Certificate: مجاني تلقائي

### Neon (Free Tier)
- ✅ Database Size: حتى 0.5 GB
- ✅ Branches: 10
- ✅ Compute: 191 ساعة/شهر
- ✅ مناسب لـ: آلاف الزيارات شهرياً

### Supabase (Free Tier)
- ✅ Database Size: حتى 500 MB
- ✅ Storage: 1 GB
- ✅ Bandwidth: 2 GB
- ✅ مناسب لـ: آلاف الزيارات شهرياً

### Cloudinary (Free Tier)
- ✅ Storage: 25 GB
- ✅ Bandwidth: 25 GB/month
- ✅ Transformations: 25,000/month
- ✅ مناسب لـ: آلاف الصور

---

## 🌐 إضافة Domain مخصص (اختياري)

إذا كنت تريد domain خاص بك (مثل: sadaqa.com):

### شراء Domain

**مواقع رخيصة:**
- Namecheap: https://www.namecheap.com (~$10/year)
- Porkbun: https://porkbun.com (~$8/year)
- Google Domains: https://domains.google (~$12/year)

**Domain مجاني:**
- Freenom: https://www.freenom.com (مجاني لسنة)

### ربط Domain بـ Vercel

1. اشتري/سجل للـ domain
2. في Vercel:
   - اذهب لـ Project Settings → Domains
   - اضغط **Add**
   - اكتب اسم الدومين (مثل: `sadaqa.com`)
   - اضغط **Add**
3. اتبع التعليمات لإعداد DNS
4. انتظر 24-48 ساعة للتفعيل

---

## ❓ حل المشاكل الشائعة

### مشكلة: "Database connection failed"

**الحل:**
```powershell
# تأكد من صحة DATABASE_URL
# جرب الاتصال من جهازك:
$env:DATABASE_URL="your-database-url"
npx prisma db push
```

### مشكلة: "Cloudinary upload failed"

**الحل:**
- تأكد من صحة CLOUD_NAME, API_KEY, API_SECRET
- تأكد من تفعيل Unsigned uploads في Cloudinary:
  - Settings → Upload → Unsigned uploading: **Enable**

### مشكلة: "Build failed"

**الحل:**
```powershell
# جرب البناء على جهازك:
npm run build

# إذا نجح على جهازك ففشل على Vercel:
# تأكد من:
# 1. كل المتغيرات موجودة
# 2. node version متوافق (في vercel.json حدده)
```

### مشكلة: "Page not found after deploy"

**الحل:**
- امسح `.next` folder على جهازك
- اعمل commit و push
- أو في Vercel: Redeploy

---

## 📈 مراقبة الأداء

### Vercel Analytics (مجاني)

1. في Vercel Dashboard
2. اذهب لـ Analytics
3. ستجد:
   - عدد الزيارات
   - سرعة التحميل
   - المستخدمين
   - الأخطاء

---

## 🔐 الأمان

###✅ ما هو آمن بالفعل:

- ✓ SSL/HTTPS تلقائي من Vercel
- ✓ Environment Variables مخفية
- ✓ Database محمية بكلمة سر
- ✓ Rate limiting من Vercel

### ⚠️ نصائح إضافية:

```javascript
// أضف في middleware.ts للحماية من spam:
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Rate limiting بسيط
  const ip = request.ip ?? 'unknown'
  // يمكنك إضافة logic للتحكم في عدد الطلبات
  
  return NextResponse.next()
}
```

---

## 💡 نصائح للتحسين

### 1. SEO

أضف في `app/layout.tsx`:

```typescript
export const metadata = {
  metadataBase: new URL('https://your-domain.vercel.app'),
  // ... rest of metadata
}
```

### 2. Performance

- ✓ الصور محسّنة تلقائياً مع Next.js Image
- ✓ Vercel Edge Network للسرعة
- ✓ Automatic Code Splitting

### 3. Analytics

أضف Google Analytics:

```bash
npm install @next/third-parties
```

```typescript
// في app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

---

## 🎉 مبروك!

موقعك الآن على الإنترنت ومتاح للملايين! 🌍

### شارك الرابط:

```
https://your-project.vercel.app
```

### وسوّق للموقع:

- 📱 شاركه على تويتر/فيسبوك
- 💬 في مجموعات الواتساب
- 📧 أرسله للأصدقاء والعائلة
- 🕌 شاركه في المساجد والمراكز الإسلامية

---

## 📞 الدعم

إذا واجهت أي مشكلة:

### Vercel Support
- Docs: https://vercel.com/docs
- Discord: https://discord.gg/vercel

### Neon Support
- Docs: https://neon.tech/docs
- Discord: https://discord.gg/neon

### Cloudinary Support
- Docs: https://cloudinary.com/documentation
- Support: https://support.cloudinary.com

---

## 🔄 Backup

### نسخ احتياطي من Database:

```bash
# تصدير البيانات
npx prisma db pull
```

للاحتفاظ بنسخة احتياطية من الصور، استخدم Cloudinary Media Library.

---

**تم بحمد الله! موقعك جاهز للعالم 🚀**

*ملاحظة: كل الخدمات المذكورة مجانية 100% للاستخدام الشخصي وللمشاريع الصغيرة والمتوسطة.*
