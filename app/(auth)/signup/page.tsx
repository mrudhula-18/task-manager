import type { Metadata } from 'next'
import { SignupForm } from '@/components/auth/SignupForm'

export const metadata: Metadata = { title: 'Create account — TaskFlow' }

export default function SignupPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-white">Create an account</h1>
        <p className="mt-1 text-sm text-muted">Start managing your tasks today</p>
      </div>
      <SignupForm />
    </>
  )
}
