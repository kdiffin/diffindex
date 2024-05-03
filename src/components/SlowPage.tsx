"use client";
// pages/slow-page.js
import { useEffect, useState } from "react";

export default function SlowPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Slow Page</h1>
          <p>This page took 4 seconds to load.</p>
        </div>
      )}
    </div>
  );
}
