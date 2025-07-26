"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield } from "lucide-react"

export function RegisterForm() {
  const [step, setStep] = useState<"auth" | "register">("auth")
  const [adminSecret, setAdminSecret] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (!adminSecret) {
      setError("Ingresa la clave secreta de administrador")
      return
    }
    setStep("register")
    setError("")
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          adminSecret,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Usuario creado exitosamente")
        setUsername("")
        setPassword("")
        setConfirmPassword("")
      } else {
        setError(data.error || "Error al crear usuario")
      }
    } catch (error) {
      setError("Error de conexión")
    } finally {
      setIsLoading(false)
    }
  }

  if (step === "auth") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Acceso Restringido
          </CardTitle>
          <CardDescription>Se requiere autorización de administrador para crear usuarios</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdminAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminSecret">Clave Secreta de Administrador</Label>
              <Input
                id="adminSecret"
                type="password"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                placeholder="Ingresa la clave secreta"
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Verificar Acceso
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Crear Usuario</CardTitle>
        <CardDescription>Registra un nuevo usuario en el sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setStep("auth")} disabled={isLoading}>
              Volver
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear Usuario"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
