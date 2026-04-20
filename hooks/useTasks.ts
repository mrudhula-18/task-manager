'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Task, CreateTaskInput, UpdateTaskInput } from '@/types'

interface UseTasksReturn {
  tasks: Task[]
  loading: boolean
  error: string | null
  createTask: (input: CreateTaskInput) => Promise<boolean>
  updateTask: (input: UpdateTaskInput) => Promise<boolean>
  deleteTask: (id: string) => Promise<boolean>
  refetch: () => Promise<void>
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setTasks(data ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTasks()

    // Real-time subscription
    const channel = supabase
      .channel('tasks-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        () => { fetchTasks() }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [fetchTasks])

  const createTask = useCallback(async (input: CreateTaskInput): Promise<boolean> => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase.from('tasks').insert({
      ...input,
      user_id: user.id,
    })

    if (error) { setError(error.message); return false }
    return true
  }, [])

  const updateTask = useCallback(async (input: UpdateTaskInput): Promise<boolean> => {
    const { id, ...rest } = input
    const { error } = await supabase
      .from('tasks')
      .update(rest)
      .eq('id', id)

    if (error) { setError(error.message); return false }
    return true
  }, [])

  const deleteTask = useCallback(async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)

    if (error) { setError(error.message); return false }
    return true
  }, [])

  return { tasks, loading, error, createTask, updateTask, deleteTask, refetch: fetchTasks }
}
