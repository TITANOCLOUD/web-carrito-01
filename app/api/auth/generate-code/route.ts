import { NextResponse } from "next/server"

// In-memory storage for temporary codes (in production, use Redis or database)
const temporaryCodes = new Map<
  string,
  {
    code: string
    expiresAt: number
    used: boolean
  }
>()

// Generate 6-digit code
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Clean expired codes every minute
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of temporaryCodes.entries()) {
    if (value.expiresAt < now) {
      temporaryCodes.delete(key)
    }
  }
}, 60000)

export async function POST(request: Request) {
  try {
    const { username } = await request.json()

    if (!username || username !== "Admin") {
      return NextResponse.json({ success: false, message: "Usuario no autorizado" }, { status: 403 })
    }

    // Generate new code
    const code = generateCode()
    const expiresAt = Date.now() + 5 * 60 * 1000 // 5 minutes

    // Store code
    temporaryCodes.set(code, {
      code,
      expiresAt,
      used: false,
    })

    // Calculate expiration time
    const expiresIn = new Date(expiresAt).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })

    return NextResponse.json(
      {
        success: true,
        code,
        expiresAt,
        expiresIn,
        message: "Código temporal generado",
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error al generar código" }, { status: 500 })
  }
}

// Validate temporary code
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const code = url.searchParams.get("code")

    if (!code) {
      return NextResponse.json({ valid: false, message: "Código no proporcionado" }, { status: 400 })
    }

    const tempCode = temporaryCodes.get(code)

    if (!tempCode) {
      return NextResponse.json({ valid: false, message: "Código inválido" }, { status: 404 })
    }

    if (tempCode.expiresAt < Date.now()) {
      temporaryCodes.delete(code)
      return NextResponse.json({ valid: false, message: "Código expirado" }, { status: 410 })
    }

    if (tempCode.used) {
      return NextResponse.json({ valid: false, message: "Código ya utilizado" }, { status: 410 })
    }

    // Mark as used
    tempCode.used = true

    return NextResponse.json(
      {
        valid: true,
        message: "Código válido",
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ valid: false, message: "Error al validar código" }, { status: 500 })
  }
}
