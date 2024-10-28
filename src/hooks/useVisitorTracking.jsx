import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const useUniqueVisitorTracker = () => {
  const [uniqueVisitors, setUniqueVisitors] = useState({
    daily: [],
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

      let updatedDaily = [];
      let updatedWeekly = 0;
      let updatedMonthly = 0;

      // Process last 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split("T")[0];
        const isVisited = visitorData[dateString] ? 1 : 0;
        updatedDaily.unshift({ x: dateString, y: isVisited });
      }

      if (!visitorData[today]) {
        visitorData[today] = true;
        updatedDaily[updatedDaily.length - 1].y = 1;
      }

      if (!visitorData[`week_${thisWeek}`]) {
        visitorData[`week_${thisWeek}`] = true;
        updatedWeekly = 1;
      }

      if (!visitorData[`month_${thisMonth}`]) {
        visitorData[`month_${thisMonth}`] = true;
        updatedMonthly = 1;
      }

      localStorage.setItem("visitorData", JSON.stringify(visitorData));

      setUniqueVisitors({
        daily: updatedDaily,
        weekly: updatedWeekly,
        monthly: updatedMonthly,
      });
    };

    const cleanUpOldData = () => {
      const visitorData = JSON.parse(localStorage.getItem("visitorData")) || {};
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );

      Object.keys(visitorData).forEach((key) => {
        if (key.startsWith("20") && new Date(key) < oneMonthAgo) {
          delete visitorData[key];
        }
      });

      localStorage.setItem("visitorData", JSON.stringify(visitorData));
    };

    trackVisitor();
    cleanUpOldData();
  }, []); // Empty dependency array ensures this runs only once per page load

  return uniqueVisitors;
};

// Helper function to get the week number (unchanged)
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
