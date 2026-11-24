"use client";
import { useSyncExternalStore } from "react";
import { useAppSelector } from "@/redux";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const Greetings = () => {
  const isClient = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const user = useAppSelector((state) => state.auth.user);
  const firstName = user?.first_name || "there";

  if (!isClient) return null;

  return (
    <h2 className="text-[#636363] text-2xl">
      {getGreeting()} {firstName}, 👋
    </h2>
  );
};

export default Greetings;
