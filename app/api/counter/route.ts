import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { counterSchema } from '@/lib/validation';

// Rate limiting for counter updates (per memorial per user)
const counterRateLimitMap = new Map<string, number>();

function checkCounterRateLimit(key: string): boolean {
    const now = Date.now();
    const lastUpdate = counterRateLimitMap.get(key);

    // Allow max 1 update per 100ms (10 per second)
    if (lastUpdate && now - lastUpdate < 100) {
        return false;
    }

    counterRateLimitMap.set(key, now);

    // Clean up old entries
    if (counterRateLimitMap.size > 10000) {
        const oldestKey = Array.from(counterRateLimitMap.keys())[0];
        counterRateLimitMap.delete(oldestKey);
    }

    return true;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validationResult = counterSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.errors[0].message },
                { status: 400 }
            );
        }

        const { memorialId, dhikrType } = validationResult.data;

        // Get IP for rate limiting
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        const rateLimitKey = `${ip}_${memorialId}_${dhikrType}`;

        // Check rate limit
        if (!checkCounterRateLimit(rateLimitKey)) {
            return NextResponse.json(
                { error: 'يرجى الانتظار قليلاً قبل الذكر مرة أخرى' },
                { status: 429 }
            );
        }

        // Check if memorial exists
        const memorial = await prisma.memorial.findUnique({
            where: { id: memorialId },
            include: { counters: true },
        });

        if (!memorial) {
            return NextResponse.json(
                { error: 'الصفحة غير موجودة' },
                { status: 404 }
            );
        }

        // Create counter if doesn't exist
        if (!memorial.counters) {
            await prisma.counter.create({
                data: {
                    memorialId,
                    subhanAllah: 0,
                    alhamdulillah: 0,
                    allahuAkbar: 0,
                    laIlahaIllallah: 0,
                },
            });
        }

        // Update counter atomically
        const updatedCounter = await prisma.counter.update({
            where: { memorialId },
            data: {
                [dhikrType]: {
                    increment: 1,
                },
                lastUpdated: new Date(),
            },
        });

        return NextResponse.json({
            counters: {
                subhanAllah: updatedCounter.subhanAllah,
                alhamdulillah: updatedCounter.alhamdulillah,
                allahuAkbar: updatedCounter.allahuAkbar,
                laIlahaIllallah: updatedCounter.laIlahaIllallah,
            },
        });
    } catch (error) {
        console.error('Error updating counter:', error);
        return NextResponse.json(
            { error: 'حدث خطأ أثناء تحديث العداد' },
            { status: 500 }
        );
    }
}
