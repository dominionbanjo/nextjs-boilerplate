"use client";

import { useMemo, useRef, useEffect, useState, Suspense } from "react";
import { Icon } from "iconsax-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  label: string;
  count?: number;
  icon?: Icon;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  equalWidth?: boolean;
  scrollable?: boolean;
  hideScrollbar?: boolean;
  paramName?: string;
}

function TabsContent({
  tabs,
  activeTab,
  onTabChange,
  equalWidth = true,
  hideScrollbar = true,
  paramName,
}: TabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (paramName) {
      const currentParam = searchParams.get(paramName);
      if (currentParam) {
        const tabExists = tabs.some((tab) => tab.id === currentParam);
        if (tabExists && currentParam !== activeTab) {
          onTabChange(currentParam);
        }
      }
    }
    // Only re-sync when the search params (URL) actually change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const activeTabIndex = useMemo(() => {
    const index = tabs.findIndex((tab) => tab.id === activeTab);
    return index === -1 ? 0 : index;
  }, [tabs, activeTab]);

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return;
    onTabChange(tabId);
    if (paramName) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(paramName, tabId);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  // Update indicator position based on active tab ref
  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTabIndex];
    if (activeTabElement) {
      setIndicatorStyle({
        width: activeTabElement.offsetWidth,
        left: activeTabElement.offsetLeft,
      });

      // Scroll active tab into view if container is scrollable
      activeTabElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTabIndex, tabs]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-x-auto",
        hideScrollbar ? "scrollbar-hide" : "scrollbar-show",
      )}
    >
      <div
        className={cn(
          "flex items-center border-b border-gray-100 w-full min-w-max px-1",
          equalWidth ? "justify-between" : "gap-4 md:gap-8",
        )}
      >
        {tabs.map((tab, index) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "flex items-center justify-center gap-2 pb-3 px-3 md:px-4 font-medium whitespace-nowrap transition-colors",
                equalWidth && "flex-1",
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              {TabIcon && (
                <TabIcon
                  size={20}
                  variant="Outline"
                  color={activeTab === tab.id ? "#1664E8" : "#777"}
                />
              )}
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    "ml-1 text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-500",
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}

        <div
          className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out"
          style={{
            width: `${indicatorStyle.width}px`,
            left: `${indicatorStyle.left}px`,
          }}
        />
      </div>
    </div>
  );
}

export default function Tabs(props: TabsProps) {
  return (
    <Suspense
      fallback={
        <div className="h-12 w-full bg-slate-50 animate-pulse rounded-lg" />
      }
    >
      <TabsContent {...props} />
    </Suspense>
  );
}
