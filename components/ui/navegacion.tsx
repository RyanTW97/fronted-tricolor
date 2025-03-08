import { ChevronDown } from "lucide-react";
import Link from "next/link";

const Navegacion = () => {
  return (
    <div data-theme="light" className="flex justify-between text-blue-800  ">
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 text-blue-800 bg-transparent border-0"
        >
          Categoria
          <ChevronDown />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 text-blue-800 bg-transparent border-0"
        >
          Pinturas
          <ChevronDown />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
      <Link href="/products/maquinas" className="content-center font-semibold">
        Maquinas
      </Link>
      <Link href="/products/ofertas" className="content-center font-semibold">
        Ofertas
      </Link>
      <Link
        href="/products/calculadora"
        className="content-center font-semibold"
      >
        Calculadora
      </Link>
      <div className="dropdown dropdown-hover ">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 text-blue-800 bg-transparent border-0"
        >
          Contáctanos
          <ChevronDown />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navegacion;
