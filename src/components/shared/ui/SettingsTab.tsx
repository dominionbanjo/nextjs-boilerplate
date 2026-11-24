"use client";

import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabsProps {
  tabs: { label: string; content: ReactNode }[];
}

export function Tabs({ tabs }: TabsProps) {
  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-2xl md:rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
      <Tab.Group>
        {/* TAB HEADER - Only show if more than one tab */}
        {tabs.length > 1 && (
          <Tab.List
            className={cn(
              "flex border-b border-slate-100",
              "w-full items-center",
            )}
          >
            {tabs.map((tab, idx) => (
              <Tab
                key={idx}
                className={({ selected }) =>
                  cn(
                    "py-5 text-sm font-bold outline-none transition-all flex-1 text-center",
                    "border-b-2 -mb-px",
                    selected
                      ? "border-[#1E6BFF] text-[#1E6BFF]"
                      : "border-transparent text-slate-400 hover:text-slate-600",
                  )
                }
              >
                {tab.label}
              </Tab>
            ))}
          </Tab.List>
        )}

        {/* TAB CONTENT */}
        <Tab.Panels className="flex-1 overflow-y-auto">
          {tabs.map((tab, idx) => (
            <Tab.Panel key={idx} className="h-full focus:outline-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 md:p-12"
                >
                  {tab.content}
                </motion.div>
              </AnimatePresence>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
