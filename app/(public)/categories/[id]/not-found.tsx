import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl rounded-3xl border border-slate-800/60 bg-slate-900/90 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="text-center">
          <p className="inline-flex rounded-full bg-indigo-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-indigo-200">
            Página no encontrada
          </p>
          <h1 className="mt-8 text-6xl font-extrabold tracking-tight text-white sm:text-7xl">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-slate-200 sm:text-3xl">
            No se encontró la categoría solicitada
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            El recurso que buscas ya no existe o se ha movido. Regresa a la página principal para continuar navegando.
          </p>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
