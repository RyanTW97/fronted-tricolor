import { ChevronDown } from "lucide-react";
import Link from "next/link";

const NavbarDown = () => {
  return (
    <ul className="px-1 flex items-center justify-between w-full">
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 bg-transparent border-0 shadow-none hover:text-blue-700 hover:scale-125 font-normal text-base"
        >
          <Link href="/category">Categoría</Link>
          <ChevronDown />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[400px] p-6 shadow transition-all duration-300 ease-in-out transform scale-95 opacity-0 hover:opacity-100 hover:scale-100 grid grid-cols-2 gap-6"
        >
          <Link
            href="/pintura"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Pinturas y Recubrimientos
          </Link>
          <Link
            href="/category/resinas-epoxicas"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Resinas Epóxicas
          </Link>
          <Link
            href="/category/herramientas-manuales"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Herramientas Manuales
          </Link>
          <Link
            href="/category/lijas-abrasivos"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Lijas y Abrasivos
          </Link>
          <Link
            href="/category/iluminacion-electricidad"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Iluminación y Electricidad
          </Link>
          <Link
            href="/category/selladores-adhesivos"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Selladores y Adhesivos
          </Link>
          <Link
            href="/category/equipos-maquinas"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Equipos y Máquinas
          </Link>
          <Link
            href="/category/cosmetica-capilar"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Cosmética Capilar
          </Link>
        </ul>
      </div>
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 bg-transparent border-0 shadow-none hover:text-blue-700 hover:scale-125 font-normal text-base"
        >
          <Link href="/pintura">Pinturas</Link>
          <ChevronDown />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[400px] p-6 shadow transition-all duration-300 ease-in-out transform scale-95 opacity-0 hover:opacity-100 hover:scale-100 grid grid-cols-2 gap-6"
        >
          <Link
            href="/category/linea-arquitectonica"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Linea Arquitectónica
          </Link>
          <Link
            href="/category/linea-madera"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Linea Madera
          </Link>
          <Link
            href="/category/linea-metalica"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Linea Metálica
          </Link>
          <Link
            href="/category/linea-automotriz"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Linea Automotriz
          </Link>
          <Link
            href="/category/demarcacion-vial"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Demarcación Vial
          </Link>
          <Link
            href="/category/pisos-industriales"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Pisos Industriales
          </Link>
          <Link
            href="/category/petrolera-industrial"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Petrolera-Industrial
          </Link>
          <Link
            href="/category/linea-especial"
            className="hover:text-blue-800 hover:font-semibold"
          >
            Linea Especial
          </Link>
        </ul>
      </div>

      <Link href="/category/maquinaria">
        <div className="btn bg-transparent border-0 font-normal text-base shadow-none hover:text-blue-700 hover:scale-125">
          Maquinas
        </div>
      </Link>
      <Link href="/oferta">
        <div className="btn bg-transparent border-0 font-normal text-base shadow-none hover:text-blue-700 hover:scale-125">
          Ofertas
        </div>
      </Link>
      <Link href="/calculadora">
        <div className="btn bg-transparent border-0 font-normal text-base shadow-none hover:text-blue-700 hover:scale-125">
          Calculadora
        </div>
      </Link>
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 bg-transparent border-0 shadow-none hover:text-blue-700 hover:scale-125 font-normal text-base"
        >
          Contáctanos
          <ChevronDown />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-stone-100 right-0 rounded-box z-[1] w-52 p-4 shadow"
        >
          <div className="flex flex-col items-end space-y-2">
            <Link href="/contact">
              <div className="hover:text-blue-700 text-lg hover:scale-110">
                Contáctanos
              </div>
            </Link>
            <Link href="/maestro">
              <div className="hover:text-blue-700 text-lg hover:scale-110">
                Capacítate Maestro
              </div>
            </Link>
            <Link href="/about">
              <div className="hover:text-blue-700 text-lg hover:scale-110">
                Acerca de nosotros
              </div>
            </Link>
          </div>
        </ul>
      </div>
    </ul>
  );
};

export default NavbarDown;
