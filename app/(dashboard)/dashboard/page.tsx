'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useTasks } from '@/hooks/useTasks'
import { useAuth } from '@/hooks/useAuth'
import { TaskList } from '@/components/tasks/TaskList'
import { TaskFilters, type FilterState } from '@/components/tasks/TaskFilters'
import { TaskForm } from '@/components/tasks/TaskForm'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

function StatCard({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-border/60 bg-surface-1 p-4 transition-all duration-200 hover:border-border-hover">
      <span className={cn('text-2xl font-semibold tabular-nums', accent ?? 'text-text-primary')}>
        {value}
      </span>
      <span className="text-xs text-text-tertiary">{label}</span>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="flex gap-3.5 rounded-2xl border border-border/40 bg-surface-1 p-4">
      <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full shimmer-bg" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-3/4 rounded shimmer-bg" />
        <div className="h-3 w-1/2 rounded shimmer-bg" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-16 rounded-md shimmer-bg" />
          <div className="h-5 w-12 rounded-md shimmer-bg" />
        </div>
      </div>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks()
  const [createOpen, setCreateOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    priority: 'all',
    search: '',
  })

  const stats = useMemo(() => ({
    total:       tasks.length,
    todo:        tasks.filter(t => t.status === 'todo').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    done:        tasks.filter(t => t.status === 'done').length,
  }), [tasks])

  const filteredTasks = useMemo(() => tasks.filter(task => {
    if (filters.status   !== 'all' && task.status   !== filters.status)   return false
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      if (
        !task.title.toLowerCase().includes(q) &&
        !task.description?.toLowerCase().includes(q)
      ) return false
    }
    return true
  }), [tasks, filters])

  const completionPct = stats.total > 0
    ? Math.round((stats.done / stats.total) * 100)
    : 0

  async function handleCreate(input: Parameters<typeof createTask>[0]) {
    const ok = await createTask(input)
    if (ok) setCreateOpen(false)
    return ok
  }

  async function handleSignOut() {
    await signOut()
    router.push('/login')
    router.refresh()
  }

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? 'TF'

  return (
    <div className="min-h-screen bg-surface overflow-y-auto">

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-900/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-5">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent shadow-glow-sm">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7l3.5 3.5L12 3" stroke="white" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-text-primary tracking-tight">
              TaskFlow
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setCreateOpen(true)}
              icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              }
            >
              New task
            </Button>

            {/* Avatar with dropdown */}
            <div className="relative group">
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-muted border border-accent/30 text-xs font-semibold text-accent-hover transition-all hover:bg-accent/20">
                {initials}
              </button>
              <div className="absolute right-0 top-10 w-52 rounded-xl border border-border bg-surface-2 shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div className="px-3 py-2.5 border-b border-border/50">
                  <p className="text-xs font-medium text-text-primary truncate">{user?.email}</p>
                  <p className="text-xs text-text-tertiary mt-0.5">Free plan</p>
                </div>
                <div className="p-1">
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-text-secondary hover:text-red-400 hover:bg-red-950/30 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4.5 2H2a1 1 0 00-1 1v6a1 1 0 001 1h2.5M8 8.5L11 6l-3-2.5M5 6h6"
                        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative mx-auto max-w-4xl px-5 py-8 pb-16">

        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-text-primary">
            Good {getGreeting()},{' '}
            <span className="text-text-secondary font-normal">
              {user?.email?.split('@')[0]}
            </span>
          </h1>
          <p className="mt-1 text-sm text-text-tertiary">
            {stats.total === 0
              ? 'Create your first task to get started'
              : `You have ${stats.todo + stats.in_progress} task${stats.todo + stats.in_progress !== 1 ? 's' : ''} remaining`}
          </p>
        </div>

        {/* Stat cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Total"       value={stats.total}       />
          <StatCard label="To do"       value={stats.todo}        accent="text-zinc-300" />
          <StatCard label="In progress" value={stats.in_progress} accent="text-indigo-400" />
          <StatCard label="Completed"   value={stats.done}        accent="text-emerald-400" />
        </div>

        {/* Progress bar */}
        {stats.total > 0 && (
          <div className="mb-6 rounded-2xl border border-border/60 bg-surface-1 p-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-medium text-text-secondary">Overall progress</span>
              <span className="text-xs font-semibold text-text-primary tabular-nums">
                {completionPct}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-surface-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-700"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-text-tertiary">{stats.done} completed</span>
              <span className="text-xs text-text-tertiary">
                {stats.todo + stats.in_progress} remaining
              </span>
            </div>
          </div>
        )}

        {/* Tasks card */}
        <div className="rounded-2xl border border-border/60 bg-surface-1 overflow-hidden">
          {/* Section header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
            <h2 className="text-sm font-semibold text-text-primary">Tasks</h2>
            <button
              onClick={() => setCreateOpen(true)}
              className="flex items-center gap-1 text-xs text-text-tertiary hover:text-accent transition-colors"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Add task
            </button>
          </div>

          {/* Filters */}
          <div className="px-5 py-3 border-b border-border/30">
            <TaskFilters
              filters={filters}
              onChange={setFilters}
              totalCount={tasks.length}
              filteredCount={filteredTasks.length}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mx-5 mt-4 rounded-xl border border-red-900/40 bg-red-950/30 px-4 py-3 text-xs text-red-400">
              {error}
            </div>
          )}

          {/* Task list */}
          <div className="p-4">
            {loading ? (
              <div className="flex flex-col gap-2">
                {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <TaskList
                tasks={filteredTasks}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            )}
          </div>
        </div>
      </main>

      {/* Create modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="New task"
        description="Add a task to your list"
      >
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
        />
      </Modal>
    </div>
  )
}
