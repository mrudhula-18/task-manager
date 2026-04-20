import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = { title: 'Sign in — TaskFlow' }

export default function LoginPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-white">Welcome back</h1>
        <p className="mt-1 text-sm text-muted">Sign in to your account</p>
      </div>
      <LoginForm />
    </>
  )
}
