import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { username, password, adminSecret } = await request.json()

    // Validar clave secreta de administrador
    if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: "Clave de administrador inválida" }, { status: 401 })
    }

    // Validar datos requeridos
    if (!username || !password) {
      return NextResponse.json({ error: "Usuario y contraseña son requeridos" }, { status: 400 })
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { username },
    })

    if (existingUser) {
      return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 })
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12)

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        username,
        hashedPassword,
        role: "user",
      },
    })

    return NextResponse.json(
      {
        message: "Usuario creado exitosamente",
        user: { id: user.id, username: user.username, role: user.role },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error al crear usuario:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
