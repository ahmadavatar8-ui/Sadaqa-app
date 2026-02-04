'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getDuaText, QURAN_SURAHS, AZKAR } from '@/lib/dua';

interface Memorial {
    id: string;
    name: string;
    gender: 'MALE' | 'FEMALE';
    imageUrl: string | null;
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

    // Dynamic gender-sensitive duas
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

    // Get first letter for default avatar
    const getFirstLetter = (fullName: string): string => {
        const firstName = fullName.trim().split(/\s+/)[0];
        return firstName ? firstName.charAt(0) : 'ص';
    };

    return (
        <main className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header - Photo & Name */}
                <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    {/* Photo or Default Avatar with Gold Ring */}
                    <div className="relative w-52 h-52 mx-auto mb-8">
                        {memorial.imageUrl ? (
                            /* Uploaded Photo */
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-accent-500 shadow-glow-gold">
                                <Image
                                    src={memorial.imageUrl}
                                    alt={memorial.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        ) : (
                            /* Default Avatar - First Letter */
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-100 to-primary-200 border-4 border-accent-500 shadow-glow-gold flex items-center justify-center">
                                <span className="text-primary-500 font-amiri text-7xl font-bold">
                                    {getFirstLetter(memorial.name)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Name */}
                    <h1 className="font-amiri text-5xl md:text-6xl font-bold text-ink-900 mb-4">
                        {memorial.name}
                    </h1>
                    <div className="divider-gold mb-4" />
                    <p className="text-xl text-primary-500 font-cairo">
                        {memorial.gender === 'MALE'
                            ? 'رحمه الله رحمة واسعة وأسكنه فسيح جناته'
                            : 'رحمها الله رحمة واسعة وأسكنها فسيح جناته'
                        }
                    </p>
                </motion.section>

                {/* Dua Section - Gender Sensitive */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="card mb-8"
                >
                    <h2 className="text-3xl font-bold text-primary-500 mb-8 text-center font-cairo">
                        الدعاء {memorial.gender === 'MALE' ? 'للميت' : 'للميتة'}
                    </h2>
                    <div className="space-y-6">
                        {duaTexts.map((dua, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="text-xl md:text-2xl leading-loose text-ink-900 text-center font-cairo"
                            >
                                {dua}
                            </motion.p>
                        ))}
                    </div>
                </motion.section>

                {/* Quran Surahs */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-8 mb-8"
                >
                    {Object.values(QURAN_SURAHS).map((surah, surahIndex) => (
                        <div key={surahIndex} className="card">
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
                                            <span className="mx-2 text-accent-500">
                                                ﴿{verseIndex}﴾
                                            </span>
                                        )}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.section>

                {/* Tasbeeh Counter Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="card mb-8"
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
                            <button
                                key={dhikr.id}
                                onClick={() => handleDhikrClick(dhikr.key)}
                                disabled={updating === dhikr.key}
                                className={`p-6 rounded-card text-center transition-all duration-200 ${updating === dhikr.key
                                        ? 'bg-ink-200 cursor-wait scale-95'
                                        : 'bg-primary-500 hover:bg-primary-600 active:scale-95 shadow-btn'
                                    }`}
                            >
                                <span className="block text-xl md:text-2xl font-bold text-white font-amiri mb-3">
                                    {dhikr.text}
                                </span>
                                <span className="inline-block px-6 py-2 bg-white rounded-full text-primary-500 font-bold text-xl min-w-[80px]">
                                    {(counters as any)[dhikr.key]}
                                </span>
                            </button>
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

                {/* Share Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
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

                {/* Footer */}
                <footer className="mt-16 text-center">
                    <p className="font-amiri text-xl text-primary-500/60">
                        إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                    </p>
                </footer>
            </div>
        </main>
    );
}
