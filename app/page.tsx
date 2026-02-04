'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <main className="min-h-screen flex flex-col">
                {/* Hero Section */}
                <section className="flex-1 flex flex-col items-center justify-center px-6 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Text Logo with Tashkeel - صَدَقَة */}
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-10"
                        >
                            <h1 className="font-amiri text-8xl md:text-9xl font-bold text-primary-500 mb-6 leading-relaxed">
                                صَدَقَة
                            </h1>
                            {/* Gold Accent Line */}
                            <div className="w-32 h-1.5 bg-accent-500 mx-auto rounded-full" />
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-2xl md:text-3xl text-ink-600 mb-6 font-cairo font-semibold"
                        >
                            منصة الصدقة الجارية الرقمية
                        </motion.p>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="text-lg md:text-xl text-ink-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                        >
                            أنشئ صفحة خاصة لذكرى من تحب، تحتوي على أدعية وآيات قرآنية وأذكار.
                            <br />
                            شاركها مع الأحبة ليكون لك أجر كل من يدعو ويذكر الله.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            {/* Primary Button */}
                            <Link href="/create">
                                <button className="btn-primary">
                                    أنشئ صفحة صدقة
                                </button>
                            </Link>

                            {/* Secondary Button - Opens Modal */}
                            <button
                                onClick={() => setShowModal(true)}
                                className="btn-secondary"
                            >
                                تعرّف على المزيد
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-6 bg-white/50">
                    <div className="max-w-6xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-center text-ink-900 mb-4 font-cairo"
                        >
                            لماذا صَدَقَة؟
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
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-500/10 flex items-center justify-center">
                                        <span className="text-3xl">{feature.icon}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-primary-500 mb-4 font-cairo">
                                        {feature.title}
                                    </h3>
                                    <p className="text-ink-400 text-lg leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer Quote */}
                <footer className="py-12 text-center bg-surface-50">
                    <p className="font-amiri text-2xl text-primary-500/60">
                        إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                    </p>
                </footer>
            </main>

            {/* "تعرف على المزيد" Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-overlay"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-ink-200/20 hover:bg-ink-200/40 flex items-center justify-center transition-colors"
                            >
                                <svg className="w-6 h-6 text-ink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Modal Content */}
                            <div className="text-center">
                                <h3 className="font-amiri text-4xl font-bold text-primary-500 mb-6">
                                    عن هذا العمل
                                </h3>
                                <div className="divider-gold mb-8" />

                                <div className="space-y-6 text-ink-600 text-lg leading-loose font-cairo text-right">
                                    <p>
                                        هذا العمل صدقة جارية أُنشئت بنية خالصة لوجه الله تعالى.
                                    </p>
                                    <p>
                                        لا يُراد منها شهرة ولا ذكر، وإنما رجاء القبول والأجر.
                                    </p>
                                    <p>
                                        أسأل الله أن يجعل هذا العمل في ميزان حسناتي،
                                        وأن يغفر لي ولوالديّ، ويرحمهما كما ربياني صغيرًا،
                                        وأن يرزقنا جميعًا الإخلاص في القول والعمل.
                                    </p>
                                </div>

                                {/* Quran Verse */}
                                <div className="mt-10 p-6 bg-primary-500/5 rounded-card border border-primary-500/10">
                                    <p className="font-amiri text-2xl text-primary-500 leading-loose mb-3">
                                        ﴿ رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ ﴾
                                    </p>
                                    <p className="text-accent-600 font-cairo text-lg">
                                        — سورة إبراهيم، الآية ٤١
                                    </p>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="btn-primary mt-8"
                                >
                                    أغلق
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

const features = [
    {
        icon: '📿',
        title: 'أذكار تفاعلية',
        description: 'عدادات للأذكار تبدأ من الصفر لكل زائر، مع تجربة شخصية هادئة.',
    },
    {
        icon: '📖',
        title: 'قرآن وأدعية',
        description: 'سور قرآنية كاملة وأدعية مخصصة حسب جنس المتوفي.',
    },
    {
        icon: '🔗',
        title: 'رابط قابل للمشاركة',
        description: 'رابط فريد يمكن مشاركته عبر جميع وسائل التواصل.',
    },
];
