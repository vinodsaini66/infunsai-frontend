import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { Header } from "@/components/header"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics Dashboard</h1>
            <p className="text-slate-600">Track your LinkedIn growth and engagement with AI-powered insights</p>
          </div>
          <AnalyticsDashboard />
        </div>
      </main>
    </div>
  )
}
