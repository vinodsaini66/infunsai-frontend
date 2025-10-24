"use client"

import Link from "next/link"
import { Sparkles, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "./navigation"
import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"

export function Header() {

  const { logout } = useUser()

  const router = useRouter()

  const handleLogout = async () => {
    await logout()

    router.push("/login")
  }
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-emerald-600 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">LinkedIn AI</span>
          </Link>

          {/* Navigation */}
          <Navigation />

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
