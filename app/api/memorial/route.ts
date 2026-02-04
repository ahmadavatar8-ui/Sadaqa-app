export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadImage } from '@/lib/cloudinary';
import { memorialSchema } from '@/lib/validation';
import { sanitizeName } from '@/lib/utils';
import { DEFAULT_AVATAR_URL, DEFAULT_AVATAR_PUBLIC_ID } from '@/lib/constants';

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
        const imageFile = formData.get('image') as File | null;

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

        const sanitizedName = sanitizeName(name).trim();

        // Initialize with DEFAULT AVATAR (no null values!)
        let imageUrl: string = DEFAULT_AVATAR_URL;
        let imagePublicId: string = DEFAULT_AVATAR_PUBLIC_ID;

        // If user uploaded an image, upload it to Cloudinary
        if (imageFile && imageFile instanceof File && imageFile.size > 0) {
            try {
                // Convert image to buffer
                const bytes = await imageFile.arrayBuffer();
                const buffer = Buffer.from(bytes);

                // Upload to Cloudinary
                const uploadResult = await uploadImage(buffer, `memorial_${Date.now()}`);
                imageUrl = uploadResult.url;
                imagePublicId = uploadResult.publicId;
            } catch (uploadError) {
                console.error('Image upload failed, using default avatar:', uploadError);
                // Keep default avatar values if upload fails
            }
        }

        // Create memorial in database - ALWAYS with a valid imageUrl
        const memorial = await prisma.memorial.create({
            data: {
                name: sanitizedName,
                gender: gender as 'MALE' | 'FEMALE',
                imageUrl,         // Always has a value (user image or default)
                imagePublicId,    // Always has a value
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
