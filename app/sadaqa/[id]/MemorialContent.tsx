'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getDuaText, QURAN_SURAHS, AZKAR } from '@/lib/dua';

interface Memorial {
    id: string;
    name: string;
    gender: 'MALE' | 'FEMALE';
    imageUrl: string;
    counters: {
        subhanAllah: number;
        alhamdulillah: number;
        allahuAkbar: number;
        laIlahaIllallah: number;
    } | null;
}

export default function MemorialContent({ memorial }: { memorial: Memorial }) {
    // Per-session counters: Always start from 0 for each visitor
    const [counters, setCounters] = useState({
        subhanAllah: 0,
        alhamdulillah: 0,
        allahuAkbar: 0,
        laIlahaIllallah: 0,
    });
    const [updating, setUpdating] = useState<string | null>(null);

    const duaTexts = getDuaText(memorial.gender);

    const handleDhikrClick = async (dhikrType: string) => {
        if (updating) return;

        setUpdating(dhikrType);

        // Update counter locally only (no database update)
        setCounters((prev) => ({
            ...prev,
            [dhikrType]: (prev as any)[dhikrType] + 1,
        }));

        // Haptic feedback (mobile only)
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }

        // Calm delay for UX
        setTimeout(() => {
            setUpdating(null);
        }, 400);
    };

    return (
        <main className="min-h-screen py-20 px-4 relative overflow-hidden">
            {/* Subtle ambient background */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <motion.div
                    className="absolute top-10 right-10 w-80 h-80 bg-emerald-200/15 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-10 w-72 h-72 bg-gold-200/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1.5,
                    }}
                />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Hero Section - Luxury Heritage */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-20"
                >
                    {/* Luxury Circular Image Frame */}
                    <div className="relative w-56 h-56 mx-auto mb-10 group">
                        {/* Soft golden halo glow */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400/20 via-gold-500/15 to-gold-600/10 opacity-60 blur-md group-hover:opacity-80 transition-luxury" />

                        {/* Thin gold ring */}
                        <div className="relative w-full h-full p-0.5">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-gold-500/30 to-gold-600/20 p-1">
                                {/* White inner border */}
                                <div className="w-full h-full rounded-full bg-white p-1 shadow-gold">
                                    <div className="w-full h-full rounded-full overflow-hidden">
                                        <Image
                                            src={memorial.imageUrl}
                                            alt={memorial.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            priority
                                            style={{ borderRadius: '50%' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Elegant Name */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="font-amiri text-6xl md:text-7xl font-bold text-charcoal-800 mb-5 leading-relaxed"
                    >
                        {memorial.name}
                    </motion.h1>

                    {/* Golden Divider */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '10rem' }}
                        transition={{ delay: 0.7, duration: 1 }}
                        className="h-0.5 mx-auto mb-6 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-emerald-600 text-xl font-cairo font-semibold"
                    >
                        رحمه الله رحمة واسعة وأسكنه فسيح جناته
                    </motion.p>
                </motion.div>

                {/* Dua Section - Luxury Card */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass p-12 md:p-16 rounded-3xl shadow-emerald mb-12 border border-gold-500/5"
                >
                    <h2 className="font-cairo text-4xl md:text-5xl font-bold text-emerald-600 mb-12 text-center">
                        الدعاء للميت
                    </h2>
                    <div className="space-y-10">
                        {duaTexts.map((dua, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + index * 0.2 }}
                                className="text-2xl md:text-3xl leading-loose text-charcoal-700 text-center font-cairo"
                            >
                                {dua}
                            </motion.p>
                        ))}
                    </div>
                </motion.div>

                {/* Quran Surahs - Elegant Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-12 mb-12"
                >
                    {Object.values(QURAN_SURAHS).map((surah, surahIndex) => (
                        <motion.div
                            key={surahIndex}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 + surahIndex * 0.25 }}
                            className="glass p-12 md:p-16 rounded-3xl shadow-emerald border border-emerald-500/5"
                        >
                            <div className="text-center mb-10">
                                <h3 className="font-amiri text-4xl md:text-5xl font-bold text-emerald-600 mb-5">
                                    {surah.name}
                                </h3>
                                <div className="h-0.5 w-20 mx-auto bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
                            </div>
                            <div className="space-y-8">
                                {surah.verses.map((verse, verseIndex) => (
                                    <p
                                        key={verseIndex}
                                        className="text-3xl md:text-4xl leading-loose text-charcoal-800 text-center font-amiri"
                                    >
                                        {verse}{' '}
                                        {verseIndex > 0 && (
                                            <span className="inline-block mx-3 text-gold-600 text-2xl">
                                                ﴿{verseIndex}﴾
                                            </span>
                                        )}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Azkar Counter - Luxury Interactive Section */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="glass p-12 md:p-16 rounded-3xl shadow-gold border border-gold-500/8"
                >
                    <h2 className="font-cairo text-4xl md:text-5xl font-bold text-emerald-600 mb-4 text-center">
                        اذكر الله واهدي الثواب للمتوفي
                    </h2>
                    <p className="text-charcoal-500 text-center mb-12 text-xl font-cairo">
                        كل ذكر تذكره يُضاف إلى الثواب المستمر
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {AZKAR.map((dhikr, index) => (
                            <motion.button
                                key={dhikr.id}
                                onClick={() => handleDhikrClick(dhikr.key)}
                                disabled={updating === dhikr.key}
                                whileHover={{ scale: 1.02, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.6 + index * 0.15 }}
                                className={`relative overflow-hidden p-10 rounded-2xl font-semibold text-xl transition-luxury ${updating === dhikr.key
                                        ? 'bg-charcoal-200 cursor-wait opacity-60'
                                        : 'bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white shadow-emerald hover:shadow-gold'
                                    }`}
                            >
                                {/* Soft pulse on click */}
                                {updating === dhikr.key && (
                                    <span className="absolute inset-0 bg-white opacity-15 animate-pulse" />
                                )}

                                <div className="flex flex-col items-center gap-5 relative z-10">
                                    <span className="text-3xl font-amiri leading-relaxed">{dhikr.text}</span>
                                    <div className="flex items-center gap-2 text-lg">
                                        <span className="bg-white/95 backdrop-blur-sm px-8 py-3 rounded-full font-cairo border border-white/30 text-emerald-700 font-bold shadow-sm">
                                            {(counters as any)[dhikr.key].toLocaleString('ar-SA')}
                                        </span>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <div className="inline-block px-10 py-4 bg-gradient-to-r from-gold-500/10 to-gold-600/8 backdrop-blur-sm rounded-full border border-gold-500/20">
                            <p className="text-emerald-700 font-semibold font-cairo text-xl">
                                مجموع الأذكار: {' '}
                                <span className="text-gold-600 font-bold text-2xl">
                                    {Object.values(counters).reduce((a, b) => a + b, 0).toLocaleString('ar-SA')}
                                </span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Share Button - Luxury Design */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="mt-16 text-center"
                >
                    <p className="text-charcoal-500 mb-8 text-xl font-cairo">
                        شارك هذه الصفحة ليصل الثواب لروح المتوفي
                    </p>
                    <motion.button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: `صفحة صدقة جارية - ${memorial.name}`,
                                    text: 'ادعو وأذكر الله لروح المتوفي',
                                    url: window.location.href,
                                });
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert('تم نسخ الرابط!');
                            }
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-12 py-5 bg-gradient-to-br from-gold-500 via-gold-600 to-gold-700 hover:from-gold-600 hover:to-gold-800 text-white rounded-2xl transition-luxury font-bold text-xl shadow-gold hover:shadow-2xl font-cairo"
                    >
                        <span className="flex items-center gap-3 justify-center">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            مشاركة الصفحة
                        </span>
                    </motion.button>
                </motion.div>

                {/* Footer Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-20 text-center"
                >
                    <p className="font-amiri text-emerald-600/60 text-2xl md:text-3xl">
                        إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
