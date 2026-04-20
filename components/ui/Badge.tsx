import { cn } from '@/lib/utils'
import type { TaskStatus, TaskPriority } from '@/types'

const statusConfig: Record<TaskStatus, { label: string; dot: string; classes: string }> = {
  todo:        { label: 'To do',       dot: 'bg-zinc-500',   classes: 'bg-zinc-900/80   text-zinc-400   border-zinc-700/50'  },
  in_progress: { label: 'In progress', dot: 'bg-indigo-400', classes: 'bg-indigo-950/80 text-indigo-300 border-indigo-700/50' },
  done:        { label: 'Done',        dot: 'bg-emerald-400',classes: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/50'},
}

const priorityConfig: Record<TaskPriority, { label: string; icon: string; classes: string }> = {
  low:    { label: 'Low',    icon: '↓', classes: 'bg-zinc-900/60   text-zinc-500   border-zinc-700/40'  },
  medium: { label: 'Medium', icon: '→', classes: 'bg-orange-950/60 text-orange-400 border-orange-800/40' },
  high:   { label: 'High',   icon: '↑', classes: 'bg-red-950/60    text-red-400    border-red-800/40'    },
}

export function StatusBadge({ status, className }: { status: TaskStatus; className?: string }) {
  const cfg = statusConfig[status]
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium',
      cfg.classes, className
    )}>
      <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0', cfg.dot)} />
      {cfg.label}
    </span>
  )
}

export function PriorityBadge({ priority, className }: { priority: TaskPriority; className?: string }) {
  const cfg = priorityConfig[priority]
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium',
      cfg.classes, className
    )}>
      <span className="text-[10px] font-bold">{cfg.icon}</span>
      {cfg.label}
    </span>
  )
}
