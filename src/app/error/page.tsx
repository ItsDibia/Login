'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <Card className="w-full max-w-md border-red-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-red-800">¡Oops! Algo salió mal</CardTitle>
          <CardDescription className="text-red-600">
            Ha ocurrido un error inesperado en la aplicación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700 font-mono">
              {error?.message || "Error desconocido"}
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={() => reset()}
              variant="default"
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Intentar de nuevo
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Volver al inicio
              </Link>
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 text-center">
            Si el problema persiste, contacta al administrador.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}