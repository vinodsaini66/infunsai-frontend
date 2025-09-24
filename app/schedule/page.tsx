import { Suspense } from "react"
import { ScheduleManager } from "@/components/schedule/schedule-manager"
import { Header } from "@/components/header"

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Content Scheduler</h1>
          <p className="text-slate-600">Manage and schedule your LinkedIn content for optimal engagement</p>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          }
        >
          <ScheduleManager />
        </Suspense>
      </div>
    </div>
  )
}
