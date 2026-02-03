# 🌙 صدقة - منصة الصدقة الجارية الرقمية

منصة إسلامية حديثة لإنشاء صفحات صدقة جارية رقمية للمتوفين، مع إمكانية المشاركة عبر روابط فريدة.

## ✨ المميزات

- 🎨 **تصميم روحاني راقي**: واجهة هادئة بألوان سماوية وخضراء مع تأثيرات Glass Morphism
- 📿 **أذكار تفاعلية**: عدادات للأذكار تُحدّث في الوقت الفعلي مع حماية من Spam
- 📖 **محتوى إسلامي**: أدعية مخصصة حسب الجنس + 4 سور قرآنية كاملة
- 🔒 **أمان عالي**: حماية من XSS، Rate Limiting، تحقق صارم من المدخلات
- ⚡ **أداء ممتاز**: تحسين الصور، Lazy Loading، Server Components
- 📱 **تصميم متجاوب**: يعمل بشكل مثالي على جميع الأجهزة
- 🌐 **SEO محسّن**: Open Graph Tags لمشاركة جميلة على وسائل التواصل

## 🛠️ التقنيات المستخدمة

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Database**: Prisma ORM + SQLite (قابل للترقية لـ PostgreSQL)
- **Image Storage**: Cloudinary
- **Validation**: Zod
- **Security**: DOMPurify, Rate Limiting

## 📦 التثبيت والإعداد

### 1. تثبيت المكتبات

```bash
npm install
```

### 2. إعداد قاعدة البيانات

```bash
npx prisma generate
npx prisma db push
```

### 3. إعداد Cloudinary (اختياري للصور)

1. أنشئ حساب مجاني على [Cloudinary](https://cloudinary.com)
2. احصل على بيانات الاعتماد من Dashboard
3. افتح ملف `.env.local` وأضف:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

> **ملاحظة**: إذا لم تضف بيانات Cloudinary، ستحتاج لتعديل `lib/cloudinary.ts` لحفظ الصور محلياً

### 4. تشغيل المشروع

```bash
npm run dev
```

افتح المتصفح على: [http://localhost:3000](http://localhost:3000)

## 📁 هيكل المشروع

```
sadaqa/
├── app/
│   ├── api/
│   │   ├── memorial/       # API لإنشاء الصفحات
│   │   └── counter/        # API لتحديث العدادات
│   ├── create/             # صفحة إنشاء صدقة
│   ├── sadaqa/[id]/        # صفحة الصدقة الديناميكية
│   ├── layout.tsx          # Root Layout مع RTL
│   ├── page.tsx            # الصفحة الرئيسية
│   └── globals.css         # الأنماط العامة
├── lib/
│   ├── prisma.ts           # Prisma Client
│   ├── cloudinary.ts       # إعدادات Cloudinary
│   ├── dua.ts              # نصوص الأدعية والقرآن
│   ├── validation.ts       # Zod Schemas
│   └── utils.ts            # دوال مساعدة
├── prisma/
│   └── schema.prisma       # Database Schema
└── package.json
```

## 🎯 كيفية الاستخدام

### 1. إنشاء صفحة صدقة

1. انتقل إلى الصفحة الرئيسية واضغط "ابدأ الآن"
2. اختر جنس المتوفي (ذكر/أنثى) - يؤثر على صيغة الدعاء
3. أدخل اسم رباعي (4 كلمات بالضبط)
4. ارفع صورة (JPG, PNG, WEBP - حد أقصى 5MB)
5. اضغط "إنشاء صفحة الصدقة"

### 2. مشاركة الصفحة

- سيتم توليد رابط فريد تلقائياً
- شارك الرابط عبر WhatsApp، Facebook، Twitter، إلخ
- عند المشاركة، ستظهر صورة المتوفي واسمه تلقائياً (Open Graph)

### 3. التفاعل مع الصفحة

- قراءة الأدعية المخصصة
- قراءة السور القرآنية
- الضغط على أزرار الأذكار لزيادة العدادات
- مشاركة الصفحة مع الآخرين

## 🚀 النشر على Vercel

### الخطوات:

1. **رفع المشروع على GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **الاتصال بـ Vercel**

- اذهب إلى [vercel.com](https://vercel.com)
- اضغط "Import Project"
- اختر مستودع GitHub
- Vercel سيكتشف Next.js تلقائياً

3. **إعداد قاعدة البيانات**

اختر أحد الخيارات:

**خيار 1: Vercel Postgres (موصى به)**
```bash
vercel storage create postgres
```

**خيار 2: Supabase**
- أنشئ مشروع على [supabase.com](https://supabase.com)
- انسخ `DATABASE_URL` من Settings > Database

**خيار 3: Neon**
- أنشئ قاعدة بيانات على [neon.tech](https://neon.tech)
- انسخ Connection String

4. **إضافة Environment Variables في Vercel**

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_BASE_URL="https://your-domain.vercel.app"
```

5. **تشغيل Migrations**

```bash
npx prisma migrate deploy
```

6. **Deploy!**

- Vercel سينشر المشروع تلقائياً
- ستحصل على رابط مثل: `your-project.vercel.app`

## 🔒 الأمان والأداء

### ميزات الأمان:

- ✅ XSS Protection مع DOMPurify
- ✅ Rate Limiting (5 صفحات/ساعة، 10 أذكار/ثانية)
- ✅ Input Validation مع Zod
- ✅ Security Headers (CSP, X-Frame-Options)
- ✅ تحقق صارم من الصور (نوع، حجم)

### تحسينات الأداء:

- ✅ Server Components (Next.js 14)
- ✅ Image Optimization (Next.js Image + Cloudinary)
- ✅ Code Splitting
- ✅ Font Optimization (Google Fonts)
- ✅ Lazy Loading

## 📱 المتصفحات المدعومة

- Chrome/Edge (آخر إصدارين)
- Firefox (آخر إصدارين)
- Safari (آخر إصدارين)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 المساهمة

المشروع مفتوح المصدر ويرحب بالمساهمات. تفضل بفتح Issue أو Pull Request.

## 📄 الترخيص

هذا المشروع مجاني للاستخدام الشخصي والتجاري.

## 🌟 تطويرات مستقبلية

- [ ] لوحة تحكم لإدارة الصفحات
- [ ] إحصائيات تفصيلية
- [ ] تحميل الصفحة كـ PDF
- [ ] دعم لغات متعددة
- [ ] تلاوة قرآنية صوتية
- [ ] توليد QR Code
- [ ] إضافة أدعية مخصصة

---

**صُنع بـ ❤️ لوجه الله تعالى**

**اللهم اجعل هذا العمل في ميزان حسناتنا**
