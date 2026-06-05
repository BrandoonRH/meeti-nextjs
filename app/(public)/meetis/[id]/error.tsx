"use client";

export default function EditMeetiError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-red-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-700">
            <span className="text-2xl font-semibold">!</span>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Error
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">
              {error.message || "Ocurrió un error al cargar el meeti"}
            </h1>
          </div>
        </div>

        <p className="mt-6 text-sm leading-6 text-slate-600">
          No se encontró el meeti que intentas editar. Verifica que la ruta sea
          correcta o regresa a la lista de tus meetis.
        </p>

        {error?.message ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {error.message}
          </div>
        ) : null}

        {error?.digest ? (
          <p className="mt-3 text-xs text-slate-400">
            ID de error: {error.digest}
          </p>
        ) : null}
      </div>
    </div>
  );
}
