# 🚀 البدء السريع - منصة صدقة

## الخطوات الأساسية (5 دقائق)

### 1. تثبيت المكتبات
```bash
npm install
```

### 2. إعداد قاعدة البيانات
```bash
npx prisma generate
npx prisma db push
```

### 3. تشغيل المشروع
```bash
npm run dev
```

### 4. افتح المتصفح
```
http://localhost:3000
```

---

## ✅ جاهز للاستخدام!

المشروع الآن يعمل محلياً ويمكنك:
- عرض الصفحة الرئيسية
- إنشاء صفحة صدقة
- اختبار جميع الميزات

---

## 📝 ملاحظة: Cloudinary

حالياً، رفع الصور معطل لأنك لم تضف بيانات Cloudinary.

### لتفعيل رفع الصور:

1. **أنشئ حساب مجاني على Cloudinary:**
   - اذهب إلى: https://cloudinary.com
   - اضغط "Sign Up"
   
2. **احصل على بيانات API:**
   - من Dashboard انسخ:
     * Cloud Name
     * API Key
     * API Secret

3. **أضف البيانات في `.env.local`:**
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **أعد تشغيل السيرفر:**
   ```bash
   npm run dev
   ```

---

## 🌐 النشر على الإنترنت

للنشر على Vercel واتاحة المنصة للعالم، اتبع:

📖 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - دليل النشر الكامل

---

## 📚 المزيد من المعلومات

- 📄 **[README.md](./README.md)** - دليل شامل للمشروع
- 🏗️ **[ARCHITECTURE.md](./ARCHITECTURE.md)** - البنية المعمارية
- 📊 **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - ملخص المشروع

---

## 🆘 مشاكل شائعة

### مشكلة: `npm install` فشل
**الحل:** تأكد من تثبيت Node.js (الإصدار 18 أو أحدث)

### مشكلة: `prisma db push` فشل
**الحل:** تأكد من وجود ملف `.env` في المجلد الرئيسي

### مشكلة: الصفحة لا تفتح
**الحل:** تأكد من أن المنفذ 3000 غير مستخدم

---

## ✨ استمتع!

**اللهم اجعل هذا العمل في ميزان حسناتنا** 🤲
