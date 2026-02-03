# 🤝 المساهمة في منصة صدقة

نرحب بجميع المساهمات التي تساعد في تحسين وتطوير منصة صدقة!

---

## 🎯 أنواع المساهمات

### 1. 🐛 الإبلاغ عن الأخطاء (Bug Reports)
إذا وجدت خطأ أو مشكلة:
- افتح Issue على GitHub
- اذكر الخطوات التي أدت للمشكلة
- أرفق screenshots إن أمكن
- اذكر المتصفح ونظام التشغيل

### 2. 💡 اقتراح ميزات جديدة (Feature Requests)
عندك فكرة رائعة؟
- افتح Issue بعنوان واضح
- اشرح الميزة بالتفصيل
- اذكر الفائدة المتوقعة
- أضف mockups إن أمكن

### 3. 🔧 إصلاح الأخطاء (Bug Fixes)
- Fork المشروع
- أصلح المشكلة
- اكتب tests
- افتح Pull Request

### 4. ✨ إضافة ميزات (New Features)
- ناقش الميزة أولاً (Issue)
- Fork واعمل في branch منفصل
- اتبع معايير الكود
- أضف documentation
- افتح Pull Request

### 5. 📝 تحسين التوثيق
- توضيح نقاط غامضة
- إضافة أمثلة
- ترجمة لل engلات أخرى
- تصحيح أخطاء إملائية

### 6. 🌍 الترجمة
- إضافة لغات جديدة
- تحسين الترجمات الموجودة
- مراجعة المصطلحات

---

## 📜 معايير الكود (Code Guidelines)

### TypeScript
```typescript
// استخدم types واضحة
interface Memorial {
  id: string;
  name: string;
  gender: 'MALE' | 'FEMALE';
}

// استخدم async/await
async function getMemorial(id: string): Promise<Memorial | null> {
  try {
    return await prisma.memorial.findUnique({ where: { id } });
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

### React Components
```typescript
// استخدم Server Components عندما ممكن
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Client Components فقط عند الحاجة
'use client';
export default function Interactive() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### CSS/Tailwind
```tsx
// استخدم Tailwind classes
<div className="flex items-center justify-center p-4 bg-spiritual-500">

// للأنماط المعقدة، استخدم CSS modules أو globals.css
```

### Naming Conventions
```
- Components: PascalCase (MemorialCard.tsx)
- Functions: camelCase (getDuaText)
- Constants: UPPER_SNAKE_CASE (QURAN_SURAHS)
- Files: kebab-case (memorial-content.tsx)
```

---

## 🔍 معايير Quality

### ✅ Checklist قبل Submit:
- [ ] الكود يعمل محلياً
- [ ] لا توجد أخطاء TypeScript
- [ ] `npm run lint` بدون errors
- [ ] `npm run build` ينجح
- [ ] الميزة تعمل كما متوقع
- [ ] التوثيق محدّث
- [ ] Commit messages واضحة

### Commit Messages
```bash
# ✅ جيد
feat: add Quran audio player
fix: resolve counter increment bug
docs: update deployment guide
style: improve landing page animations

# ❌ غير واضح
update
fix bug
changes
```

---

## 🌱 الخطوات الأساسية للمساهمة

### 1. Fork المشروع
```bash
# اضغط Fork على GitHub
```

### 2. Clone المشروع
```bash
git clone https://github.com/YOUR_USERNAME/sadaqa-platform.git
cd sadaqa-platform
```

### 3. تثبيت المكتبات
```bash
npm install
npx prisma generate
npx prisma db push
```

### 4. إنشاء Branch جديد
```bash
git checkout -b feature/amazing-feature
# أو
git checkout -b fix/bug-description
```

### 5. اعمل التعديلات
```bash
# اكتب الكود
# اختبر محلياً
npm run dev
```

### 6. Commit التغييرات
```bash
git add .
git commit -m "feat: add amazing feature"
```

### 7. Push للـ Fork
```bash
git push origin feature/amazing-feature
```

### 8. افتح Pull Request
- اذهب إلى GitHub
- اضغط "New Pull Request"
- اكتب وصف واضح للتغييرات
- أضف screenshots إن أمكن

---

## 🧪 الاختبارات

### قبل كل PR:
```bash
# تحقق من TypeScript
npm run build

# Lint
npm run lint

# اختبر يدوياً
npm run dev
# افتح http://localhost:3000
# اختبر الميزة الجديدة
```

---

## 💬 التواصل

### للأسئلة:
- افتح Discussion على GitHub
- اسأل في Issues
- تواصل مع المنتدى

### للإبلاغ عن مشاكل أمنية:
- **لا تفتح Issue عام**
- راسلنا مباشرة على: security@sadaqa.app (مثال)

---

## 🎓 موارد مفيدة

### لتعلم التقنيات المستخدمة:
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Framer Motion](https://www.framer.com/motion)

---

## 🏆 المساهمون

شكراً لكل من ساهم في هذا المشروع! 

<!-- سيتم إضافة قائمة Contributors تلقائياً من GitHub -->

---

## 📄 الترخيص

بالمساهمة في هذا المشروع، أنت توافق على أن مساهمتك ستكون تحت نفس الترخيص.

---

## ❤️ شكراً!

كل مساهمة - كبيرة كانت أم صغيرة - لها قيمة كبيرة.

**جزاك الله خيراً على وقتك وجهدك!**

**اللهم اجعل هذا العمل في ميزان حسناتنا جميعاً** 🤲

---

## 🌟 أفكار للمبتدئين

إذا كنت مبتدئاً وتريد المساهمة، هذه أفكار سهلة:

### مستوى سهل:
- [ ] تصحيح أخطاء إملائية
- [ ] تحسين README
- [ ] إضافة أمثلة للتوثيق
- [ ] تحسين رسائل الخطأ

### مستوى متوسط:
- [ ] إضافة validation إضافي
- [ ] تحسين UI/UX
- [ ] إضافة animations
- [ ] تحسين accessibility

### مستوى متقدم:
- [ ] إضافة ميزات جديدة
- [ ] تحسينات الأداء
- [ ] refactoring
- [ ] تحسينات الأمان

---

**ابدأ صغيراً، وستنمو مهاراتك تدريجياً!** 💪
