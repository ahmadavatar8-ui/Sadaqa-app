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
        const trimmed = value.trim();
        if (!trimmed) return 'الاسم مطلوب';
        const words = trimmed.split(/\s+/);
        if (words.length > 4) return 'الرجاء إدخال 1 إلى 4 أسماء فقط';
        if (!/^[\u0600-\u06FF\s]+$/.test(trimmed)) {
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

        // Validate required fields only (gender + name)
        const nameError = validateName(name);
        const genderError = !gender ? 'يرجى اختيار الجنس' : undefined;

        if (nameError || genderError) {
            setErrors({ name: nameError, gender: genderError });
            return;
        }

        // Image is OPTIONAL - form can submit without it
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', name.trim());
            formData.append('gender', gender!);

            // Only append image if provided
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
                    {/* ========== GENDER SELECTION (REQUIRED) ========== */}
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
                            <p className="mt-3 text-red-500 text-sm font-medium">{errors.gender}</p>
                        )}
                    </div>

                    {/* ========== NAME INPUT (REQUIRED) ========== */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-bold text-ink-900 mb-2">
                            اسم المتوفي <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="أدخل اسم المتوفى (يمكن اسم واحد أو حتى أربعة أسماء)"
                            className={`input-field ${errors.name ? 'border-red-400 bg-red-50' : ''}`}
                            dir="rtl"
                        />
                        {errors.name && (
                            <p className="mt-2 text-red-500 text-sm font-medium">{errors.name}</p>
                        )}
                        <p className="mt-2 text-ink-400 text-sm">
                            يمكنك كتابة الاسم الكامل أو اسم واحد أو أي عدد يصل إلى أربعة أسماء
                        </p>
                    </div>

                    {/* ========== IMAGE UPLOAD (OPTIONAL) ========== */}
                    <div>
                        <label className="block text-lg font-bold text-ink-900 mb-2">
                            صورة المتوفي <span className="text-ink-400 font-normal text-base">(اختياري)</span>
                        </label>

                        <div className="flex flex-col items-center gap-6">
                            {/* Preview Area - Circular */}
                            <div className="relative w-48 h-48">
                                {/* Outer Glow */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(199, 167, 74, 0.2) 0%, transparent 70%)',
                                        transform: 'scale(1.1)',
                                    }}
                                />

                                {/* Gold Ring */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-400 to-accent-500 p-1">
                                    <div className="w-full h-full rounded-full bg-white p-1">
                                        <div className="w-full h-full rounded-full overflow-hidden">
                                            {imagePreview ? (
                                                <Image
                                                    src={imagePreview}
                                                    alt="معاينة"
                                                    fill
                                                    className="object-cover rounded-full"
                                                    style={{ borderRadius: '50%' }}
                                                />
                                            ) : (
                                                /* Default Avatar Preview */
                                                <div
                                                    className="w-full h-full rounded-full flex items-center justify-center"
                                                    style={{
                                                        background: 'linear-gradient(135deg, #DFF5EE 0%, #c8ebe0 100%)',
                                                    }}
                                                >
                                                    <span className="text-primary-500 font-amiri text-6xl font-bold">
                                                        {name.trim() ? getFirstLetter(name) : 'ص'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Upload/Remove Controls */}
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
                                    <div className="px-8 py-3 bg-surface-100 text-ink-600 rounded-btn hover:bg-surface-200 transition-all font-bold text-center border-2 border-dashed border-ink-200 hover:border-primary-400">
                                        اختر صورة (اختياري)
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

                        {/* UX Note - Image is Optional */}
                        <div className="mt-6 p-4 bg-primary-500/5 rounded-btn border border-primary-500/10">
                            <p className="text-ink-600 text-sm text-center leading-relaxed">
                                <span className="font-bold text-primary-500">ملاحظة:</span>{' '}
                                رفع الصورة اختياري. في حال عدم رفع صورة سيتم استخدام صورة رمزية افتراضية تحتوي على الحرف الأول من اسم المتوفي.
                            </p>
                        </div>
                    </div>

                    {/* ========== SUBMIT BUTTON ========== */}
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
