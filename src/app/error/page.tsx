'use client'

import Link from "next/link"
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
      <div className="w-full max-w-md bg-white border border-red-200 rounded-lg shadow-lg">
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-red-800 mb-2">¡Oops! Algo salió mal</h1>
          <p className="text-red-600 mb-4">Ha ocurrido un error inesperado</p>
          
          <div className="p-3 bg-red-50 border border-red-200 rounded-md mb-4">
            <p className="text-sm text-red-700">
              {error?.message || "Error desconocido"}
            </p>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={() => reset()}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center justify-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Intentar de nuevo
            </button>
            
            <Link 
              href="/"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
