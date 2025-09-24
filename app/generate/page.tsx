import { ContentGenerator } from "@/components/content/content-generator"
import { Header } from "@/components/header"

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Content Generator</h1>
            <p className="text-slate-600">Create engaging LinkedIn content tailored to your goals and audience</p>
          </div>
          <ContentGenerator />
        </div>
      </main>
    </div>
  )
}
