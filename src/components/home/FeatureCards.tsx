"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface Props {
  title: string;
  subtitle: string;
  items: string[];
  link?: string;
}

export default function FeatureCard({ title, subtitle, items, link }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-[#0A0C10] border border-white/10 rounded-2xl px-6 py-7 shadow-[0_0_18px_rgba(0,0,0,0.7)]"
    >
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-xs text-[#FF7A00]/90 mb-4">{subtitle}</p>

      <ul className="text-sm text-gray-300 space-y-1.5 mb-3">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>

      {link && (
        <Link
          href={link}
          className="inline-block text-xs font-semibold text-[#1A73FF] underline"
        >
          Acessar
        </Link>
      )}
    </motion.div>
  );
}
