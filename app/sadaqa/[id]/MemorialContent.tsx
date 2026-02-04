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
            navigator.vibrate(50);
        }

        // Small delay for UX
        setTimeout(() => {
            setUpdating(null);
        }, 300);
    };

    return (
        <main className="min-h-screen py-16 px-4 relative overflow-hidden">
            {/* Background subtle pattern overlay */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <motion.div
                    className="absolute top-10 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-10 w-80 h-80 bg-gold-200/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header - Image and Name with elegant styling */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    {/* Circular Image with Premium Border */}
                    <div className="relative w-56 h-56 mx-auto mb-8 group">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 opacity-80 blur-sm group-hover:opacity-100 transition-smooth" />
                        <div className="relative w-full h-full p-1.5">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-gold">
                                <Image
                                    src={memorial.imageUrl}
                                    alt={memorial.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    priority
                                    style={{ borderRadius: '50%' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Name with typing animation effect */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="font-amiri text-5xl md:text-6xl font-bold text-charcoal-800 mb-4 leading-relaxed"
                    >
                        {memorial.name}
                    </motion.h1>

                    {/* Golden Divider */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '12rem' }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="h-0.5 mx-auto mb-6 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="text-emerald-700 text-lg font-cairo font-semibold"
                    >
                        رحمه الله وأسكنه فسيح جناته
                    </motion.p>
                </motion.div>

                {/* Dua Section - Premium Card Design */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass p-10 md:p-14 rounded-3xl shadow-emerald mb-10 border-2 border-gold-200/30"
                >
                    <h2 className="font-cairo text-3xl md:text-4xl font-bold text-emerald-600 mb-10 text-center">
                        الدعاء للميت
                    </h2>
                    <div className="space-y-8">
                        {duaTexts.map((dua, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.15 }}
                                className="text-xl md:text-2xl leading-loose text-charcoal-700 text-center font-cairo"
                            >
                                {dua}
                            </motion.p>
                        ))}
                    </div>
                </motion.div>

                {/* Quran Surahs - Elegant Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-10 mb-10"
                >
                    {Object.values(QURAN_SURAHS).map((surah, surahIndex) => (
                        <motion.div
                            key={surahIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + surahIndex * 0.2 }}
                            className="glass p-10 md:p-14 rounded-3xl shadow-emerald border-2 border-emerald-200/20"
                        >
                            <div className="text-center mb-8">
                                <h3 className="font-amiri text-3xl md:text-4xl font-bold text-emerald-600 mb-4">
                                    {surah.name}
                                </h3>
                                <div className="divider-gold w-24 mx-auto" />
                            </div>
                            <div className="space-y-6">
                                {surah.verses.map((verse, verseIndex) => (
                                    <p
                                        key={verseIndex}
                                        className="text-2xl md:text-3xl leading-loose text-charcoal-800 text-center font-amiri"
                                    >
                                        {verse}{' '}
                                        {verseIndex > 0 && (
                                            <span className="inline-block mx-3 text-gold-600 text-xl">
                                                ﴿{verseIndex}﴾
                                            </span>
                                        )}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Azkar Counter - Premium Interactive Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="glass p-10 md:p-14 rounded-3xl shadow-gold border-2 border-gold-200/30"
                >
                    <h2 className="font-cairo text-3xl md:text-4xl font-bold text-emerald-600 mb-3 text-center">
                        اذكر الله واهدي الثواب للمتوفي
                    </h2>
                    <p className="text-emerald-600/80 text-center mb-10 text-lg font-cairo">
                        كل ذكر تذكره يُضاف إلى الثواب المستمر
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {AZKAR.map((dhikr, index) => (
                            <motion.button
                                key={dhikr.id}
                                onClick={() => handleDhikrClick(dhikr.key)}
                                disabled={updating === dhikr.key}
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.97 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 + index * 0.1 }}
                                className={`relative overflow-hidden p-8 rounded-2xl font-bold text-xl transition-smooth ${updating === dhikr.key
                                    ? 'bg-gray-400 cursor-wait opacity-70'
                                    : 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white shadow-emerald hover:shadow-2xl'
                                    }`}
                            >
                                {/* Shimmer effect */}
                                {updating === dhikr.key && (
                                    <span className="absolute inset-0 bg-white opacity-20 animate-pulse" />
                                )}

                                <div className="flex flex-col items-center gap-4 relative z-10">
                                    <span className="text-2xl font-amiri leading-relaxed">{dhikr.text}</span>
                                    <div className="flex items-center gap-2 text-lg">
                                        <span className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full font-cairo border border-white/50 text-emerald-700 font-bold">
                                            {(counters as any)[dhikr.key].toLocaleString('ar-SA')}
                                        </span>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <div className="inline-block px-8 py-3 bg-gradient-to-r from-gold-500/20 to-gold-600/20 backdrop-blur-sm rounded-full border-2 border-gold-500/40">
                            <p className="text-emerald-700 font-semibold font-cairo text-lg">
                                مجموع الأذكار: {' '}
                                <span className="text-gold-600 font-bold text-xl">
                                    {Object.values(counters).reduce((a, b) => a + b, 0).toLocaleString('ar-SA')}
                                </span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Share Button - Premium Design */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-12 text-center"
                >
                    <p className="text-emerald-600 mb-6 text-lg font-cairo">
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
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 bg-gradient-to-br from-gold-500 via-gold-600 to-gold-700 text-white rounded-2xl hover:from-gold-600 hover:via-gold-700 hover:to-gold-800 transition-smooth font-bold text-lg shadow-gold hover:shadow-2xl font-cairo"
                    >
                        <span className="flex items-center gap-2 justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    transition={{ delay: 1.4 }}
                    className="mt-16 text-center"
                >
                    <p className="font-amiri text-emerald-600/70 text-xl md:text-2xl">
                        إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
