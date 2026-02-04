'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Gender = 'MALE' | 'FEMALE';

export default function CreatePage() {
    const router = useRouter();
    const [gender, setGender] = useState<Gender>('MALE');
    const [name, setName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ name?: string; image?: string }>({});
    const [loading, setLoading] = useState(false);

    const validateName = (value: string): string | undefined => {
        if (!value.trim()) return 'الاسم مطلوب';
        const words = value.trim().split(/\s+/);
        if (words.length !== 4) return 'يجب إدخال اسم رباعي (4 كلمات بالضبط)';
        if (!/^[\u0600-\u06FF\s]+$/.test(value)) {
            return 'يجب أن يحتوي الاسم على أحرف عربية فقط';
        }
        return undefined;
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        const error = validateName(value);
        setErrors((prev) => ({ ...prev, name: error }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            setErrors((prev) => ({
                ...prev,
                image: 'الصورة يجب أن تكون بصيغة JPG, PNG, أو WEBP',
            }));
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({
                ...prev,
                image: 'حجم الصورة يجب أن يكون أقل من 5MB',
            }));
            return;
        }

        setImage(file);
        setErrors((prev) => ({ ...prev, image: undefined }));

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nameError = validateName(name);
        if (nameError || !image) {
            setErrors({
                name: nameError,
                image: !image ? 'يرجى اختيار صورة' : undefined,
            });
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', name.trim());
            formData.append('gender', gender);
            formData.append('image', image);

            const response = await fetch('/api/memorial', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'حدث خطأ أثناء الإنشاء');
            }

            const data = await response.json();
            router.push(`/sadaqa/${data.id}`);
        } catch (error) {
            alert(error instanceof Error ? error.message : 'حدث خطأ غير متوقع');
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="font-amiri text-4xl md:text-5xl font-bold text-primary-500 mb-4">
                        إنشاء صفحة صدقة جارية
                    </h1>
                    <p className="text-text-muted text-lg">
                        أدخل بيانات المتوفي لإنشاء صفحة خاصة به
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="card space-y-8"
                >
                    {/* Gender Selection - Segmented Buttons */}
                    <div>
                        <label className="block text-lg font-bold text-text-primary mb-4">
                            جنس المتوفي <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setGender('MALE')}
                                className={`p-4 rounded-btn font-bold text-lg transition-all duration-300 ${gender === 'MALE'
                                        ? 'bg-primary-500 text-white shadow-btn'
                                        : 'bg-gray-100 text-text-primary hover:bg-gray-200'
                                    }`}
                            >
                                ذكر
                            </button>
                            <button
                                type="button"
                                onClick={() => setGender('FEMALE')}
                                className={`p-4 rounded-btn font-bold text-lg transition-all duration-300 ${gender === 'FEMALE'
                                        ? 'bg-primary-500 text-white shadow-btn'
                                        : 'bg-gray-100 text-text-primary hover:bg-gray-200'
                                    }`}
                            >
                                أنثى
                            </button>
                        </div>
                    </div>

                    {/* Name Input - Floating Label Style */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-bold text-text-primary mb-2">
                            اسم المتوفي الرباعي <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="مثال: أحمد محمد علي حسن"
                            className={`input-field ${errors.name ? 'border-red-400 bg-red-50' : ''
                                }`}
                            dir="rtl"
                        />
                        {errors.name && (
                            <p className="mt-2 text-red-600 text-sm font-medium">{errors.name}</p>
                        )}
                        <p className="mt-2 text-text-muted text-sm">
                            يجب إدخال 4 كلمات بالضبط (الاسم الأول + اسم الأب + اسم الجد + اسم العائلة)
                        </p>
                    </div>

                    {/* Image Upload - Elegant Card */}
                    <div>
                        <label className="block text-lg font-bold text-text-primary mb-2">
                            صورة المتوفي <span className="text-red-500">*</span>
                        </label>

                        {imagePreview ? (
                            <div className="text-center">
                                <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-accent-500 shadow-card">
                                    <Image
                                        src={imagePreview}
                                        alt="معاينة"
                                        width={192}
                                        height={192}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImage(null);
                                        setImagePreview(null);
                                    }}
                                    className="px-6 py-2 bg-red-500 text-white rounded-btn hover:bg-red-600 transition-all"
                                >
                                    تغيير الصورة
                                </button>
                            </div>
                        ) : (
                            <label className="block cursor-pointer">
                                <div className="w-full p-12 border-2 border-dashed border-gray-300 rounded-card hover:border-primary-500 hover:bg-primary-500/5 transition-all text-center">
                                    <svg
                                        className="mx-auto h-16 w-16 text-gray-400 mb-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <p className="text-primary-500 font-bold mb-2">
                                        اضغط لاختيار صورة
                                    </p>
                                    <p className="text-text-muted text-sm">
                                        JPG, PNG, أو WEBP (حد أقصى 5MB)
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}

                        {errors.image && (
                            <p className="mt-2 text-red-600 text-sm font-medium">{errors.image}</p>
                        )}
                    </div>

                    {/* Submit Button - Large & Visible */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 rounded-btn text-xl font-bold text-white transition-all duration-300 ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-primary-500 hover:bg-primary-600 shadow-btn hover:shadow-btn-hover'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <svg
                                    className="animate-spin h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                جاري الإنشاء...
                            </span>
                        ) : (
                            'إنشاء صفحة الصدقة'
                        )}
                    </button>
                </motion.form>
            </div>
        </main>
    );
}
