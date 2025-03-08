"use client";

const LogoutButton = () => {
  const handleLogout = () => {
    document.cookie = "jwt=; Max-Age=0; path=/"; // Eliminar cookie
    window.location.href = "/signin"; // Redirigir al login
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-auto w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
