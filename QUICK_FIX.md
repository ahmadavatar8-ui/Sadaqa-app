# 🚀 دليل الإصلاح السريع - مشكلة الروابط

## ❌ المشكلة
الروابط لا تُنشأ لأن Cloudinary غير مُعد بشكل صحيح.

## ✅ الحل السريع (5 دقائق)

### الخيار 1️⃣ : استخدام Cloudinary (موصى به)

#### الخطوة 1: إنشاء حساب مجاني
1. اذهب إلى: https://cloudinary.com/users/register/free
2. سجّل بالبريد الإلكتروني
3. تأكد من البريد الإلكتروني

#### الخطوة 2: الحصول على المفاتيح
1. اذهب إلى Dashboard: https://console.cloudinary.com/
2. ستجد في الأعلى:
   ```
   Cloud name: dxxxxxx
   API Key: 123456789012345
   API Secret: ****** (اضغط "Show" لإظهاره)
   ```

#### الخطوة 3: تحديث .env.local
افتح ملف `.env.local` واستبدل القيم:

```env
# Database
DATABASE_URL="file:./dev.db"

# Cloudinary - استبدل بقيمك الحقيقية
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dxxxxxx"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="your-secret-here"

# Base URL
NEXT_PUBLIC_BASE_URL="http://localhost:3001"
```

#### الخطوة 4: إعادة تشغيل السيرفر
```bash
# أوقف السيرفر الحالي (Ctrl+C)
npm run dev
```

#### الخطوة 5: اختبار
1. افتح: http://localhost:3001
2. اضغط "ابدأ الآن"
3. املأ النموذج
4. ارفع صورة
5. اضغط "إنشاء صفحة الصدقة"
6. ✅ **يجب أن يعمل الآن!**

---

### الخيار 2️⃣ : حفظ محلي (للتطوير فقط)

إذا لا تريد استخدام Cloudinary حالياً:

#### الخطوة 1: إنشاء مجلد الصور
```bash
mkdir public\uploads
```

#### الخطوة 2: استبدال ملف Cloudinary
استبدل محتوى ملف `lib/cloudinary.ts` بـ:

```typescript
import fs from 'fs';
import path from 'path';

export async function uploadImage(
    file: Buffer, 
    filename: string
): Promise<{ url: string; publicId: string }> {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uniqueFilename = `${filename}_${Date.now()}.jpg`;
    const filePath = path.join(uploadsDir, uniqueFilename);
    
    fs.writeFileSync(filePath, file);

    return {
        url: `/uploads/${uniqueFilename}`,
        publicId: uniqueFilename
    };
}

export default null;
```

#### الخطوة 3: إعادة التشغيل والاختبار
```bash
npm run dev
```

#### ⚠️ تحذير
هذا الحل للتطوير المحلي فقط! لا يعمل على Vercel.

---

## 🔍 كيف تعرف أن المشكلة حُلّت؟

### ✅ علامات النجاح:
1. عند ملء النموذج والضغط على الزر:
   - يظهر loading spinner
   - يتم التحويل إلى صفحة جديدة
   - الرابط يكون مثل: `/sadaqa/550e8400-...`

2. الصفحة الجديدة تعرض:
   - ✅ صورة المتوفي
   - ✅ الاسم
   - ✅ الأدعية
   - ✅ السور القرآنية
   - ✅ عدادات الأذكار

### ❌ علامات الفشل:
- رسالة خطأ تظهر
- لا يتم التحويل
- صفحة فارغة
- خطأ 500

---

## 🐛 استكشاف الأخطاء

### إذا ظهر خطأ "حدث خطأ أثناء إنشاء الصفحة"

1. **افتح Console المتصفح** (F12)
2. **ابحث عن الخطأ الأحمر**
3. **تحقق من Terminal السيرفر**
4. **الأخطاء الشائعة**:

```
❌ "Must supply api_key"
   → الحل: تأكد من وجود CLOUDINARY_API_KEY في .env.local

❌ "Invalid signature"  
   → الحل: تأكد من صحة CLOUDINARY_API_SECRET

❌ "Cloud not found"
   → الحل: تأكد من صحة NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

❌ "ENOENT: no such file or directory 'public/uploads'"
   → الحل: أنشئ المجلد: mkdir public\uploads
```

---

## 📱 اختبار سريع

### نموذج بيانات للاختبار:
- **الجنس**: ذكر
- **الاسم**: أحمد محمد علي حسن
- **الصورة**: أي صورة (JPG/PNG) أقل من 5MB

### النتيجة المتوقعة:
```
✅ تحويل إلى: http://localhost:3001/sadaqa/[UUID]
✅ الصفحة تعرض البيانات بشكل صحيح
✅ العدادات تعمل عند الضغط
✅ أزرار المشاركة تعمل
```

---

## 🎯 ملخص

**السبب**: Cloudinary credentials مفقودة  
**الحل**: إضافة credentials صحيحة أو استخدام حفظ محلي  
**الوقت**: 5 دقائق  
**النتيجة**: الروابط ستُنشأ بنجاح ✅

---

**بالتوفيق! 🚀**
