'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
            {/* Elegant animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 right-20 w-72 h-72 bg-emerald-200/30 rounded-full opacity-20 blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-20 w-96 h-96 bg-gold-200/25 rounded-full opacity-20 blur-3xl"
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.2, 0.35, 0.2],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1.5,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Premium Logo with Glow */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-16"
                >
                    <motion.h1
                        className="font-amiri text-8xl md:text-9xl font-bold gradient-text mb-6 animate-float drop-shadow-2xl"
                        animate={{
                            textShadow: [
                                '0 0 20px rgba(200, 169, 81, 0.3)',
                                '0 0 40px rgba(200, 169, 81, 0.5)',
                                '0 0 20px rgba(200, 169, 81, 0.3)',
                            ],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        صدقة
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '12rem' }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto rounded-full shadow-gold"
                    />
                </motion.div>

                {/* Hero Text - Premium */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-charcoal-800 mb-8 leading-relaxed font-cairo">
                        صدقة جارية رقمية
                        <br />
                        <span className="bg-gradient-to-r from-emerald-600 to-gold-500 bg-clip-text text-transparent">
                            تبقى أثرًا لا ينقطع
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-emerald-700/90 max-w-2xl mx-auto leading-relaxed font-cairo">
                        أنشئ صفحة خاصة لذكرى من تحب، تحتوي على دعاء وقرآن وأذكار
                        <br />
                        شاركها مع من تحب ليكون لك أجر كل من يقرأ ويذكر الله
                    </p>
                </motion.div>

                {/* Premium CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <Link href="/create">
                        <motion.button
                            className="group relative px-14 py-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-pearl-50 text-2xl font-bold rounded-2xl overflow-hidden shadow-emerald transition-smooth"
                            whileHover={{ scale: 1.08, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            animate={{
                                boxShadow: [
                                    '0 10px 40px rgba(15, 61, 46, 0.3)',
                                    '0 15px 60px rgba(15, 61, 46, 0.5)',
                                    '0 10px 40px rgba(15, 61, 46, 0.3)',
                                ],
                            }}
                            transition={{
                                boxShadow: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                },
                            }}
                        >
                            {/* Animated gradient overlay on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-700 to-gold-600 opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.4 }}
                            />
                            <span className="relative z-10 flex items-center gap-3 font-cairo">
                                ابدأ الآن
                                <svg
                                    className="w-7 h-7 transition-transform group-hover:-translate-x-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </span>
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Premium Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + index * 0.15 }}
                            className="glass p-8 rounded-3xl shadow-emerald transition-smooth hover:shadow-gold border-2 border-emerald-100/30 hover:border-gold-200/50"
                            whileHover={{ y: -8, scale: 1.03 }}
                        >
                            <div className="text-5xl mb-5">{feature.icon}</div>
                            <h3 className="text-2xl font-bold text-emerald-700 mb-3 font-cairo">
                                {feature.title}
                            </h3>
                            <p className="text-emerald-600/80 text-lg leading-relaxed font-cairo">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Premium Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-8 text-center"
            >
                <p className="font-amiri text-emerald-600/70 text-xl md:text-2xl">
                    إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                </p>
            </motion.footer>
        </main>
    );
}

const features = [
    {
        icon: '📿',
        title: 'أذكار تفاعلية',
        description: 'عدادات للأذكار تُحفظ وتُحدث تلقائياً مع كل زيارة',
    },
    {
        icon: '📖',
        title: 'قرآن وأدعية',
        description: 'سور قرآنية كاملة وأدعية مخصصة للمتوفي',
    },
    {
        icon: '🔗',
        title: 'رابط قابل للمشاركة',
        description: 'رابط فريد يمكن مشاركته عبر جميع وسائل التواصل',
    },
];
