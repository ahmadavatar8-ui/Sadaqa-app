import fs from 'fs';
import path from 'path';

/**
 * حل مؤقت: حفظ الصور محلياً بدلاً من Cloudinary
 * استخدم هذا فقط للتطوير المحلي
 * للإنتاج، يجب استخدام Cloudinary
 */

export async function uploadImage(
    file: Buffer,
    filename: string
): Promise<{ url: string; publicId: string }> {
    try {
        // مسار مجلد الصور
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

        // إنشاء المجلد إذا لم يكن موجوداً
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
            console.log('✅ تم إنشاء مجلد uploads');
        }

        // اسم ملف فريد مع timestamp
        const uniqueFilename = `${filename}_${Date.now()}.jpg`;
        const filePath = path.join(uploadsDir, uniqueFilename);

        // حفظ الملف
        fs.writeFileSync(filePath, file);
        console.log(`✅ تم حفظ الصورة: /uploads/${uniqueFilename}`);

        return {
            url: `/uploads/${uniqueFilename}`,
            publicId: uniqueFilename
        };
    } catch (error) {
        console.error('❌ خطأ في حفظ الصورة:', error);
        throw new Error('فشل رفع الصورة');
    }
}

// لا نحتاج Cloudinary في الوضع المحلي
export default null;
