# 🚀 رفع المشروع - خطوات سريعة

## المتطلبات الأساسية
- [ ] حساب GitHub
- [ ] حساب Vercel 
- [ ] حساب Neon أو Supabase
- [ ] حساب Cloudinary

---

## ⚡ الخطوات السريعة (15 دقيقة)

### 1. رفع على GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/sadaqa.git
git push -u origin main
```

### 2. قاعدة البيانات (Neon)
1. https://neon.tech → Sign Up
2. Create Project → اختر اسم `sadaqa`
3. Copy Connection String

### 3. Cloudinary
1. https://cloudinary.com → Sign Up
2. Dashboard → Copy: Cloud Name, API Key, API Secret

### 4. Deploy على Vercel
1. https://vercel.com → Sign Up بـ GitHub
2. Import Project → اختر `sadaqa`
3. أضف Environment Variables:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=any-long-random-text-here-abc123xyz
NEXTAUTH_URL=https://your-app.vercel.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

4. Deploy!

### 5. بعد Deploy الأول
1. Copy رابط الموقع
2. Edit `NEXTAUTH_URL` → حط الرابط الحقيقي
3. Redeploy

### 6. Database Setup
```bash
npx prisma db push
```

---

## ✅ النتيجة

موقعك الآن شغال على:
🌐 https://your-project.vercel.app

---

## 🔗 روابط مهمة

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Neon Console**: https://console.neon.tech
- **Cloudinary**: https://cloudinary.com/console

---

## 📝 ملاحظات

- كل push على GitHub = deploy تلقائي
- الخدمات كلها **مجانية 100%**
- SSL تلقائي ✅
- سريع جداً ⚡

للتفاصيل الكاملة: اقرأ `DEPLOYMENT_GUIDE_AR.md`
