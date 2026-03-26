import { useState, useEffect } from "react";

const DateTimeDisplay = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 glass rounded-lg px-4 py-2 font-mono text-xs text-muted-foreground">
      <div className="text-primary font-semibold text-sm">
        {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </div>
      <div>{now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}</div>
    </div>
  );
};

export default DateTimeDisplay;
