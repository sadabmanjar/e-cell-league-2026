"use client"
import * as React from "react"
import { Bell, Search, User, Menu } from "lucide-react"

export function Topbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 flex-shrink-0">
      <div className="flex items-center flex-1 gap-4">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 -ml-2 text-text-secondary hover:text-white rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Toggle admin sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search records..." 
            className="w-full bg-surface-alt border border-border rounded-md pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-text-secondary hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white leading-none mb-1">Super Admin</p>
            <p className="text-xs text-text-secondary leading-none">admin@ecell.com</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  )
}
