export function cn(...inputs: string[]) {
    return inputs.filter(Boolean).join(' ');
}

export function sanitizeName(name: string): string {
    return name.trim().replace(/\s+/g, ' ');
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}
