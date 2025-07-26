"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/" })} variant="outline" size="sm">
      <LogOut className="mr-2 h-4 w-4" />
      Cerrar Sesión
    </Button>
  )
}
