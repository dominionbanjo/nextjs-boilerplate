import { describe, it, expect } from "vitest";
import { timeAgo } from "@/utils/timeAgo";

describe("timeAgo Utility Unit Tests", () => {
  it("1. should return just now for current time", () => {
    const now = new Date();
    expect(timeAgo(now)).toBe("just now");
  });

  it("2. should return minutes ago correctly", () => {
    const minutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    expect(timeAgo(minutesAgo)).toBe("5 minutes ago");
  });

  it("3. should return hours ago correctly", () => {
    const hoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
    expect(timeAgo(hoursAgo)).toBe("3 hours ago");
  });

  it("4. should return days ago correctly", () => {
    const daysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    expect(timeAgo(daysAgo)).toBe("2 days ago");
  });

  it("5. should return weeks ago correctly", () => {
    const weeksAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    expect(timeAgo(weeksAgo)).toBe("1 week ago");
  });
});
