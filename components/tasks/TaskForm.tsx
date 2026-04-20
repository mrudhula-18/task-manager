'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { CreateTaskInput, Task, TaskPriority, TaskStatus } from '@/types'

interface TaskFormProps {
  onSubmit: (input: CreateTaskInput) => Promise<boolean>
  onCancel: () => void
  initialValues?: Task
}

const selectBase = [
  'h-9 w-full rounded-xl border border-border bg-surface-2 px-3 text-sm text-text-primary',
  'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60',
  'hover:border-border-hover transition-all duration-150 cursor-pointer',
].join(' ')

export function TaskForm({ onSubmit, onCancel, initialValues }: TaskFormProps) {
  const [title, setTitle]             = useState(initialValues?.title ?? '')
  const [description, setDescription] = useState(initialValues?.description ?? '')
  const [status, setStatus]           = useState<TaskStatus>(initialValues?.status ?? 'todo')
  const [priority, setPriority]       = useState<TaskPriority>(initialValues?.priority ?? 'medium')
  const [dueDate, setDueDate]         = useState(
    initialValues?.due_date ? initialValues.due_date.split('T')[0] : ''
  )
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) { setError('Title is required'); return }
    setLoading(true)
    setError(null)
    const success = await onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      due_date: dueDate || undefined,
    })
    if (!success) { setError('Something went wrong. Please try again.'); setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Title</label>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
          className={[
            'h-9 w-full rounded-xl border border-border bg-surface-2 px-3',
            'text-sm text-text-primary placeholder:text-text-tertiary',
            'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60',
            'hover:border-border-hover transition-all duration-150',
          ].join(' ')}
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Description</label>
        <textarea
          placeholder="Add more context (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          className={[
            'w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5',
            'text-sm text-text-primary placeholder:text-text-tertiary resize-none',
            'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60',
            'hover:border-border-hover transition-all duration-150',
          ].join(' ')}
        />
      </div>

      {/* Status + Priority */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)} className={selectBase}>
            <option value="todo">To do</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Priority</label>
          <select value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} className={selectBase}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Due date */}
      <Input label="Due date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />

      {error && <p className="text-xs text-red-400 bg-red-950/30 border border-red-900/30 rounded-lg px-3 py-2">{error}</p>}

      <div className="flex gap-2 pt-1">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel} disabled={loading}>Cancel</Button>
        <Button type="submit" loading={loading} className="flex-1">
          {initialValues ? 'Save changes' : 'Create task'}
        </Button>
      </div>
    </form>
  )
}
