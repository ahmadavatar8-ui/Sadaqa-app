import type { Metadata } from 'next';
import { Cairo, Amiri } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
    weight: ['400', '600', '700'],
    subsets: ['arabic'],
    variable: '--font-cairo',
    display: 'swap',
});

const amiri = Amiri({
    weight: ['400', '700'],
    subsets: ['arabic'],
    variable: '--font-amiri',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'صدقة - منصة الصدقة الجارية الرقمية',
    description: 'أنشئ صفحة صدقة جارية رقمية للمتوفي - صدقة لا تنقطع',
    keywords: ['صدقة', 'صدقة جارية', 'دعاء للميت', 'قرآن', 'أذكار'],
    authors: [{ name: 'Sadaqa Platform' }],
    openGraph: {
        title: 'صدقة - منصة الصدقة الجارية الرقمية',
        description: 'أنشئ صفحة صدقة جارية رقمية للمتوفي',
        type: 'website',
        locale: 'ar_SA',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'صدقة - منصة الصدقة الجارية الرقمية',
        description: 'أنشئ صفحة صدقة جارية رقمية للمتوفي',
    },
    viewport: 'width=device-width, initial-scale=1',
    themeColor: '#0F6B55',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable}`}>
            <body className="font-cairo antialiased min-h-screen">
                {children}
            </body>
        </html>
    );
}
