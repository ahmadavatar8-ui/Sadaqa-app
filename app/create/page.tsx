'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Gender = 'MALE' | 'FEMALE';

export default function CreatePage() {
    const router = useRouter();
    const [gender, setGender] = useState<Gender | null>(null);
    const [name, setName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ name?: string; gender?: string }>({});
    const [loading, setLoading] = useState(false);

    const validateName = (value: string): string | undefined => {
        if (!value.trim()) return 'الاسم مطلوب';
        const words = value.trim().split(/\s+/);
        if (words.length !== 4) return 'يجب إدخال اسم رباعي (4 كلمات)';
        if (!/^[\u0600-\u06FF\s]+$/.test(value)) {
            return 'يجب أن يحتوي الاسم على أحرف عربية فقط';
        }
        return undefined;
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        if (value.trim()) {
            setErrors((prev) => ({ ...prev, name: validateName(value) }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            alert('الصورة يجب أن تكون بصيغة JPG, PNG, أو WEBP');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('حجم الصورة يجب أن يكون أقل من 5MB');
            return;
        }

        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const getFirstLetter = (fullName: string): string => {
        const firstName = fullName.trim().split(/\s+/)[0];
        return firstName ? firstName.charAt(0) : 'ص';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nameError = validateName(name);
        const genderError = !gender ? 'يرجى اختيار الجنس' : undefined;

        if (nameError || genderError) {
            setErrors({ name: nameError, gender: genderError });
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', name.trim());
            formData.append('gender', gender!);
            if (image) {
                formData.append('image', image);
            }

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
                        إنشاء صفحة صَدَقَة جارية
                    </h1>
                    <p className="text-ink-400 text-lg">
                        أدخل بيانات المتوفي لإنشاء صفحة خاصة به
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="card space-y-8"
                >
                    {/* Gender Selection - REQUIRED */}
                    <div>
                        <label className="block text-lg font-bold text-ink-900 mb-4">
                            جنس المتوفي <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setGender('MALE');
                                    setErrors((prev) => ({ ...prev, gender: undefined }));
                                }}
                                className={`p-5 rounded-btn font-bold text-lg transition-all duration-300 ${gender === 'MALE'
                                        ? 'bg-primary-500 text-white shadow-btn'
                                        : 'bg-surface-100 text-ink-600 hover:bg-surface-200'
                                    }`}
                            >
                                ذكر
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setGender('FEMALE');
                                    setErrors((prev) => ({ ...prev, gender: undefined }));
                                }}
                                className={`p-5 rounded-btn font-bold text-lg transition-all duration-300 ${gender === 'FEMALE'
                                        ? 'bg-primary-500 text-white shadow-btn'
                                        : 'bg-surface-100 text-ink-600 hover:bg-surface-200'
                                    }`}
                            >
                                أنثى
                            </button>
                        </div>
                        {errors.gender && (
                            <p className="mt-2 text-red-500 text-sm">{errors.gender}</p>
                        )}
                    </div>

                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-bold text-ink-900 mb-2">
                            اسم المتوفي الرباعي <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="مثال: أحمد محمد علي حسن"
                            className={`input-field ${errors.name ? 'border-red-400 bg-red-50' : ''}`}
                            dir="rtl"
                        />
                        {errors.name && (
                            <p className="mt-2 text-red-500 text-sm">{errors.name}</p>
                        )}
                        <p className="mt-2 text-ink-400 text-sm">
                            يجب إدخال 4 كلمات (الاسم + اسم الأب + اسم الجد + اسم العائلة)
                        </p>
                    </div>

                    {/* Image Upload - OPTIONAL */}
                    <div>
                        <label className="block text-lg font-bold text-ink-900 mb-2">
                            صورة المتوفي <span className="text-ink-400 font-normal">(اختياري)</span>
                        </label>

                        <div className="flex flex-col items-center gap-6">
                            {/* Preview Area */}
                            <div className="w-48 h-48 relative">
                                {imagePreview ? (
                                    /* Uploaded Image with Gold Ring */
                                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-accent-500 shadow-glow-gold">
                                        <Image
                                            src={imagePreview}
                                            alt="معاينة"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    /* Default Avatar Placeholder */
                                    <div className="w-full h-full rounded-full bg-primary-100 border-4 border-primary-200 flex items-center justify-center">
                                        <span className="text-primary-500 font-amiri text-6xl font-bold">
                                            {name.trim() ? getFirstLetter(name) : 'ص'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Upload Controls */}
                            {imagePreview ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImage(null);
                                        setImagePreview(null);
                                    }}
                                    className="px-6 py-3 bg-red-500 text-white rounded-btn hover:bg-red-600 transition-all font-bold"
                                >
                                    إزالة الصورة
                                </button>
                            ) : (
                                <label className="cursor-pointer">
                                    <div className="px-6 py-3 bg-surface-100 text-ink-600 rounded-btn hover:bg-surface-200 transition-all font-bold text-center">
                                        اختر صورة
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        {/* UX Note */}
                        <p className="mt-4 text-ink-400 text-sm text-center bg-surface-100 p-4 rounded-btn">
                            رفع الصورة اختياري. في حال عدم رفع صورة سيتم استخدام صورة رمزية افتراضية تحتوي على الحرف الأول من اسم المتوفي.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 rounded-btn text-xl font-bold text-white transition-all duration-300 ${loading
                                ? 'bg-ink-300 cursor-not-allowed'
                                : 'bg-primary-500 hover:bg-primary-600 shadow-btn hover:shadow-btn-hover'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                جاري الإنشاء...
                            </span>
                        ) : (
                            'إنشاء صفحة الصَدَقَة'
                        )}
                    </button>
                </motion.form>
            </div>
        </main>
    );
}
