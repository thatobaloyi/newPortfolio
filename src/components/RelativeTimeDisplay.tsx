'use client';

import React, { useState, useMemo, useEffect } from 'react';

interface RelativeTimeDisplayProps {
  date: Date | string;
}

const formatRelativeTime = (publishedAt: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - publishedAt.getTime()) / 1000);

  // --- Handle Future/Scheduled Posts ---
  if (seconds < 0) {
    const minutes = Math.floor(Math.abs(seconds) / 60);
    if (minutes < 60) {
      return `Scheduled in ${minutes === 1 ? '1 minute' : `${minutes} minutes`}`;
    }
    const hours = Math.floor(Math.abs(seconds) / 3600);
    if (hours < 24) {
        return `Scheduled in ${hours === 1 ? '1 hour' : `${hours} hours`}`;
    }
    const days = Math.floor(Math.abs(seconds) / 86400);
    if (days < 30) {
        return `Scheduled in ${days} ${days === 1 ? 'day' : 'days'}`;
    }
    // For posts scheduled far in the future, display the exact date
    return `Scheduled for ${publishedAt.toLocaleDateString()}`;
  }

  // --- Handle Elapsed Time ("... ago") ---
  if (seconds < 60) {
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const hours = Math.floor(seconds / 3600);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  const days = Math.floor(seconds / 86400);
  if (days < 30) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  const months = Math.floor(days / 30); // Approximation
  if (months < 12) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }

  const years = Math.floor(days / 365);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
};


export const RelativeTimeDisplay: React.FC<RelativeTimeDisplayProps> = ({ date }) => {
  const publishedAt = useMemo(() => new Date(date), [date]);
  
  // State to hold the current relative time string
  const [relativeTime, setRelativeTime] = useState(() => formatRelativeTime(publishedAt));

  // Effect to update the relative time every minute
  useEffect(() => {
    // Initial call just to ensure we are up to date
    setRelativeTime(formatRelativeTime(publishedAt));

    // Set up an interval to update the time every 60 seconds (1 minute)
    const intervalId = setInterval(() => {
      setRelativeTime(formatRelativeTime(publishedAt));
    }, 60000); // 60,000 milliseconds = 1 minute

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [publishedAt]); // Dependency on 'date' ensures recalculation if the prop changes

  return (
    <time dateTime={publishedAt.toISOString()} className="text-sm text-gray-500">
      {relativeTime}
    </time>
  );
};