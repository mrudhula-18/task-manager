'use client'

import { cn } from '@/lib/utils'
import type { TaskStatus, TaskPriority } from '@/types'

export interface FilterState {
  status: TaskStatus | 'all'
  priority: TaskPriority | 'all'
  search: string
}

interface TaskFiltersProps {
  filters: FilterState
  onChange: (f: FilterState) => void
  totalCount: number
  filteredCount: number
}

const statusTabs: { value: FilterState['status']; label: string }[] = [
  { value: 'all',         label: 'All'         },
  { value: 'todo',        label: 'To do'       },
  { value: 'in_progress', label: 'In progress' },
  { value: 'done',        label: 'Done'        },
]

export function TaskFilters({ filters, onChange, totalCount, filteredCount }: TaskFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={e => onChange({ ...filters, search: e.target.value })}
          className={[
            'h-9 w-full rounded-xl border border-border bg-surface-2 pl-9 pr-3',
            'text-sm text-text-primary placeholder:text-text-tertiary',
            'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60',
            'hover:border-border-hover transition-all duration-150',
          ].join(' ')}
        />
        {filters.search && (
          <button
            onClick={() => onChange({ ...filters, search: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Status tabs + priority + count */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center bg-surface-2 rounded-xl p-1 gap-0.5 border border-border/50">
          {statusTabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => onChange({ ...filters, status: tab.value })}
              className={cn(
                'rounded-lg px-3 py-1 text-xs font-medium transition-all duration-150',
                filters.status === tab.value
                  ? 'bg-surface-4 text-text-primary shadow-sm'
                  : 'text-text-tertiary hover:text-text-secondary'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Priority filter */}
        <select
          value={filters.priority}
          onChange={e => onChange({ ...filters, priority: e.target.value as FilterState['priority'] })}
          className={[
            'h-8 rounded-xl border border-border/50 bg-surface-2 px-2.5 text-xs text-text-tertiary',
            'focus:outline-none focus:ring-1 focus:ring-accent/40 transition-colors cursor-pointer',
            'hover:border-border-hover hover:text-text-secondary',
          ].join(' ')}
        >
          <option value="all">All priorities</option>
          <option value="high">High priority</option>
          <option value="medium">Medium priority</option>
          <option value="low">Low priority</option>
        </select>

        <span className="ml-auto text-xs text-text-tertiary tabular-nums">
          {filteredCount === totalCount
            ? `${totalCount} task${totalCount !== 1 ? 's' : ''}`
            : `${filteredCount} / ${totalCount}`}
        </span>
      </div>
    </div>
  )
}
