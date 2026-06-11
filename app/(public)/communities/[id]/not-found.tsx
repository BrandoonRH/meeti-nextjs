export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">Comunidad no encontrada</h2>
          <p className="text-gray-600 text-lg">
            Lo sentimos, la comunidad que buscas no existe o ha sido eliminada.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <p className="text-blue-800 text-sm">
            Verifica que el ID de la comunidad sea correcto e intenta nuevamente.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Volver al inicio
          </a>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Ver comunidades
          </a>
        </div>
      </div>
    </div>
  );
}
