export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadImage } from '@/lib/cloudinary';
import { memorialSchema } from '@/lib/validation';
import { sanitizeName } from '@/lib/utils';
// Rate limiting map (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const limit = rateLimitMap.get(ip);

    if (!limit || now > limit.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 }); // 1 hour
        return true;
    }

    if (limit.count >= 5) {
        return false; // Max 5 memorials per hour
    }

    limit.count++;
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // Get IP for rate limiting
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'تم تجاوز الحد المسموح. يرجى المحاولة لاحقاً' },
                { status: 429 }
            );
        }

        // Parse form data
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const gender = formData.get('gender') as string;
        const imageFile = formData.get('image') as File;

        // Validate input
        const validationResult = memorialSchema.safeParse({
            name,
            gender,
        });

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.errors[0].message },
                { status: 400 }
            );
        }

        // Validate image
        if (!imageFile || !(imageFile instanceof File)) {
            return NextResponse.json(
                { error: 'يرجى اختيار صورة' },
                { status: 400 }
            );
        }

        // استبدل السطر القديم بالسطر ده:
        const sanitizedName = sanitizeName(name).trim();
        // Convert image to buffer
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const { url: imageUrl, publicId: imagePublicId } = await uploadImage(
            buffer,
            `memorial_${Date.now()}`
        );

        // Create memorial in database
        const memorial = await prisma.memorial.create({
            data: {
                name: sanitizedName,
                gender: gender as 'MALE' | 'FEMALE',
                imageUrl,
                imagePublicId,
                counters: {
                    create: {
                        subhanAllah: 0,
                        alhamdulillah: 0,
                        allahuAkbar: 0,
                        laIlahaIllallah: 0,
                    },
                },
            },
            include: {
                counters: true,
            },
        });

        return NextResponse.json(
            { id: memorial.id, message: 'تم إنشاء الصفحة بنجاح' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating memorial:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء إنشاء الصفحة' },
            { status: 500 }
        );
    }
}
