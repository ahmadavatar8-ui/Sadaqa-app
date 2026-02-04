'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
            {/* Subtle ambient background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 right-20 w-96 h-96 bg-emerald-200/10 rounded-full opacity-20 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-20 w-96 h-96 bg-gold-200/10 rounded-full opacity-15 blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 2,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Luxury Heritage Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="mb-20"
                >
                    {/* Logo with soft circular frame */}
                    <motion.div
                        className="relative inline-block"
                        animate={{
                            y: [0, -6, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <motion.div
                            animate={{
                                filter: [
                                    'drop-shadow(0 0 15px rgba(199, 167, 74, 0.15))',
                                    'drop-shadow(0 0 25px rgba(199, 167, 74, 0.25))',
                                    'drop-shadow(0 0 15px rgba(199, 167, 74, 0.15))',
                                ],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <Image
                                src="/sadaqa-logo.png"
                                alt="صدقة - Sadaqa Jariyah"
                                width={400}
                                height={400}
                                priority
                                className="w-72 h-72 md:w-96 md:h-96 object-contain mx-auto"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Elegant golden divider */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '8rem' }}
                        transition={{ delay: 1, duration: 1.2 }}
                        className="h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto rounded-full opacity-40"
                    />
                </motion.div>

                {/* Hero Text - Luxury Heritage */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-charcoal-800 mb-6 leading-relaxed font-amiri">
                        صدقة جارية رقمية
                        <br />
                        <span className="text-emerald-600 text-4xl md:text-5xl">
                            تبقى إرثاً لا ينقطع
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-charcoal-500 max-w-2xl mx-auto leading-relaxed font-cairo">
                        أنشئ صفحة خاصة لذكرى من تحب، تحتوي على دعاء وقرآن وأذكار
                        <br />
                        شاركها مع من تحب ليكون لك أجر كل من يقرأ ويذكر الله
                    </p>
                </motion.div>

                {/* Luxury CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    {/* Primary Button - Elegant Emerald */}
                    <Link href="/create">
                        <motion.button
                            className="group relative px-12 py-5 bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-600 text-white text-xl font-semibold rounded-2xl overflow-hidden shadow-emerald transition-luxury"
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Subtle inner glow on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700 opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.3 }}
                            />
                            <span className="relative z-10 flex items-center gap-3 font-cairo">
                                أنشئ صفحة صدقة
                                <svg
                                    className="w-6 h-6 transition-transform group-hover:-translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </span>
                        </motion.button>
                    </Link>

                    {/* Secondary Button - Elegant Gold Border */}
                    <motion.button
                        className="px-12 py-5 bg-transparent border-2 border-gold-500/40 hover:border-gold-500/60 text-charcoal-700 text-xl font-semibold rounded-2xl transition-luxury hover:bg-gold-500/5 font-cairo"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        تعرّف على المنصة
                    </motion.button>
                </motion.div>

                {/* Luxury Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4 + index * 0.2 }}
                            className="glass p-10 rounded-3xl shadow-emerald transition-luxury hover:shadow-gold border border-gold-500/5"
                            whileHover={{ y: -6, scale: 1.02 }}
                        >
                            <div className="text-5xl mb-6">{feature.icon}</div>
                            <h3 className="text-2xl font-bold text-emerald-700 mb-4 font-cairo">
                                {feature.title}
                            </h3>
                            <p className="text-charcoal-500 text-lg leading-relaxed font-cairo">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Footer - Quranic Quote */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 2 }}
                className="absolute bottom-10 text-center"
            >
                <p className="font-amiri text-emerald-600/60 text-2xl md:text-3xl">
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
        description: 'عدادات للأذكار تبدأ من الصفر لكل زائر، مع تجربة شخصية هادئة',
    },
    {
        icon: '📖',
        title: 'قرآن وأدعية',
        description: 'سور قرآنية كاملة وأدعية مخصصة للمتوفي بتصميم أنيق',
    },
    {
        icon: '🔗',
        title: 'رابط قابل للمشاركة',
        description: 'رابط فريد يمكن مشاركته عبر جميع وسائل التواصل',
    },
];
