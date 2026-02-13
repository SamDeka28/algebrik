"use client";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Shield, 
  Send, 
  MessageSquare, 
  Lock,
  ChevronLeft,
  Presentation,
  Monitor,
  Bot
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/auth-client";

interface SidebarProps {
  activeItem?: string;
}

export default function Sidebar({ activeItem = "dashboard" }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isInternal, setIsInternal] = useState(false);

  useEffect(() => {
    const session = getSession();
    setIsInternal(session?.isInternal || false);
  }, []);

  const allMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, requiresInternal: false },
    { id: "chatbots", label: "Chatbots", icon: Bot, requiresInternal: false },

    { id: "pitch-decks", label: "Pitch Deck", icon: Presentation, requiresInternal: false },
    { id: "demos", label: "Demos", icon: Monitor, requiresInternal: false },
    { id: "one-pagers", label: "One-Pagers", icon: FileText, requiresInternal: false },
    { id: "proof-credibility", label: "Proof & Credibility", icon: Shield, requiresInternal: false },
    { id: "campaigns-content", label: "Campaigns & Content", icon: Send, requiresInternal: false },
    { id: "objection-handling", label: "Objection Handling", icon: MessageSquare, requiresInternal: false },
    { id: "internal-only", label: "Internal Only", icon: Lock, badge: true, requiresInternal: true },
  ];

  // Filter menu items based on user's internal access
  const menuItems = allMenuItems.filter(item => {
    if (item.requiresInternal && !isInternal) {
      return false;
    }
    return true;
  });

  return (
    <aside
      className={`bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 ease-in-out shadow-2xl ${
        collapsed ? "w-20" : "w-72"
      } min-h-screen flex flex-col border-r border-slate-700/50`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30 overflow-hidden">
              <Image
                src="/logo.png"
                alt="Algebrik Logo"
                width={48}
                height={48}
                className="object-contain p-2"
              />
            </div>
            {!collapsed && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
            )}
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-white tracking-tight">Algebrik Vault</h1>
              <p className="text-xs text-slate-400">Internal Asset Hub</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <Link
              key={item.id}
              href={`/vault/${item.id === "dashboard" ? "" : item.id}`}
              className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1"
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
              )}
              
              <div className={`flex items-center justify-center w-5 h-5 flex-shrink-0 ${
                isActive ? "text-white" : "text-slate-400 group-hover:text-white"
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              
              {!collapsed && (
                <>
                  <span className={`flex-1 font-medium text-sm ${
                    isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                  }`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <div className="flex items-center gap-1.5">
                      <Lock className={`w-3.5 h-3.5 ${
                        isActive ? "text-white/80" : "text-slate-500 group-hover:text-slate-400"
                      }`} />
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive 
                          ? "bg-white/20 text-white" 
                          : "bg-slate-700/50 text-slate-400 group-hover:bg-slate-600/50 group-hover:text-slate-300"
                      }`}>
                        Locked
                      </span>
                    </div>
                  )}
                </>
              )}
              
              {/* Hover effect overlay */}
              {!isActive && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl hover:bg-slate-700/50 transition-all duration-200 group"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={`w-5 h-5 text-slate-400 group-hover:text-white transition-all duration-200 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
          {!collapsed && (
            <span className="text-xs text-slate-400 group-hover:text-slate-300 font-medium">
              Collapse
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}

