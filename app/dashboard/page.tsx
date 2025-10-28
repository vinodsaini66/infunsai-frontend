import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PenTool, Calendar, BarChart3, TrendingUp, Users, Clock } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back!</h1>
          <p className="text-slate-600">Here's your LinkedIn automation overview</p>
        </div>

        {/* Quick Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600">Profile Views</p>
                  <p className="text-2xl font-bold text-slate-900">1,234</p>
                  <p className="text-xs text-emerald-600">+12% this week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600">Followers</p>
                  <p className="text-2xl font-bold text-slate-900">856</p>
                  <p className="text-xs text-blue-600">+5 this week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600">Scheduled Posts</p>
                  <p className="text-2xl font-bold text-slate-900">12</p>
                  <p className="text-xs text-purple-600">Next in 2 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600">Engagement Rate</p>
                  <p className="text-2xl font-bold text-slate-900">4.2%</p>
                  <p className="text-xs text-orange-600">+0.8% this week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PenTool className="h-5 w-5 text-emerald-600" />
                <span>Generate Content</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">Create AI-powered LinkedIn posts tailored to your audience</p>
              <Link href="/generate">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Start Creating</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Schedule Posts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">Plan and schedule your content for optimal engagement</p>
              <Link href="/schedule">
                <Button variant="outline" className="w-full bg-transparent">
                  View Schedule
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span>View Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">Track your performance and get AI-powered insights</p>
              <Link href="/analytics">
                <Button variant="outline" className="w-full bg-transparent">
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  )
}
