# البنية المعمارية لمنصة صدقة

## نظرة عامة

منصة صدقة هي تطبيق Next.js 14 مبني على App Router مع قاعدة بيانات PostgreSQL/SQLite وتخزين سحابي للصور.

```
┌─────────────────────────────────────────────────────────┐
│                    المستخدم (Browser)                    │
└───────────────────────┬─────────────────────────────────┘
                        │
                        │ HTTPS
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js 14 App Router (Vercel)             │
│  ┌────────────────────────────────────────────────┐    │
│  │  Pages (React Server Components)               │    │
│  │  • /                (Landing Page)             │    │
│  │  • /create          (Memorial Creation)        │    │
│  │  • /sadaqa/[id]     (Memorial Display)         │    │
│  └────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────┐    │
│  │  API Routes (Serverless Functions)             │    │
│  │  • POST /api/memorial  (Create memorial)       │    │
│  │  • POST /api/counter   (Update counter)        │    │
│  └────────────────────────────────────────────────┘    │
└───────┬──────────────────────────────┬─────────────────┘
        │                               │
        │ Prisma ORM                    │ REST API
        ▼                               ▼
┌───────────────────┐          ┌──────────────────┐
│   PostgreSQL      │          │    Cloudinary    │
│   (Database)      │          │  (Image Storage) │
│                   │          │                  │
│  • Memorials      │          │  • User uploads  │
│  • Counters       │          │  • Optimization  │
└───────────────────┘          └──────────────────┘
```

---

## مكونات النظام

### 1. Frontend (React Server Components)

#### الصفحات الرئيسية:

**`app/page.tsx` - الصفحة الرئيسية**
- Hero section مع شعار أنيق
- رسالة تعريفية بالمنصة
- زر CTA للبدء
- قسم الميزات
- Animations بـ Framer Motion

**`app/create/page.tsx` - صفحة إنشاء الصدقة**
- اختيار جنس المتوفي (ذكر/أنثى)
- إدخال اسم رباعي مع التحقق الفوري
- رفع صورة مع معاينة
- Loading state أثناء الإنشاء
- التحقق من صحة البيانات (Client-side)

**`app/sadaqa/[id]/page.tsx` - صفحة الصدقة**
- Server Component لجلب البيانات
- Dynamic metadata لـ SEO
- Open Graph tags للمشاركة
- استدعاء MemorialContent

**`app/sadaqa/[id]/MemorialContent.tsx` - محتوى الصدقة**
- Client Component للتفاعل
- عرض صورة واسم المتوفي
- أدعية مخصصة حسب الجنس
- 4 سور قرآنية
- عدادات أذكار تفاعلية
- زر المشاركة

---

### 2. Backend (API Routes)

#### `app/api/memorial/route.ts`

**الوظيفة:** إنشاء صفحة صدقة جديدة

**Flow:**
```
1. استقبال FormData (name, gender, image)
   ↓
2. Rate Limiting (5 memorials/hour per IP)
   ↓
3. Validation (Zod schema)
   ↓
4. Sanitize input (DOMPurify)
   ↓
5. Upload image to Cloudinary
   ↓
6. Create Memorial in database
   ↓
7. Create Counter record
   ↓
8. Return memorial ID
```

**الأمان:**
- Rate limiting مبني على IP
- XSS protection (DOMPurify)
- File validation (type, size)
- Input validation (Zod)

#### `app/api/counter/route.ts`

**الوظيفة:** تحديث عدادات الأذكار

**Flow:**
```
1. استقبال JSON (memorialId, dhikrType)
   ↓
2. Validation (Zod)
   ↓
3. Rate Limiting (10 updates/sec per dhikr)
   ↓
4. Check memorial exists
   ↓
5. Atomic increment in database
   ↓
6. Return updated counters
```

**الأمان:**
- Rate limiting دقيق (100ms بين كل ضغطة)
- Atomic operations (prevent race conditions)
- Validation على جميع المدخلات

---

### 3. Database Layer (Prisma + SQLite/PostgreSQL)

#### Schema:

```prisma
model Memorial {
  id            String   @id @default(uuid())
  name          String
  gender        String   // "MALE" or "FEMALE"
  imageUrl      String
  imagePublicId String   // للحذف من Cloudinary
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  counters      Counter?
}

model Counter {
  id              String   @id @default(uuid())
  memorialId      String   @unique
  subhanAllah     Int      @default(0)
  alhamdulillah   Int      @default(0)
  allahuAkbar     Int      @default(0)
  laIlahaIllallah Int      @default(0)
  lastUpdated     DateTime @default(now())
}
```

**العلاقات:**
- Memorial → Counter (1:1)
- Cascade delete: حذف Memorial يحذف Counter تلقائياً

**الفهارس:**
- `Memorial.id` (primary)
- `Memorial.createdAt` (لترتيب الصفحات)
- `Counter.memorialId` (للربط السريع)

---

### 4. Image Storage (Cloudinary)

#### `lib/cloudinary.ts`

**Upload Configuration:**
```javascript
{
  folder: 'sadaqa',
  transformation: [
    { width: 800, height: 800, crop: 'fill', gravity: 'face' },
    { quality: 'auto:good' },
    { fetch_format: 'auto' }  // WebP تلقائياً
  ]
}
```

**الميزات:**
- Auto-cropping مع التركيز على الوجه
- تحويل تلقائي لـ WebP
- ضغط ذكي (auto quality)
- CDN عالمي للسرعة

---

### 5. Business Logic Layer

#### `lib/dua.ts` - محرك الأدعية

**Gender-Aware Text Transformation:**
```typescript
const pronouns = gender === 'MALE' 
  ? { له: 'له', ه: 'ه', عنه: 'عنه' } 
  : { له: 'لها', ه: 'ها', عنه: 'عنها' };
```

**المحتوى:**
- 11 دعاء مختلف
- 4 سور قرآنية (الفاتحة، الإخلاص، الفلق، الناس)
- 4 أذكار (سبحان الله، الحمد لله، الله أكبر، لا إله إلا الله)

#### `lib/validation.ts` - التحقق من البيانات

```typescript
memorialSchema = z.object({
  name: z.string()
    .refine(4 words)
    .refine(Arabic only),
  gender: z.enum(['MALE', 'FEMALE'])
})
```

---

## تدفق البيانات

### إنشاء صفحة صدقة:

```
User (Browser)
  ↓
  [Fill Form]
  ↓
Client Validation (Zod)
  ↓
FormData → POST /api/memorial
  ↓
Server Validation
  ↓
Image → Cloudinary API
  ↓
Data → Prisma → Database
  ↓
Return memorial.id
  ↓
Redirect → /sadaqa/[id]
```

### عرض صفحة صدقة:

```
Request /sadaqa/[id]
  ↓
Server Component
  ↓
Prisma.findUnique()
  ↓
Render with data
  ↓
Client Component (MemorialContent)
  ↓
Display + Interactive counters
```

### تحديث عداد:

```
User clicks dhikr button
  ↓
Optimistic UI update (instant)
  ↓
POST /api/counter
  ↓
Rate limit check
  ↓
Prisma.update({ increment })
  ↓
Return new count
  ↓
Sync UI with server value
```

---

## الأمان

### 1. Input Validation
- **Zod schemas** لجميع المدخلات
- **DOMPurify** لمنع XSS
- **File validation** (type, size)

### 2. Rate Limiting
- **Memorial creation:** 5 per hour per IP
- **Counter updates:** 10 per second per dhikr
- In-memory Map (للتطوير) → Redis (للإنتاج)

### 3. Database Security
- **Parameterized queries** (Prisma)
- **No raw SQL**
- **Transaction support**

### 4. HTTP Headers
```javascript
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

---

## الأداء

### 1. Server Components
- HTML يُرسل جاهزاً من الخادم
- Zero JavaScript للمحتوى الثابت
- Fast First Contentful Paint

### 2. Image Optimization
- Next.js Image component
- Lazy loading
- Responsive images (srcset)
- WebP format
- CDN (Cloudinary)

### 3. Code Splitting
- Route-based splitting
- Dynamic imports
- Tree shaking

### 4. Caching
- Static generation للصفحة الرئيسية
- ISR للصفحات الديناميكية (optional)
- CDN caching (Vercel Edge)

---

## قابلية التوسع

### الحالية (MVP):
```
~ 1000 memorials/day
~ 100,000 counter updates/day
~ 10 GB images storage
```

### التوسع المستقبلي:

**1. Database:**
- SQLite → PostgreSQL ✅
- PostgreSQL → PostgreSQL Cluster
- Read replicas للاستعلامات

**2. Rate Limiting:**
- In-memory Map → Redis
- Distributed rate limiting

**3. Image Storage:**
- Cloudinary free → Cloudinary Pro
- أو AWS S3 + CloudFront

**4. Caching:**
- Redis للعدادات
- Cache التحديثات كل 1 ثانية
- Background sync

**5. Monitoring:**
- Vercel Analytics
- Sentry for errors
- Database monitoring

---

## التطويرات المستقبلية

### Phase 2:
- [ ] User accounts (إدارة الصفحات)
- [ ] Analytics dashboard
- [ ] Custom domains
- [ ] Memorial deletion

### Phase 3:
- [ ] Multi-language support
- [ ] Audio Quran recitation
- [ ] QR code generation
- [ ] PDF export

### Phase 4:
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Social features
- [ ] Donation integration

---

## الخلاصة

منصة صدقة مبنية على أحدث التقنيات مع التركيز على:
- ✅ **الأمان**: حماية شاملة ضد الهجمات
- ✅ **الأداء**: تحميل سريع وتجربة سلسة
- ✅ **القابلية للتوسع**: جاهزة للنمو
- ✅ **تجربة المستخدم**: واجهة بسيطة وجميلة
- ✅ **الصيانة**: كود نظيف وموثق

**Built with ❤️ for sadaqa jariyah**
