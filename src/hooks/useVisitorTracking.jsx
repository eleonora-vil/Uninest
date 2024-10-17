import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const useUniqueVisitorTracker = () => {
  const [uniqueVisitors, setUniqueVisitors] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
  });

  useEffect(() => {
    const trackVisitor = () => {
      const now = new Date();
      const today = now.toISOString().split("T")[0];
      const thisWeek = getWeekNumber(now);
      const thisMonth = now.getMonth();

      let visitorId = localStorage.getItem("visitorId");
      if (!visitorId) {
        visitorId = uuidv4();
        localStorage.setItem("visitorId", visitorId);
      }

      let visitorData = JSON.parse(localStorage.getItem("visitorData")) || {};

      if (!visitorData[today]) {
        visitorData[today] = true;
        setUniqueVisitors((prev) => ({ ...prev, daily: prev.daily + 1 }));
      }

      if (!visitorData[`week_${thisWeek}`]) {
        visitorData[`week_${thisWeek}`] = true;
        setUniqueVisitors((prev) => ({ ...prev, weekly: prev.weekly + 1 }));
      }

      if (!visitorData[`month_${thisMonth}`]) {
        visitorData[`month_${thisMonth}`] = true;
        setUniqueVisitors((prev) => ({ ...prev, monthly: prev.monthly + 1 }));
      }

      localStorage.setItem("visitorData", JSON.stringify(visitorData));
    };

    trackVisitor();

    // Clean up old data
    const cleanUpOldData = () => {
      const visitorData = JSON.parse(localStorage.getItem("visitorData")) || {};
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );

      Object.keys(visitorData).forEach((key) => {
        if (new Date(key) < oneMonthAgo) {
          delete visitorData[key];
        }
      });

      localStorage.setItem("visitorData", JSON.stringify(visitorData));
    };

    cleanUpOldData();
  }, []);

  return uniqueVisitors;
};

// Helper function to get the week number
const getWeekNumber = (date) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

export default useUniqueVisitorTracker;
