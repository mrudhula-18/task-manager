export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-xl font-semibold tracking-tight text-white">
            Task<span className="text-accent">Flow</span>
          </span>
        </div>
        <div className="rounded-xl border border-border bg-surface-1 p-6 shadow-xl">
          {children}
        </div>
      </div>
    </div>
  )
}
