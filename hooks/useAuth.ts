'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { AuthUser } from '@/types'
import type { AuthError } from '@supabase/supabase-js'

interface AuthState {
  user: AuthUser | null
  loading: boolean
}

interface AuthActions {
  signUp: (email: string, password: string) => Promise<AuthError | null>
  signIn: (email: string, password: string) => Promise<AuthError | null>
  signOut: () => Promise<void>
}

export function useAuth(): AuthState & AuthActions {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user ? { id: user.id, email: user.email! } : null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(
          session?.user
            ? { id: session.user.id, email: session.user.email! }
            : null
        )
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = useCallback(
    async (email: string, password: string): Promise<AuthError | null> => {
      const { error } = await supabase.auth.signUp({ email, password })
      return error
    }, []
  )

  const signIn = useCallback(
    async (email: string, password: string): Promise<AuthError | null> => {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return error
    }, []
  )

  const signOut = useCallback(async (): Promise<void> => {
    await supabase.auth.signOut()
  }, [])

  return { user, loading, signUp, signIn, signOut }
}
