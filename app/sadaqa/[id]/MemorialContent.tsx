'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getDuaText, QURAN_SURAHS, AZKAR } from '@/lib/dua';

interface Memorial {
    id: string;
    name: string;
    gender: 'MALE' | 'FEMALE';
    imageUrl: string; // Always has a value (user-uploaded or default)
    counters: {
        subhanAllah: number;
        alhamdulillah: number;
        allahuAkbar: number;
        laIlahaIllallah: number;
    } | null;
}

export default function MemorialContent({ memorial }: { memorial: Memorial }) {
    // Per-session counters: Start from 0 for each visitor
    const [counters, setCounters] = useState({
        subhanAllah: 0,
        alhamdulillah: 0,
        allahuAkbar: 0,
        laIlahaIllallah: 0,
    });
    const [updating, setUpdating] = useState<string | null>(null);

    // Get fixed gender-specific duas
    const duaTexts = getDuaText(memorial.gender);

    const handleDhikrClick = (dhikrType: string) => {
        if (updating) return;
        setUpdating(dhikrType);

        setCounters((prev) => ({
            ...prev,
            [dhikrType]: (prev as any)[dhikrType] + 1,
        }));

        // Haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }

        setTimeout(() => setUpdating(null), 150);
    };

    const totalCount = Object.values(counters).reduce((a, b) => a + b, 0);

    return (
        <main className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* ============================================
                    HERO SECTION - Premium Circular Avatar
                ============================================ */}
                <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    {/* ===== PREMIUM CIRCULAR AVATAR ===== */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="relative w-60 h-60 mx-auto mb-10"
                    >
                        {/* === Layer 1: Outer Soft Glow === */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(199, 167, 74, 0.25) 0%, rgba(199, 167, 74, 0.1) 40%, transparent 70%)',
                                transform: 'scale(1.25)',
                                filter: 'blur(8px)',
                                animation: 'pulse 3s ease-in-out infinite',
                            }}
                        />

                        {/* === Layer 2: Gold Gradient Ring === */}
                        <div
                            className="absolute inset-0 rounded-full p-1"
                            style={{
                                background: 'linear-gradient(135deg, #C7A74A 0%, #E8D5A3 25%, #C7A74A 50%, #A88B3D 75%, #C7A74A 100%)',
                                boxShadow: '0 8px 32px rgba(199, 167, 74, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                            }}
                        >
                            {/* === Layer 3: White Inner Border === */}
                            <div className="w-full h-full rounded-full bg-white p-1.5 shadow-inner">
                                {/* === Layer 4: Image Container - PERFECT CIRCLE === */}
                                <div className="w-full h-full rounded-full overflow-hidden relative">
                                    {/* Always display the image (user-uploaded or default) */}
                                    <Image
                                        src={memorial.imageUrl}
                                        alt={memorial.name}
                                        fill
                                        sizes="240px"
                                        className="object-cover"
                                        priority
                                        style={{
                                            borderRadius: '50%',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ===== NAME ===== */}
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="font-amiri text-5xl md:text-6xl font-bold text-ink-900 mb-4"
                    >
                        {memorial.name}
                    </motion.h1>

                    {/* ===== GOLD DIVIDER ===== */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="divider-gold mb-4"
                    />

                    {/* ===== PRAYER FOR DECEASED ===== */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl text-primary-500 font-cairo font-semibold"
                    >
                        {memorial.gender === 'MALE'
                            ? 'رحمه الله رحمة واسعة وأسكنه فسيح جناته'
                            : 'رحمها الله رحمة واسعة وأسكنها فسيح جناته'
                        }
                    </motion.p>
                </motion.section>

                {/* ============================================
                    DUA SECTION - Full Content, NO SCROLL
                ============================================ */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="card mb-10"
                >
                    <h2 className="text-3xl font-bold text-primary-500 mb-8 text-center font-cairo">
                        {memorial.gender === 'MALE' ? 'الدعاء للميت' : 'الدعاء للميتة'}
                    </h2>
                    <div className="divider-gold mb-10" />

                    {/* Dua Content - FULLY VISIBLE, NO INTERNAL SCROLL */}
                    <div className="space-y-8">
                        {duaTexts.map((dua, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.08 }}
                                className="text-xl md:text-2xl leading-[2.2] text-ink-900 text-center font-cairo"
                            >
                                {dua}
                            </motion.p>
                        ))}
                    </div>
                </motion.section>

                {/* ============================================
                    QURAN SURAHS SECTION
                ============================================ */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-8 mb-10"
                >
                    {Object.values(QURAN_SURAHS).map((surah, surahIndex) => (
                        <motion.div
                            key={surahIndex}
                            className="card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + surahIndex * 0.1 }}
                        >
                            <h3 className="font-amiri text-3xl md:text-4xl font-bold text-primary-500 mb-6 text-center">
                                {surah.name}
                            </h3>
                            <div className="divider-gold mb-8" />
                            <div className="space-y-4">
                                {surah.verses.map((verse, verseIndex) => (
                                    <p
                                        key={verseIndex}
                                        className="text-2xl md:text-3xl leading-loose text-ink-900 text-center font-amiri"
                                    >
                                        {verse}
                                        {verseIndex > 0 && (
                                            <span className="mx-2 text-accent-500 text-xl">
                                                ﴿{verseIndex}﴾
                                            </span>
                                        )}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.section>

                {/* ============================================
                    TASBEEH COUNTER SECTION
                ============================================ */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="card mb-10"
                >
                    <h2 className="text-3xl font-bold text-primary-500 mb-4 text-center font-cairo">
                        اذكر الله واهدِ الثواب
                    </h2>
                    <p className="text-ink-400 text-center mb-8 text-lg">
                        كل ذكر تذكره يُضاف إلى ميزان حسناتك ويُهدى ثوابه {memorial.gender === 'MALE' ? 'للمتوفي' : 'للمتوفية'}
                    </p>

                    {/* Counter Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {AZKAR.map((dhikr) => (
                            <motion.button
                                key={dhikr.id}
                                onClick={() => handleDhikrClick(dhikr.key)}
                                disabled={updating === dhikr.key}
                                whileTap={{ scale: 0.95 }}
                                className={`p-6 rounded-card text-center transition-all duration-200 ${updating === dhikr.key
                                        ? 'bg-ink-200 cursor-wait'
                                        : 'bg-primary-500 hover:bg-primary-600 shadow-btn hover:shadow-btn-hover'
                                    }`}
                            >
                                <span className="block text-xl md:text-2xl font-bold text-white font-amiri mb-3">
                                    {dhikr.text}
                                </span>
                                <span className="inline-block px-6 py-2 bg-white rounded-full text-primary-500 font-bold text-xl min-w-[80px]">
                                    {(counters as any)[dhikr.key]}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Total Counter */}
                    <div className="text-center p-6 bg-accent-500/10 rounded-card border-2 border-accent-500/30">
                        <p className="text-ink-900 text-xl font-cairo">
                            مجموع الأذكار:{' '}
                            <span className="text-accent-600 font-bold text-3xl">
                                {totalCount}
                            </span>
                        </p>
                    </div>
                </motion.section>

                {/* ============================================
                    SHARE SECTION
                ============================================ */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-center"
                >
                    <p className="text-ink-400 mb-6 text-lg">
                        شارك هذه الصفحة ليصل الثواب لروح {memorial.gender === 'MALE' ? 'المتوفي' : 'المتوفية'}
                    </p>
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: `صفحة صَدَقَة جارية - ${memorial.name}`,
                                    text: `ادعُ وأذكر الله لروح ${memorial.name}`,
                                    url: window.location.href,
                                });
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert('تم نسخ الرابط!');
                            }
                        }}
                        className="btn-gold"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        مشاركة الصفحة
                    </button>
                </motion.section>

                {/* ============================================
                    FOOTER
                ============================================ */}
                <footer className="mt-16 text-center">
                    <p className="font-amiri text-xl text-primary-500/60">
                        إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                    </p>
                </footer>
            </div>
        </main>
    );
}
