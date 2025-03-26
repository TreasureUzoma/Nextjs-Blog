"use client";
import React, { useEffect, useState } from "react";
import { incrementPageMetrics } from "@/actions/view-count";

const ViewCounter = ({ slug, noCount = false, showCount = true }) => {
  const [views, setViews] = useState(0);
  const [uniqueViews, setUniqueViews] = useState(0);

  useEffect(() => {
    const fetchAndIncrementViews = async () => {
      const response = await incrementPageMetrics(slug);

      if (response && response.success) {
        setViews(response.page_views);
        setUniqueViews(response.unique_views);
      } else {
        console.error("Error updating page metrics:", response?.error);
      }
    };

    if (!noCount) {
      fetchAndIncrementViews();
    }
  }, [slug, noCount]);

  if (showCount) {
    return (
      <div>{views} views</div>
    );
  } else {
    return null;
  }
};

export default ViewCounter;
