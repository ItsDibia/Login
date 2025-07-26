import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sistema de Autenticación</CardTitle>
          <CardDescription>Bienvenido al sistema de autenticación profesional</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <p className="text-sm text-gray-600 text-center">¿Necesitas crear un usuario? Contacta al administrador.</p>
        </CardContent>
      </Card>
    </div>
  )
}
