'use client'

import { TaskCard } from '@/components/tasks/TaskCard'
import type { Task, CreateTaskInput } from '@/types'

interface TaskListProps {
  tasks: Task[]
  onUpdate: (input: { id: string } & Partial<CreateTaskInput>) => Promise<boolean>
  onDelete: (id: string) => Promise<boolean>
}

export function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface-2">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="3" y="5" width="16" height="14" rx="2" stroke="#3f3f46" strokeWidth="1.5"/>
            <path d="M7 9h8M7 13h5" stroke="#3f3f46" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M15 1v4M7 1v4" stroke="#3f3f46" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="text-sm font-medium text-text-secondary">No tasks here</p>
        <p className="mt-1 text-xs text-text-tertiary">Create one or adjust your filters</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task, i) => (
        <div key={task.id} className="animate-slide-up" style={{ animationDelay: `${i * 30}ms` }}>
          <TaskCard task={task} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
      ))}
    </div>
  )
}
