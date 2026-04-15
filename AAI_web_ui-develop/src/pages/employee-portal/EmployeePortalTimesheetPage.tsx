import { useOutletContext } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DayType } from "@/lib/timesheets";
import { formatLocalSameYmd, formatYmdInNy } from "@/lib/timezone";
import type { EmployeePortalOutletContext } from "./types";
import { mondayOfWeekContaining } from "./utils";

const EmployeePortalTimesheetPage = () => {
  const {
    weekAnchor,
    setWeekAnchor,
    weekStartStr,
    dates,
    nyToday,
    daily,
    setDay,
    entryNotes,
    setEntryNotes,
    maxHours,
    currentRow,
    status,
    readOnly,
    legacyWeek,
    workWeekTotal,
    onSaveDraft,
    onSubmitWeek,
    busy,
  } = useOutletContext<EmployeePortalOutletContext>();

  return (
    <Card className="border-slate-200 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calendar className="h-5 w-5 text-primary" />
          Weekly timesheet
        </CardTitle>
        <CardDescription>
          Fill Monday–Sunday before submit. Up to {maxHours} work hours per day (set by your manager). You cannot log{" "}
          <strong>work</strong> hours on future calendar days (NY time); use PTO/off for those days. Totals shown are work hours
          only.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>Week (any day in the week — we anchor Monday)</Label>
          <Input
            type="date"
            value={format(weekAnchor, "yyyy-MM-dd")}
            onChange={(e) => {
              const v = e.target.value;
              if (!v) return;
              setWeekAnchor(mondayOfWeekContaining(new Date(v + "T12:00:00")));
            }}
            disabled={readOnly}
          />
          <p className="text-xs text-muted-foreground">
            Week starts {formatYmdInNy(weekStartStr)} (NY) · {formatLocalSameYmd(weekStartStr)} (local)
          </p>
        </div>

        {legacyWeek && currentRow && (
          <div className="rounded-md border border-amber-200 bg-amber-50 text-amber-900 text-sm p-3">
            This week was saved in the previous format (total {currentRow.hours}h). Please enter each day below; your manager can
            still see the old total until you save a new draft.
          </div>
        )}

        <div className="space-y-3">
          {dates.map((d) => {
            const entry = daily[d] ?? { type: "OFF" as DayType, hours: 0 };
            const isFutureNy = d > nyToday;
            const workDisabled = readOnly || isFutureNy;
            return (
              <div
                key={d}
                className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 border-b border-slate-100 pb-3 last:border-0"
              >
                <div className="sm:w-44 shrink-0">
                  <p className="text-sm font-medium text-slate-800">{formatYmdInNy(d)}</p>
                  <p className="text-xs text-muted-foreground">Local: {formatLocalSameYmd(d)}</p>
                  {isFutureNy && <p className="text-[11px] text-amber-700 mt-1">Future (NY): no work hours</p>}
                </div>
                <div className="flex-1 flex flex-wrap gap-3 items-end">
                  <div className="space-y-1 min-w-[140px]">
                    <Label className="text-xs">Day type</Label>
                    <Select value={entry.type} onValueChange={(v) => setDay(d, { type: v as DayType })} disabled={readOnly}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WORK">Work</SelectItem>
                        <SelectItem value="PTO">PTO / leave</SelectItem>
                        <SelectItem value="OFF">Off</SelectItem>
                        <SelectItem value="HOLIDAY">Holiday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1 w-28">
                    <Label className="text-xs">Hours</Label>
                    <Input
                      type="number"
                      min={0}
                      max={maxHours}
                      step={0.25}
                      value={entry.type === "WORK" ? entry.hours : 0}
                      onChange={(e) => setDay(d, { hours: Number.parseFloat(e.target.value) || 0 })}
                      disabled={readOnly || entry.type !== "WORK" || workDisabled}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Work hours this week</span>
          <span className="font-semibold">{workWeekTotal.toFixed(2)}h</span>
        </div>

        <div className="space-y-2">
          <Label>Week notes (optional)</Label>
          <Textarea
            rows={3}
            value={entryNotes}
            onChange={(e) => setEntryNotes(e.target.value)}
            disabled={readOnly}
            placeholder="Optional context for your manager…"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500 px-1 py-1">
            Status: <span className="text-slate-800">{status}</span>
          </span>
          {currentRow?.approved_by_name && (
            <span className="text-xs text-slate-600">
              Approved by {currentRow.approved_by_name}
              {currentRow.approved_at ? ` · ${format(new Date(currentRow.approved_at), "PPp")}` : ""}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button type="button" variant="secondary" disabled={busy || readOnly} onClick={() => void onSaveDraft()}>
            <Save className="h-4 w-4 mr-2" />
            Save draft
          </Button>
          <Button type="button" disabled={busy || readOnly || status !== "draft"} onClick={() => void onSubmitWeek()}>
            <Send className="h-4 w-4 mr-2" />
            Submit week
          </Button>
        </div>
        {readOnly && (
          <p className="text-sm text-muted-foreground border-t pt-3">
            This week is no longer editable. Contact your manager if you need a correction.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeePortalTimesheetPage;
