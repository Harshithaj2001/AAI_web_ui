import { format } from "date-fns";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatYmdInNy } from "@/lib/timezone";
import type { EmployeePortalOutletContext } from "./types";
import { parseDaily } from "./utils";

const EmployeePortalHistoryPage = () => {
  const { rows } = useOutletContext<EmployeePortalOutletContext>();

  return (
    <Card className="border-slate-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Past timesheets</CardTitle>
        <CardDescription>Status, totals, and approval (official times in NY).</CardDescription>
      </CardHeader>
      <CardContent>
        {!rows?.length ? (
          <p className="text-sm text-muted-foreground">No timesheets yet. Use Timesheet to add a week.</p>
        ) : (
          <ul className="divide-y divide-slate-100 text-sm">
            {rows.map((r) => {
              const ws = String(r.week_start).slice(0, 10);
              const dailyObj = parseDaily(r.daily_entries);
              const hasDaily = Object.keys(dailyObj).length > 0;
              return (
                <li key={r.id} className="py-3 flex flex-col gap-1">
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="font-medium text-slate-800">
                      Week of {formatYmdInNy(ws)} <span className="text-muted-foreground font-normal">({ws})</span>
                    </span>
                    <span className="text-slate-500 uppercase text-xs font-bold">{r.status}</span>
                  </div>
                  <div className="text-slate-600">
                    Work total: {(r.hours ?? 0).toFixed(2)}h
                    {!hasDaily && (r.hours ?? 0) > 0 && <span className="text-amber-700"> · legacy single total</span>}
                  </div>
                  {hasDaily && (
                    <p className="text-xs text-muted-foreground">
                      {Object.entries(dailyObj)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([day, e]) => `${day}: ${e.type} ${e.type === "WORK" ? `${e.hours}h` : ""}`)
                        .join(" · ")}
                    </p>
                  )}
                  {r.approved_by_name && (
                    <p className="text-xs text-emerald-800">
                      Approved by {r.approved_by_name}
                      {r.approved_at ? ` · ${format(new Date(r.approved_at), "PPp")} (your device)` : ""}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeePortalHistoryPage;
