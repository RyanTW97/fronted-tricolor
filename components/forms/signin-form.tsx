"use client";

import FacebookAuthButton from "../custom/facebook-auth-button";
import GoogleAuthButton from "../custom/google-auth-button";

export function SigninForm() {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-md p-6 -mt-28 animate-fade-in">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
        Iniciar Sesión
      </h1>
      <div className="flex flex-col gap-4">
        <GoogleAuthButton />
        <FacebookAuthButton text="Continuar con Facebook" />
      </div>
      <p className="mt-6 text-center text-sm text-gray-500">
        ¿Primera vez? Al iniciar sesión, se creará tu cuenta automáticamente.
      </p>
    </div>
  );
}
