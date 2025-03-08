import Link from "next/link";
import { Package, UserCircle } from "lucide-react"; // Íconos de lucide-react
import LogoutButton from "@/components/custom/LogoutButton"; // Asegúrate de que esté correctamente importado

export default function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="h-screen grid grid-cols-[240px_1fr] ">
      {/* Barra lateral izquierda */}
      <nav className="border-r bg-white shadow-md">
        <div className="flex h-full max-h-screen flex-col gap-4">
          {/* Encabezado */}
          <div className="flex h-[60px] items-center border-b px-6 ">
            <div className="flex items-center gap-2 font-semibold text-gray-800 hover:text-blue-600 transition-colors">
              <Package className="h-6 w-6 text-blue-600" />
              <span className="text-lg">Dashboard</span>
            </div>
          </div>

          {/* Menú de navegación */}
          <div className="flex-1 overflow-auto py-4 px-4">
            <nav className="grid items-start text-sm font-medium space-y-2">
              {/* Enlace a Pedidos */}
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
                href="/dashboard/orders"
              >
                <Package className="h-5 w-5 text-blue-600" />
                Pedidos
              </Link>

              {/* Enlace a Perfil de usuario */}
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
                href="/dashboard/profile"
              >
                <UserCircle className="h-5 w-5 text-blue-600" />
                Perfil de usuario
              </Link>

              {/* Botón de cerrar sesión (ahora debajo del perfil) */}
              <div className="mt-4 border-t pt-4">
                <LogoutButton />
              </div>
            </nav>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex flex-col overflow-scroll p-6">{children}</main>
    </div>
  );
}
