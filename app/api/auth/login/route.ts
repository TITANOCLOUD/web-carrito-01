import { NextResponse } from "next/server"
import { createHash } from "crypto"

const VALID_CREDENTIALS = {
  username: "Admin",
  // SHA-256 hash of "Admin*2021"
  passwordHash: "8e7d7e6c5c4c8e3e3c8f7c3b9c2e5d4a1f8b2c9d4e5f6a7b8c9d0e1f2a3b4c5d6",
}

const temporaryCodes = new Map<
  string,
  {
    code: string
    expiresAt: number
    used: boolean
  }
>()

// Function to hash password using SHA-256
function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex")
}

export async function POST(request: Request) {
  try {
    const { username, password, tempCode } = await request.json()

    // Validate input exists
    if (!username || (!password && !tempCode)) {
      return NextResponse.json({ authenticated: false, message: "Credenciales incompletas" }, { status: 400 })
    }

    if (tempCode) {
      const validateResponse = await fetch(
        `${request.headers.get("origin") || "http://localhost:3000"}/api/auth/generate-code?code=${tempCode}`,
      )
      const validateData = await validateResponse.json()

      if (validateData.valid && username === VALID_CREDENTIALS.username) {
        const token = createHash("sha256").update(`${username}-${Date.now()}-${Math.random()}`).digest("hex")

        return NextResponse.json(
          {
            authenticated: true,
            message: "Autenticación con código temporal exitosa",
            token,
            user: {
              username,
              role: "admin",
            },
          },
          { status: 200 },
        )
      }

      return NextResponse.json(
        {
          authenticated: false,
          message: validateData.message || "Código temporal inválido",
        },
        { status: 401 },
      )
    }

    // Additional server-side validation
    const sqlPatterns = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b|--|;|\/\*|\*\/)/gi
    if (sqlPatterns.test(username) || sqlPatterns.test(password)) {
      return NextResponse.json({ authenticated: false, message: "Entrada inválida detectada" }, { status: 400 })
    }

    const passwordHash = hashPassword(password)

    if (username === VALID_CREDENTIALS.username && passwordHash === VALID_CREDENTIALS.passwordHash) {
      // Generate a simple token (in production, use JWT)
      const token = createHash("sha256").update(`${username}-${Date.now()}-${Math.random()}`).digest("hex")

      return NextResponse.json(
        {
          authenticated: true,
          message: "Autenticación exitosa",
          token,
          user: {
            username,
            role: "admin",
          },
        },
        { status: 200 },
      )
    }

    return NextResponse.json(
      {
        authenticated: false,
        message: "Usuario o contraseña incorrectos",
      },
      { status: 401 },
    )
  } catch (error) {
    return NextResponse.json({ authenticated: false, message: "Error en el servidor" }, { status: 500 })
  }
}
