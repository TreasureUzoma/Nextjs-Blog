"use client";

import dynamic from "next/dynamic";

const Analytics = dynamic(() => import("supametrics"), {
  ssr: false,
});

export default function Template({ children }) {
  return (
    <div>
      {children}
      <Analytics
        url="https://supametrics-go-server.onrender.com"
        client="supm_2d9d2d3aadf1bacdf5677e0a3d2fa22a"
      />
    </div>
  );
}
