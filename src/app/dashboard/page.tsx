import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogoutButton } from "@/components/logout-button"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions) as {
    user: {
      id: string;
      username: string;
      role: string;
    }
  } | null

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Panel de Control</CardTitle>
            <CardDescription>Bienvenido al sistema, {session.user.username}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Información del Usuario</h3>
                <p className="text-sm text-gray-600">ID: {session.user.id}</p>
                <p className="text-sm text-gray-600">Usuario: {session.user.username}</p>
                <p className="text-sm text-gray-600">Rol: {session.user.role}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Acciones</h3>
                <div className="mt-2">
                  <LogoutButton />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
