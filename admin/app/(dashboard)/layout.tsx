"use client"
import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const router = useRouter()
  const pathname = usePathname()

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin_token")
      if (!token) {
        router.push("/login")
      }
    }
  }, [pathname, router])

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar toggleSidebar={() => setSidebarOpen(prev => !prev)} />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
