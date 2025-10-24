"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

export type User = {
  id: string
  email: string
  first_name: string
  last_name: string
  full_name: string
  company_name?: string | null
  profile?: string | null
  is_linkedin_connected: boolean
  account_type: "influencer" | "job-seeker" | "aspiring-influencer" | string
  role?: string | null
}


type UserContextType = {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  refreshUser: () => Promise<void>
  logout: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch user data from your API if cookie exists
  const refreshUser = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/auth/me", { credentials: "include" })
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Error fetching user:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Clear session (and delete cookie via API)
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
    setUser(null)
  }

  useEffect(() => {
    refreshUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, loading, setUser, refreshUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser must be used within a AuthProvider")
  return context
}
