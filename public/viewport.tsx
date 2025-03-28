// app/viewport.tsx
export function generateViewport() {
    return {
      themeColor: '#2563EB',
      // Opcional: agregar más configuraciones de viewport
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
      userScalable: false,
    }
  }