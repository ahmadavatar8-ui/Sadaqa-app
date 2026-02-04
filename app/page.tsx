'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
    return (
        <main className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Text Logo - Clean & Sharp */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <h1 className="font-amiri text-8xl md:text-9xl font-bold text-primary-500 mb-4">
                            صدقة
                        </h1>
                        {/* Gold Accent Line */}
                        <div className="w-32 h-1 bg-accent-500 mx-auto rounded-full" />
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-2xl md:text-3xl text-text-muted mb-6 font-cairo"
                    >
                        منصة الصدقة الجارية الرقمية
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        أنشئ صفحة خاصة لذكرى من تحب، تحتوي على أدعية وآيات قرآنية وأذكار.
                        <br />
                        شاركها مع الأحبة ليكون لك أجر كل من يدعو ويذكر الله.
                    </motion.p>

                    {/* CTA Buttons - HIGHLY VISIBLE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        {/* Primary Button - Solid, Visible */}
                        <Link href="/create">
                            <button className="btn-primary min-w-[220px]">
                                أنشئ صفحة صدقة
                            </button>
                        </Link>

                        {/* Secondary Button */}
                        <button className="btn-secondary min-w-[220px]">
                            تعرّف على المزيد
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-center text-text-primary mb-4 font-cairo"
                    >
                        لماذا صدقة؟
                    </motion.h2>
                    <div className="divider-gold mb-16" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card text-center"
                            >
                                <div className="text-5xl mb-6">{feature.icon}</div>
                                <h3 className="text-2xl font-bold text-primary-500 mb-4 font-cairo">
                                    {feature.title}
                                </h3>
                                <p className="text-text-muted text-lg leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Quote */}
            <footer className="py-12 text-center">
                <p className="font-amiri text-2xl text-primary-500/60">
                    إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                </p>
            </footer>
        </main>
    );
}

const features = [
    {
        icon: '📿',
        title: 'أذكار تفاعلية',
        description: 'عدادات للأذكار تبدأ من الصفر لكل زائر، مع تجربة شخصية هادئة وممتعة.',
    },
    {
        icon: '📖',
        title: 'قرآن وأدعية',
        description: 'سور قرآنية كاملة وأدعية مخصصة للمتوفي بتصميم أنيق وواضح.',
    },
    {
        icon: '🔗',
        title: 'رابط قابل للمشاركة',
        description: 'رابط فريد يمكن مشاركته عبر جميع وسائل التواصل الاجتماعي.',
    },
];
