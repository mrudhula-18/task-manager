'use client'

import { useState } from 'react'
import { StatusBadge, PriorityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { TaskForm } from '@/components/tasks/TaskForm'
import { formatDate, isOverdue, cn } from '@/lib/utils'
import type { Task, CreateTaskInput } from '@/types'

interface TaskCardProps {
  task: Task
  onUpdate: (input: { id: string } & Partial<CreateTaskInput>) => Promise<boolean>
  onDelete: (id: string) => Promise<boolean>
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [editOpen, setEditOpen]     = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting]     = useState(false)
  const [toggling, setToggling]     = useState(false)
  const isDone  = task.status === 'done'
  const overdue = isOverdue(task.due_date) && !isDone

  async function handleToggle() {
    setToggling(true)
    await onUpdate({ id: task.id, status: isDone ? 'todo' : 'done' })
    setToggling(false)
  }

  async function handleEdit(input: CreateTaskInput) {
    const ok = await onUpdate({ id: task.id, ...input })
    if (ok) setEditOpen(false)
    return ok
  }

  async function handleDelete() {
    setDeleting(true)
    await onDelete(task.id)
    setDeleteOpen(false)
  }

  return (
    <>
      <div className={cn(
        'group relative flex gap-3.5 rounded-2xl border p-4 transition-all duration-200',
        'hover:shadow-card',
        isDone
          ? 'border-border/40 bg-surface-1/40'
          : 'border-border bg-surface-1 hover:border-border-hover'
      )}>
        {/* Priority stripe */}
        {!isDone && (
          <div className={cn(
            'absolute left-0 top-3 bottom-3 w-0.5 rounded-full',
            task.priority === 'high'   && 'bg-red-500',
            task.priority === 'medium' && 'bg-orange-500',
            task.priority === 'low'    && 'bg-zinc-600',
          )} />
        )}

        {/* Checkbox */}
        <button
          onClick={handleToggle}
          disabled={toggling}
          aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
          className={cn(
            'mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-2 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-surface-1',
            isDone
              ? 'border-emerald-500 bg-emerald-500'
              : 'border-border-hover hover:border-accent hover:scale-110'
          )}
        >
          {isDone && (
            <svg viewBox="0 0 10 10" fill="none" className="mx-auto w-3 h-3">
              <path d="M2 5l2 2L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={cn(
            'text-sm font-medium leading-snug mb-1',
            isDone ? 'line-through text-text-tertiary' : 'text-text-primary'
          )}>
            {task.title}
          </p>

          {task.description && (
            <p className="text-xs text-text-tertiary leading-relaxed line-clamp-2 mb-2">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-1.5">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
            {task.due_date && (
              <span className={cn(
                'inline-flex items-center gap-1 text-xs',
                overdue ? 'text-red-400' : 'text-text-tertiary'
              )}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                {overdue ? 'Overdue · ' : ''}{formatDate(task.due_date)}
              </span>
            )}
          </div>
        </div>

        {/* Actions — shown on hover */}
        <div className={cn(
          'flex items-start gap-1 transition-opacity duration-150',
          'opacity-0 group-hover:opacity-100'
        )}>
          <button
            onClick={() => setEditOpen(true)}
            className="rounded-lg p-1.5 text-text-tertiary hover:text-text-primary hover:bg-surface-3 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M9.5 1.5l2 2-7 7H2.5v-2l7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => setDeleteOpen(true)}
            className="rounded-lg p-1.5 text-text-tertiary hover:text-red-400 hover:bg-red-950/40 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 3.5h9M5 3.5V2h3v1.5M4 3.5l.5 7h4l.5-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit task">
        <TaskForm onSubmit={handleEdit} onCancel={() => setEditOpen(false)} initialValues={task} />
      </Modal>

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete task" description="This action cannot be undone.">
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => setDeleteOpen(false)} disabled={deleting}>Cancel</Button>
          <Button variant="danger" className="flex-1" loading={deleting} onClick={handleDelete}>Delete task</Button>
        </div>
      </Modal>
    </>
  )
}
