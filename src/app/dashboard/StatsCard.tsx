"use client";

import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string;
  sub?: string;
}

export default function StatsCard({ title, value, sub }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="p-5 rounded-xl bg-[#111] border border-[#222] hover:border-orange-500 transition-all cursor-default shadow-lg"
    >
      <h3 className="text-sm text-gray-400">{title}</h3>

      <p className="text-3xl font-bold mt-1 text-white">{value}</p>

      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </motion.div>
  );
}
