'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="font-amiri text-9xl font-bold gradient-text mb-4">404</h1>
                <h2 className="text-3xl font-bold text-spiritual-800 mb-4">
                    الصفحة غير موجودة
                </h2>
                <p className="text-spiritual-600 mb-8">
                    عذراً، الصفحة التي تبحث عنها غير موجودة
                </p>
                <Link href="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-spiritual-600 to-spiritual-700 text-white rounded-xl font-bold shadow-spiritual"
                    >
                        العودة للصفحة الرئيسية
                    </motion.button>
                </Link>
            </motion.div>
        </main>
    );
}
