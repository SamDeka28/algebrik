import { Toaster } from "@/components/LendingHealthCheck/ui/toaster";
import { Toaster as Sonner } from "@/components/LendingHealthCheck/ui/sonner";
import { TooltipProvider } from "@/components/LendingHealthCheck/ui/tooltip";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
                {children}
            </div>
        </TooltipProvider>
    );
}