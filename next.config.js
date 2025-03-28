/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Si vas a subir imágenes a dominios externos, ajusta aquí:
    images: {
      domains: ["lh3.googleusercontent.com"], // ejemplo para fotos de perfil Google
    },
  };
  

module.exports = nextConfig;
