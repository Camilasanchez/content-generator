import { NextResponse } from "next/server";

export async function GET() {
  // Ejemplo: Redirigir a página de pago
  return NextResponse.json({
    url: "https://checkout.dlocal.com/...", 
  });
}

export async function POST(request: Request) {
  // Ejemplo: webhook
  try {
    const body = await request.json();
    // procesar notificación de pago
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error procesando pago" }, { status: 500 });
  }
}
