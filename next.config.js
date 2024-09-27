/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/avif", "image/webp"],
        domains: ["productionglue-bucket.s3.amazonaws.com"]
    },
    env:{
        NEXT_GOOGLE_API_KEY: process.env.NEXT_GOOGLE_API_KEY,
        NEXT_AUTH_AWS_REGION: process.env.NEXT_AUTH_AWS_REGION,
        NEXT_AUTH_AWS_ACCESS_KEY_ID: process.env.NEXT_AUTH_AWS_ACCESS_KEY_ID,
        NEXT_AUTH_AWS_SECRET_ACCESS_KEY: process.env.NEXT_AUTH_AWS_SECRET_ACCESS_KEY,
        NEXT_AWS_S3_BUCKET_NAME: process.env.NEXT_AWS_S3_BUCKET_NAME,
    }
}

module.exports = nextConfig
