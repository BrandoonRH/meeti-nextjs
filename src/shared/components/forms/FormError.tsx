export default function FormError({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-6 mt-1">
      {children && (
        <p className="text-sm text-red-500 bg-red-50 border-l-4 border-red-500 px-2 py-1">
          {children}
        </p>
      )}
    </div>
  );
}