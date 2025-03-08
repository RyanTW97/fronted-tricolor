import Link from "next/link";

const NavbarResponsive = () => {
  return (
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
    >
      {/* Categorías */}
      <li className="dropdown">
        <details>
          <summary className="flex items-center">
            <Link href="/category">Categoría</Link>
          </summary>
          <ul className="menu bg-base-100 rounded-box w-full p-2 shadow">
            <li>
              <Link href="/pintura">Pinturas y Recubrimientos</Link>
            </li>
            <li>
              <Link href="/category/resinas-epoxicas">Resinas Epóxicas</Link>
            </li>
            <li>
              <Link href="/category/herramientas-manuales">
                Herramientas Manuales
              </Link>
            </li>
            <li>
              <Link href="/category/lijas-abrasivos">Lijas y Abrasivos</Link>
            </li>
            <li>
              <Link href="/category/iluminacion-electricidad">
                Iluminación y Electricidad
              </Link>
            </li>
            <li>
              <Link href="/category/selladores-adhesivos">
                Selladores y Adhesivos
              </Link>
            </li>
            <li>
              <Link href="/category/equipos-maquinas">Equipos y Máquinas</Link>
            </li>
            <li>
              <Link href="/category/cosmetica-capilar">Cosmética Capilar</Link>
            </li>
          </ul>
        </details>
      </li>

      {/* Pinturas */}
      <li className="dropdown">
        <details>
          <summary className="flex items-center">
            <Link href="/pintura">Pinturas</Link>
          </summary>
          <ul className="menu bg-base-100 rounded-box w-full p-2 shadow">
            <li>
              <Link href="/category/linea-arquitectonica">
                Linea Arquitectónica
              </Link>
            </li>
            <li>
              <Link href="/category/linea-madera">Linea Madera</Link>
            </li>
            <li>
              <Link href="/category/linea-metalica">Linea Metálica</Link>
            </li>
            <li>
              <Link href="/category/linea-automotriz">Linea Automotriz</Link>
            </li>
            <li>
              <Link href="/category/demarcacion-vial">Demarcación Vial</Link>
            </li>
            <li>
              <Link href="/category/pisos-industriales">
                Pisos Industriales
              </Link>
            </li>
            <li>
              <Link href="/category/petrolera-industrial">
                Petrolera-Industrial
              </Link>
            </li>
            <li>
              <Link href="/category/linea-especial">Linea Especial</Link>
            </li>
          </ul>
        </details>
      </li>

      {/* Otros enlaces */}
      <li>
        <Link href="/category/maquinaria">Maquinas</Link>
      </li>
      <li>
        <Link href="/oferta">Ofertas</Link>
      </li>
      <li>
        <Link href="/calculadora">Calculadora</Link>
      </li>

      {/* Contacto */}
      <li className="dropdown">
        <details>
          <summary className="flex items-center">Contáctanos</summary>
          <ul className="menu bg-stone-100 rounded-box w-full p-2 shadow">
            <li>
              <Link href="/contact">Contáctanos</Link>
            </li>
            <li>
              <Link href="/maestro">Capacítate Maestro</Link>
            </li>
            <li>
              <Link href="/about">Acerca de nosotros</Link>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
};

export default NavbarResponsive;
