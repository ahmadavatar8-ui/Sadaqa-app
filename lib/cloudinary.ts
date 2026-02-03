import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export async function uploadImage(file: Buffer, filename: string): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: 'sadaqa',
                public_id: filename,
                transformation: [
                    { width: 800, height: 800, crop: 'fill', gravity: 'face' },
                    { quality: 'auto:good' },
                    { fetch_format: 'auto' },
                ],
            },
            (error, result) => {
                if (error) reject(error);
                else if (result) resolve({ url: result.secure_url, publicId: result.public_id });
                else reject(new Error('Upload failed'));
            }
        ).end(file);
    });
}
