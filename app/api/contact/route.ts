import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json()

    // Prepare email content
    const emailContent = `
Nueva Solicitud de Contacto - Titanocloud
=========================================

INFORMACIÓN DEL CLIENTE:
------------------------
Nombre: ${formData.nombre}
Usuario: ${formData.usuario}
NIT/Registro Tributario: ${formData.nit}
Número de Contacto: ${formData.telefono}
Correo Alternativo: ${formData.correoAlternativo || "No proporcionado"}

UBICACIÓN:
----------
País: ${formData.pais}
Ciudad: ${formData.ciudad}
Dirección: ${formData.direccion}

Fecha de Solicitud: ${new Date().toLocaleString("es-MX")}

Por favor, contactar al cliente lo antes posible.
    `

    // In a real implementation, you would send this email using a service like SendGrid, Resend, etc.
    // For now, we'll just log it and return success
    console.log("[v0] Contact form submission:", emailContent)

    // Simulate email sending
    // await sendEmail({
    //   to: "datacenter@titanocloud.com",
    //   subject: `Nueva Solicitud de Contacto - ${formData.nombre}`,
    //   text: emailContent
    // })

    return NextResponse.json(
      {
        success: true,
        message: "Solicitud enviada exitosamente",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error al procesar la solicitud",
      },
      { status: 500 },
    )
  }
}
