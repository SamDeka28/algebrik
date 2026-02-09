"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, type User } from "@/lib/auth-client";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SectionPage from "../components/SectionPage";
import { Monitor } from "lucide-react";

export default function PitchDemosPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push("/login");
      return;
    }
    setUser(session);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeItem="pitch-demos" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <SectionPage
            title="Pitch & Demos"
            icon={Monitor}
            description="Presentations, demo recordings, and executive pitch materials"
            category="pitch-demos"
            strapiCollection="vault-assets"
          />
        </div>
      </div>
    </div>
  );
}

