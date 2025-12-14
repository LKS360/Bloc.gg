"use client";

import Link from "next/link";
import { Home, BarChart2, Users, Settings } from "lucide-react";

export default function DashboardSidebar() {
  return (
    <aside className="w-16 md:w-20 bg-[#05060A] border-r border-white/5 flex flex-col items-center py-6 gap-6">
      <Link href="/dashboard">
        <Home className="text-gray-300 hover:text-white w-6 h-6" />
      </Link>

      <Link href="/dashboard/stats">
        <BarChart2 className="text-gray-300 hover:text-white w-6 h-6" />
      </Link>

      <Link href="/discord">
        <Users className="text-gray-300 hover:text-white w-6 h-6" />
      </Link>

      <Link href="/dashboard/settings">
        <Settings className="text-gray-300 hover:text-white w-6 h-6" />
      </Link>
    </aside>
  );
}
