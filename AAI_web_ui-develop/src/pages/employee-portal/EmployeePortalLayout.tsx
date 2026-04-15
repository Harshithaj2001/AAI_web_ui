import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Bell, CalendarDays, History, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  fetchMyTimesheets,
  submitMyTimesheet,
  saveMyTimesheetDraft,
  type TimesheetRow,
  type DayType,
  type DailyEntriesMap,
} from "@/lib/timesheets";
import {
  fetchMyEmployeeProfile,
  saveMyEmployeeProfile,
  fetchMyNotifications,
  getPortalMaxHoursPerDay,
  markMyNotificationRead,
  type EmployeeProfile,
  type EmployeeNotification,
} from "@/lib/portal";
import { todayYmdInNy } from "@/lib/timezone";
import type { EmployeePortalOutletContext } from "./types";
import { emptyWeekEntries, mondayOfWeekContaining, parseDaily, weekDates, ymd } from "./utils";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
    isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

const EmployeePortalLayout = () => {
  const { toast } = useToast();
  const { loading, session, isEmployee, isOwner, user } = useAuth();
  const [rows, setRows] = useState<TimesheetRow[] | null>(null);
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [maxHours, setMaxHours] = useState(10);
  const [notifications, setNotifications] = useState<EmployeeNotification[] | null>(null);
  const [weekAnchor, setWeekAnchor] = useState(() => mondayOfWeekContaining(new Date()));
  const [daily, setDaily] = useState<DailyEntriesMap>({});
  const [entryNotes, setEntryNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");

  const weekStartStr = useMemo(() => ymd(weekAnchor), [weekAnchor]);
  const dates = useMemo(() => weekDates(weekAnchor), [weekAnchor]);
  const nyToday = useMemo(() => todayYmdInNy(), []);

  const currentRow = useMemo(() => {
    if (!rows) return null;
    return rows.find((r) => String(r.week_start).slice(0, 10) === weekStartStr) ?? null;
  }, [rows, weekStartStr]);

  const loadAll = useCallback(async () => {
    const [{ data: ts, error: e1 }, { data: prof, error: e2 }, { data: mx, error: e3 }, { data: notif, error: e4 }] =
      await Promise.all([
        fetchMyTimesheets(),
        fetchMyEmployeeProfile(),
        getPortalMaxHoursPerDay(),
        fetchMyNotifications(50),
      ]);
    if (e1) toast({ title: "Could not load timesheets", description: e1, variant: "destructive" });
    if (e2) toast({ title: "Could not load profile", description: e2, variant: "destructive" });
    if (e3) toast({ title: "Could not load limits", description: e3, variant: "destructive" });
    if (e4) toast({ title: "Could not load notifications", description: e4, variant: "destructive" });
    setRows(ts ?? []);
    setProfile(prof);
    if (typeof mx === "number" && mx > 0) setMaxHours(mx);
    setNotifications(notif ?? []);
  }, [toast]);

  useEffect(() => {
    if (loading || !session || !isEmployee) return;
    void loadAll();
  }, [loading, session, isEmployee, loadAll]);

  useEffect(() => {
    if (profile) {
      setProfileName(profile.display_name ?? "");
      setProfilePhone(profile.phone ?? "");
    }
  }, [profile]);

  useEffect(() => {
    if (!dates.length) return;
    const parsed = currentRow ? parseDaily(currentRow.daily_entries) : {};
    const keys = Object.keys(parsed);
    if (keys.length === 0 && currentRow && (currentRow.hours ?? 0) > 0) {
      setDaily(emptyWeekEntries(dates));
      setEntryNotes(currentRow.entry_notes ?? "");
      return;
    }
    if (keys.length === 0) {
      setDaily(emptyWeekEntries(dates));
      setEntryNotes(currentRow?.entry_notes ?? "");
      return;
    }
    const next: DailyEntriesMap = { ...emptyWeekEntries(dates) };
    for (const d of dates) {
      if (parsed[d]) next[d] = { type: parsed[d].type, hours: Number(parsed[d].hours) || 0 };
    }
    setDaily(next);
    setEntryNotes(currentRow?.entry_notes ?? "");
  }, [currentRow, dates, weekStartStr]);

  const workWeekTotal = useMemo(() => {
    return dates.reduce((acc, d) => {
      const e = daily[d];
      if (e?.type === "WORK") return acc + (Number(e.hours) || 0);
      return acc;
    }, 0);
  }, [daily, dates]);

  const openNotification = useCallback(
    async (n: EmployeeNotification) => {
      if (!n.read_at) {
        await markMyNotificationRead(n.id);
        void loadAll();
      }
    },
    [loadAll]
  );

  if (!loading && !session) {
    return <Navigate to="/login" replace state={{ from: "/portal" }} />;
  }
  if (!loading && isOwner) {
    return <Navigate to="/admin" replace />;
  }
  if (!loading && session && !isEmployee) {
    return <Navigate to="/" replace />;
  }

  const status = currentRow?.status ?? "draft";
  const readOnly = status === "submitted" || status === "approved";
  const legacyWeek =
    !!currentRow &&
    (!currentRow.daily_entries || Object.keys(parseDaily(currentRow.daily_entries)).length === 0) &&
    (currentRow.hours ?? 0) > 0;

  const unreadCount = notifications?.filter((n) => !n.read_at).length ?? 0;

  const setDay = (dateKey: string, patch: Partial<{ type: DayType; hours: number }>) => {
    setDaily((prev) => {
      const cur = prev[dateKey] ?? { type: "OFF" as DayType, hours: 0 };
      let type = patch.type ?? cur.type;
      let hours = patch.hours !== undefined ? patch.hours : cur.hours;
      if (type !== "WORK") hours = 0;
      if (dateKey > nyToday && type === "WORK" && hours > 0) {
        type = "PTO";
        hours = 0;
      }
      return { ...prev, [dateKey]: { type, hours } };
    });
  };

  const buildPayload = (): DailyEntriesMap => {
    const out: DailyEntriesMap = {};
    for (const d of dates) {
      const e = daily[d] ?? { type: "OFF" as DayType, hours: 0 };
      out[d] = { type: e.type, hours: e.type === "WORK" ? e.hours : 0 };
    }
    return out;
  };

  const onSaveDraft = async () => {
    setBusy(true);
    const { error } = await saveMyTimesheetDraft(weekStartStr, buildPayload(), entryNotes);
    setBusy(false);
    if (error) {
      toast({
        title: "Could not save",
        description: error.includes("contact your manager")
          ? error
          : `${error} If you believe this is a mistake, contact your manager.`,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Saved", description: "Draft updated." });
    void loadAll();
  };

  const onSubmitWeek = async () => {
    setBusy(true);
    const { error: saveErr } = await saveMyTimesheetDraft(weekStartStr, buildPayload(), entryNotes);
    if (saveErr) {
      setBusy(false);
      toast({ title: "Fix errors before submit", description: saveErr, variant: "destructive" });
      return;
    }
    const { error } = await submitMyTimesheet(weekStartStr);
    setBusy(false);
    if (error) {
      toast({
        title: "Submit failed",
        description: error.includes("complete all") ? error : `${error} Contact your manager if you need help.`,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Submitted", description: "Your manager can review and approve." });
    void loadAll();
  };

  const onSaveProfile = async () => {
    setBusy(true);
    const { data, error } = await saveMyEmployeeProfile(profileName, profilePhone);
    setBusy(false);
    if (error) {
      toast({ title: "Profile not saved", description: error, variant: "destructive" });
      return;
    }
    if (data) setProfile(data);
    toast({ title: "Profile saved", description: "Your name and phone are now locked; ask a manager to change them later." });
  };

  const authEmail = user?.email ?? profile?.user_email ?? "";

  const outletContext: EmployeePortalOutletContext = {
    user,
    authEmail,
    profile,
    profileName,
    profilePhone,
    setProfileName,
    setProfilePhone,
    busy,
    onSaveProfile,
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
    rows,
    notifications,
    openNotification,
    unreadCount,
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row max-w-6xl mx-auto w-full px-3 sm:px-4 py-6 gap-6">
        <aside className="shrink-0 md:w-56">
          <div className="md:sticky md:top-24 space-y-1 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            <p className="px-2 pt-1 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Employee portal</p>
            <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-0.5 px-0.5">
              <NavLink to="/portal/timesheet" className={navClass}>
                <CalendarDays className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">Timesheet</span>
              </NavLink>
              <NavLink to="/portal/profile" className={navClass}>
                <User className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">Profile</span>
              </NavLink>
              <NavLink to="/portal/history" className={navClass}>
                <History className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">History</span>
              </NavLink>
              <NavLink to="/portal/notifications" className={navClass}>
                <Bell className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">Notifications</span>
                {unreadCount > 0 && (
                  <span className="ml-auto rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary md:ml-0 md:mt-0">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </NavLink>
            </nav>
          </div>
        </aside>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all"
            >
              <ArrowLeft size={16} /> Back to site
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" size="icon" className="relative rounded-full shrink-0" aria-label="Notifications menu">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center px-1">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 max-h-80 overflow-y-auto">
                <DropdownMenuLabel>In-app notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {!notifications?.length && <DropdownMenuItem disabled>No notifications yet.</DropdownMenuItem>}
                {notifications?.map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    className="flex flex-col items-start gap-1 whitespace-normal"
                    onClick={() => void openNotification(n)}
                  >
                    <span className="font-semibold text-sm">{n.title}</span>
                    {n.body && <span className="text-xs text-muted-foreground">{n.body}</span>}
                    <span className="text-[10px] text-muted-foreground">{format(new Date(n.created_at), "PPp")}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Outlet context={outletContext} />
        </div>
      </div>
    </div>
  );
};

export default EmployeePortalLayout;
