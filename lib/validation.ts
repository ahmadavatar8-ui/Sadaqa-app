import { z } from 'zod';

export const memorialSchema = z.object({
    name: z
        .string()
        .min(1, 'الاسم مطلوب')
        .refine(
            (name) => {
                const words = name.trim().split(/\s+/);
                return words.length === 4;
            },
            { message: 'يجب إدخال اسم رباعي (4 كلمات بالضبط)' }
        )
        .refine(
            (name) => /^[\u0600-\u06FF\s]+$/.test(name),
            { message: 'يجب أن يحتوي الاسم على أحرف عربية فقط' }
        ),
    gender: z.enum(['MALE', 'FEMALE'], {
        errorMap: () => ({ message: 'يرجى اختيار جنس المتوفي' }),
    }),
});

export const counterSchema = z.object({
    memorialId: z.string().uuid('معرف غير صالح'),
    dhikrType: z.enum(['subhanAllah', 'alhamdulillah', 'allahuAkbar', 'laIlahaIllallah']),
});

export type MemorialInput = z.infer<typeof memorialSchema>;
export type CounterInput = z.infer<typeof counterSchema>;
