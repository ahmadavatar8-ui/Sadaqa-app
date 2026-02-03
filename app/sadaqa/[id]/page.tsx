import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import MemorialContent from './MemorialContent';

interface PageProps {
    params: {
        id: string;
    };
}

async function getMemorial(id: string) {
    try {
        const memorial = await prisma.memorial.findUnique({
            where: { id },
            include: { counters: true },
        });
        return memorial;
    } catch (error) {
        console.error('Error fetching memorial:', error);
        return null;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const memorial = await getMemorial(params.id);

    if (!memorial) {
        return {
            title: 'صفحة غير موجودة',
        };
    }

    return {
        title: `صفحة صدقة جارية - ${memorial.name}`,
        description: `ادعو واقرأ القرآن واذكر الله لروح المتوفي/ة ${memorial.name}`,
        openGraph: {
            title: `${memorial.name} - صدقة جارية`,
            description: 'اللهم اغفر له وارحمه - صدقة جارية رقمية لا تنقطع',
            images: [memorial.imageUrl],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${memorial.name} - صدقة جارية`,
            description: 'اللهم اغفر له وارحمه',
            images: [memorial.imageUrl],
        },
    };
}

export default async function MemorialPage({ params }: PageProps) {
    const memorial = await getMemorial(params.id);

    if (!memorial) {
        notFound();
    }

    return <MemorialContent memorial={memorial} />;
}
