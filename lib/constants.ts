// Default Avatar Configuration
// This default avatar will be used when users don't upload a photo

/**
 * Default Avatar URL Options:
 * 
 * Option 1: Local SVG (for development)
 * - Works immediately without Cloudinary setup
 * - Use absolute URL in production
 * 
 * Option 2: Cloudinary-hosted (for production)
 * - Upload public/default-avatar.svg to Cloudinary
 * - Replace URL below with the Cloudinary secure_url
 */

// For development: Use local SVG
// For production: Replace with Cloudinary URL like:
// 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/sadaqa/default-avatar.svg'
export const DEFAULT_AVATAR_URL = '/default-avatar.svg';

// Default Avatar Public ID (used when storing in database)
export const DEFAULT_AVATAR_PUBLIC_ID = 'sadaqa/default-avatar';

// Check if URL is the default avatar
export const isDefaultAvatar = (url: string): boolean => {
    return url === DEFAULT_AVATAR_URL ||
        url.includes('default-avatar') ||
        url.includes(DEFAULT_AVATAR_PUBLIC_ID);
};

// Color constants for the theme
export const THEME_COLORS = {
    primary: '#0F6B55',      // Deep Emerald
    accent: '#C7A74A',       // Muted Gold
    background: '#F7F5EF',   // Warm Off-White
    avatarBg: '#DFF5EE',     // Light Emerald (for avatar background)
    ink: '#1C1C1C',          // Dark text
};
