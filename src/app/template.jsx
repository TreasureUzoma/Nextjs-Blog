// app/template.tsx
import dynamic from "next/dynamic";

const Analytics = dynamic(() => import("supametrics"), {
  ssr: false,
});

export default function Template({ children }) {
  return (
    <div>
      {children}
      <Analytics
        url="https://supametrics-go-server.onrender.com/api/v1/analytics/log"
        client="supm_11a44d6ab609bd02eeb17cb0ab83afc1"
      />
    </div>
  );
}
