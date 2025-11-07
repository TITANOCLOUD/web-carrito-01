import { NextResponse } from "next/server"
import { createHash } from "crypto"

const VALID_CREDENTIALS = {
  username: "Admin",
  // SHA-256 hash of "Admin*2021"
  passwordHash: createHash("sha256").update("Admin*2021").digest("hex"),
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
      const codeData = temporaryCodes.get(username)

      if (codeData && codeData.code === tempCode && !codeData.used && Date.now() < codeData.expiresAt) {
        codeData.used = true
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
          message: "Código temporal inválido o expirado",
        },
        { status: 401 },
      )
    }

    const passwordHash = hashPassword(password)

    if (username === VALID_CREDENTIALS.username && passwordHash === VALID_CREDENTIALS.passwordHash) {
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

// Export for code generation
export { temporaryCodes }
