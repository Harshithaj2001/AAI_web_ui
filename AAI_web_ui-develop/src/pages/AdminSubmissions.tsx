import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, CalendarClock, ChevronDown, Inbox, RefreshCw, Trash2, UserPlus, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import { requestAdminNotificationsRefresh } from "@/components/AdminNotificationsBell";
import { useAuth } from "@context/AuthContext";
import {
  deleteContactSubmission,
  fetchPortalSubmissions,
  fetchTeamMembers,
  updateSubmissionInternalNotes,
  setTeamMemberRole,
  type PortalSubmissionRow,
  type TeamMemberRow,
} from "@/lib/contactSubmissions";
import { inviteEmployeeByEmail } from "@/lib/inviteStaff";
import {
  approveTimesheet,
  listTimesheetsForOwner,
  ownerUpdateTimesheet,
  type TimesheetRow,
  type DailyEntriesMap,
} from "@/lib/timesheets";
import { getPortalMaxHoursPerDay, setPortalMaxHoursPerDay, adminUpdateEmployeeProfile } from "@/lib/portal";
import { formatYmdInNy } from "@/lib/timezone";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const sourceLabel: Record<string, string> = {
  contact_page: "Contact page",
  home_section: "Home form",
  modal: "Modal",
};

function displayName(row: PortalSubmissionRow): string {
  if (row.first_name || row.last_name) {
    return [row.first_name, row.last_name].filter(Boolean).join(" ").trim();
  }
  if (row.full_name?.trim()) return row.full_name.trim();
  return "—";
}

const AdminSubmissions = () => {
  const { toast } = useToast();
  const { loading, session, isOwner, isEmployee, user, signOut } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view");
  const tab: "inbox" | "team" | "timesheets" =
    view === "team" && isOwner ? "team" : view === "timesheets" && isOwner ? "timesheets" : "inbox";

  const [rows, setRows] = useState<PortalSubmissionRow[] | null>(null);
  const [team, setTeam] = useState<TeamMemberRow[] | null>(null);
  const [timesheets, setTimesheets] = useState<TimesheetRow[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteBusy, setInviteBusy] = useState(false);
  const [maxHoursDraft, setMaxHoursDraft] = useState("10");
  const [maxHoursSaving, setMaxHoursSaving] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [profileTargetEmail, setProfileTargetEmail] = useState("");
  const [profileNameAdm, setProfileNameAdm] = useState("");
  const [profilePhoneAdm, setProfilePhoneAdm] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);

  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<PortalSubmissionRow | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [notesSaving, setNotesSaving] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const loadSubmissions = useCallback(async () => {
    setLoadError(null);
    setRefreshing(true);
    const { data, error } = await fetchPortalSubmissions();
    setRefreshing(false);
    if (error) {
      setLoadError(error);
      setRows([]);
      return;
    }
    setRows(data ?? []);
  }, []);

  const loadTeam = useCallback(async () => {
    const { data, error } = await fetchTeamMembers();
    if (error) {
      toast({ title: "Team list failed", description: error, variant: "destructive" });
      setTeam([]);
      return;
    }
    setTeam(data ?? []);
  }, [toast]);

  const loadTimesheets = useCallback(async () => {
    const { data, error } = await listTimesheetsForOwner();
    if (error) {
      toast({ title: "Timesheets failed", description: error, variant: "destructive" });
      setTimesheets([]);
      return;
    }
    setTimesheets(data ?? []);
  }, [toast]);

  useEffect(() => {
    if (loading || !session || !isOwner) return;
    void loadSubmissions();
  }, [loading, session, isOwner, loadSubmissions]);

  useEffect(() => {
    if (tab === "team" && isOwner) void loadTeam();
    if (tab === "timesheets" && isOwner) void loadTimesheets();
  }, [tab, isOwner, loadTeam, loadTimesheets]);

  useEffect(() => {
    if (tab !== "timesheets" || !isOwner) return;
    void (async () => {
      const { data, error } = await getPortalMaxHoursPerDay();
      if (!error && data != null) setMaxHoursDraft(String(data));
    })();
  }, [tab, isOwner]);

  useEffect(() => {
    if (selected) setNotesDraft(selected.internal_notes ?? "");
  }, [selected]);

  const openSubmissionId = searchParams.get("openSubmission");

  useEffect(() => {
    if (!openSubmissionId || rows === null) return;

    const row = rows.find((r) => r.id === openSubmissionId);
    if (row) {
      setSelected(row);
      setNotesDraft(row.internal_notes ?? "");
      setDetailOpen(true);
    }

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("openSubmission");
        if (row) next.delete("view");
        return next;
      },
      { replace: true }
    );
  }, [rows, openSubmissionId, setSearchParams]);

  const counts = useMemo(() => ({ total: rows?.length ?? 0 }), [rows]);

  const setTab = (v: "inbox" | "team" | "timesheets") => {
    if (v === "team") setSearchParams({ view: "team" });
    else if (v === "timesheets") setSearchParams({ view: "timesheets" });
    else setSearchParams({});
  };

  const openRow = (row: PortalSubmissionRow) => {
    setSelected(row);
    setNotesDraft(row.internal_notes ?? "");
    setDetailOpen(true);
  };

  const openDeleteConfirm = (id: string) => {
    setPendingDeleteId(id);
  };

  const executeDeleteSubmission = async () => {
    const id = pendingDeleteId;
    if (!id) return;
    setDeleteBusy(true);
    const { error } = await deleteContactSubmission(id);
    setDeleteBusy(false);
    if (error) {
      toast({ title: "Delete failed", description: error, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted" });
    setPendingDeleteId(null);
    if (selected?.id === id) setDetailOpen(false);
    void loadSubmissions();
    requestAdminNotificationsRefresh();
  };

  const saveNotes = async () => {
    if (!selected) return;
    setNotesSaving(true);
    const { error } = await updateSubmissionInternalNotes(selected.id, notesDraft);
    setNotesSaving(false);
    if (error) {
      toast({ title: "Could not save notes", description: error, variant: "destructive" });
      return;
    }
    toast({ title: "Notes saved" });
    setSelected({ ...selected, internal_notes: notesDraft });
    void loadSubmissions();
  };

  const onInvite = async () => {
    if (!inviteEmail.trim()) {
      toast({ title: "Email required", variant: "destructive" });
      return;
    }
    setInviteBusy(true);
    const { error } = await inviteEmployeeByEmail(inviteEmail.trim());
    setInviteBusy(false);
    if (error) {
      toast({ title: "Invite failed", description: error, variant: "destructive" });
      return;
    }
    toast({
      title: "Invitation sent",
      description: "They will receive an email to set a password. Employees use the timesheet portal only.",
    });
    setInviteEmail("");
    void loadTeam();
  };

  const changeRole = async (email: string, role: "owner" | "employee") => {
    const { error } = await setTeamMemberRole(email, role);
    if (error) {
      toast({ title: "Could not update role", description: error, variant: "destructive" });
      return;
    }
    toast({ title: "Role updated" });
    void loadTeam();
  };

  const saveMaxHours = async () => {
    const v = Number.parseFloat(maxHoursDraft);
    if (!Number.isFinite(v) || v < 1 || v > 24) {
      toast({ title: "Invalid value", description: "Use a number between 1 and 24.", variant: "destructive" });
      return;
    }
    setMaxHoursSaving(true);
    const { error } = await setPortalMaxHoursPerDay(v);
    setMaxHoursSaving(false);
    if (error) {
      toast({ title: "Could not save", description: error, variant: "destructive" });
      return;
    }
    toast({ title: "Saved", description: "Max work hours per day updated." });
  };

  const openEmployeeProfile = (email: string) => {
    setProfileTargetEmail(email);
    setProfileNameAdm("");
    setProfilePhoneAdm("");
    setProfileDialogOpen(true);
  };

  const saveEmployeeProfileAdmin = async () => {
    if (!profileNameAdm.trim()) {
      toast({ title: "Name required", variant: "destructive" });
      return;
    }
    setProfileSaving(true);
    const { error } = await adminUpdateEmployeeProfile(profileTargetEmail, profileNameAdm.trim(), profilePhoneAdm.trim());
    setProfileSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error, variant: "destructive" });
      return;
    }
    toast({ title: "Profile updated" });
    setProfileDialogOpen(false);
  };

  if (!loading && !session) {
    return <Navigate to="/login" replace state={{ from: "/admin" }} />;
  }
  if (!loading && session && isEmployee) {
    return <Navigate to="/portal" replace />;
  }
  if (!loading && session && !isOwner) {
    return <Navigate to="/" replace />;
  }

  const selfEmail = user?.email?.toLowerCase() ?? "";

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-foreground overflow-x-hidden flex flex-col">
      <Navbar />

      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 pb-16 pt-6 sm:pt-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
          <aside className="hidden lg:flex flex-col w-56 shrink-0 gap-1 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm">
            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Portal</p>
            <button
              type="button"
              onClick={() => setTab("inbox")}
              className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                tab === "inbox" ? "bg-primary text-primary-foreground shadow-sm" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Inbox className="h-4 w-4 opacity-90" />
              Inbox
            </button>
            <button
              type="button"
              onClick={() => setTab("team")}
              className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                tab === "team" ? "bg-primary text-primary-foreground shadow-sm" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Users className="h-4 w-4 opacity-90" />
              Team
            </button>
            <button
              type="button"
              onClick={() => setTab("timesheets")}
              className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                tab === "timesheets" ? "bg-primary text-primary-foreground shadow-sm" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <CalendarClock className="h-4 w-4 opacity-90" />
              Timesheets
            </button>
            <div className="my-2 border-t border-slate-100" />
            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Public site
            </Link>
            <button
              type="button"
              onClick={() => void signOut()}
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 text-left"
            >
              Sign out
            </button>
          </aside>

          <div className="flex-1 min-w-0 space-y-4 sm:space-y-6">
            <div className="lg:hidden flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm gap-1">
              {(["inbox", "team", "timesheets"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`flex-1 rounded-lg py-2.5 text-xs font-semibold capitalize ${
                    tab === t ? "bg-primary text-primary-foreground shadow-sm" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {t === "inbox" ? "Inbox" : t}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-slate-900">
                  {tab === "team" ? "Team" : tab === "timesheets" ? "Timesheets" : "Inbox"}
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  {tab === "inbox" && "Open a row for full details and your private notes."}
                  {tab === "team" && "Invite employees and manage roles."}
                  {tab === "timesheets" && "Review submitted timesheets and approve."}
                </p>
              </div>
              {tab === "inbox" && (
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-semibold text-slate-600 tabular-nums">Total: {counts.total}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-200 bg-white"
                    onClick={() => void loadSubmissions()}
                    disabled={refreshing}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </div>
              )}
            </div>

            {tab === "inbox" && (
              <>
                {loadError && (
                  <Card className="border-red-200 bg-red-50/50 shadow-sm">
                    <CardHeader className="py-4">
                      <CardTitle className="text-red-800 text-base">Could not load data</CardTitle>
                      <CardDescription className="text-red-700/90">{loadError}</CardDescription>
                    </CardHeader>
                  </Card>
                )}

                <Card className="border-slate-200/90 shadow-md overflow-hidden bg-white">
                  <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
                    <CardTitle className="text-lg text-slate-900">Inbox</CardTitle>
                    <CardDescription>
                      {rows === null ? "Loading…" : `${rows.length} message${rows.length === 1 ? "" : "s"}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    {rows && rows.length === 0 && !loadError && (
                      <div className="flex flex-col items-center justify-center py-16 text-slate-400 px-4">
                        <Inbox className="h-12 w-12 mb-3 opacity-35" />
                        <p className="text-sm font-medium text-slate-600">No messages yet</p>
                      </div>
                    )}

                    {rows && rows.length > 0 && (
                      <>
                        <ul className="md:hidden divide-y divide-slate-100">
                          {rows.map((row) => (
                            <li key={row.id}>
                              <button
                                type="button"
                                onClick={() => openRow(row)}
                                className="w-full text-left p-4 space-y-1 hover:bg-slate-50/80 transition-colors"
                              >
                                <p className="text-[11px] text-slate-400">
                                  {format(new Date(row.created_at), "MMM d, yyyy h:mm a")}
                                </p>
                                <p className="font-semibold text-slate-900 text-sm">{displayName(row)}</p>
                                <p className="text-sm text-primary break-all">{row.email}</p>
                                <p className="text-xs text-slate-500">{row.company ?? "—"}</p>
                              </button>
                              <div className="px-4 pb-3 flex justify-end">
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="outline"
                                  className="h-9 w-9 text-destructive border-destructive/30 hover:bg-destructive/5"
                                  aria-label="Delete submission"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openDeleteConfirm(row.id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </li>
                          ))}
                        </ul>

                        <div className="hidden md:block w-full overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 border-slate-100">
                                <TableHead className="text-slate-600 font-semibold">Time</TableHead>
                                <TableHead className="text-slate-600 font-semibold">Name</TableHead>
                                <TableHead className="text-slate-600 font-semibold">Email</TableHead>
                                <TableHead className="text-slate-600 font-semibold">Company</TableHead>
                                <TableHead className="text-right text-slate-600 font-semibold">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {rows.map((row) => (
                                <TableRow
                                  key={row.id}
                                  className="cursor-pointer border-slate-100 hover:bg-slate-50/60"
                                  onClick={() => openRow(row)}
                                >
                                  <TableCell className="text-xs text-slate-500 whitespace-nowrap">
                                    {format(new Date(row.created_at), "MMM d, yyyy h:mm a")}
                                  </TableCell>
                                  <TableCell className="text-sm font-medium text-slate-800">{displayName(row)}</TableCell>
                                  <TableCell className="text-sm text-primary break-all">{row.email}</TableCell>
                                  <TableCell className="text-sm text-slate-600">{row.company ?? "—"}</TableCell>
                                  <TableCell className="text-right">
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="outline"
                                      className="h-8 w-8 text-destructive border-destructive/30 hover:bg-destructive/5"
                                      aria-label="Delete submission"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openDeleteConfirm(row.id);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            {tab === "team" && (
              <div className="space-y-6">
                <Card className="border-slate-200/90 shadow-md bg-white">
                  <CardHeader className="border-b border-slate-100">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <UserPlus className="h-5 w-5 text-primary" />
                      Invite employee
                    </CardTitle>
                    <CardDescription>
                      Sends a Supabase invite email. Deploy the <code className="text-xs bg-slate-100 px-1 rounded">invite-staff</code> Edge Function.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-end max-w-xl">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="invite-email">Email address</Label>
                        <Input
                          id="invite-email"
                          type="email"
                          placeholder="colleague@company.com"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          className="bg-white"
                        />
                      </div>
                      <Button type="button" className="shrink-0 w-full sm:w-auto" disabled={inviteBusy} onClick={() => void onInvite()}>
                        {inviteBusy ? "Sending…" : "Send invite"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200/90 shadow-md bg-white">
                  <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">People</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => void loadTeam()}>
                      Refresh
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {!team || team.length === 0 ? (
                      <p className="text-sm text-slate-500 py-4">No entries loaded.</p>
                    ) : (
                      <ul className="divide-y divide-slate-100">
                        {team.map((m) => {
                          const roleNorm = m.role === "staff" ? "employee" : m.role;
                          return (
                          <li
                            key={m.email}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3"
                          >
                            <span className="text-sm font-medium text-slate-800 break-all">{m.email}</span>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-bold uppercase text-slate-500">{roleNorm}</span>
                              {(roleNorm === "employee" || m.role === "staff") && (
                                <Button type="button" size="sm" variant="secondary" onClick={() => openEmployeeProfile(m.email)}>
                                  Profile
                                </Button>
                              )}
                              {(roleNorm === "employee" || m.role === "staff") && (
                                <Button type="button" size="sm" variant="outline" onClick={() => void changeRole(m.email, "owner")}>
                                  Make owner
                                </Button>
                              )}
                              {roleNorm === "owner" && m.email.toLowerCase() !== selfEmail && (
                                <Button type="button" size="sm" variant="outline" onClick={() => void changeRole(m.email, "employee")}>
                                  Make employee
                                </Button>
                              )}
                            </div>
                          </li>
                          );
                        })}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {tab === "timesheets" && (
              <Card className="border-slate-200/90 shadow-md bg-white overflow-hidden">
                <CardHeader className="flex flex-col gap-4 border-b border-slate-100 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-lg">Employee timesheets</CardTitle>
                    <CardDescription className="mt-1">
                      Official week dates use America/New_York. Approver name is stored when a timesheet is approved.
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap items-end gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Max work hours / day</Label>
                      <div className="flex gap-1">
                        <Input
                          className="h-9 w-20"
                          type="number"
                          min={1}
                          max={24}
                          step={0.25}
                          value={maxHoursDraft}
                          onChange={(e) => setMaxHoursDraft(e.target.value)}
                        />
                        <Button type="button" size="sm" disabled={maxHoursSaving} onClick={() => void saveMaxHours()}>
                          {maxHoursSaving ? "…" : "Save"}
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => void loadTimesheets()}>
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {!timesheets || timesheets.length === 0 ? (
                    <p className="text-sm text-slate-500 p-6">No timesheets yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Week (NY)</TableHead>
                            <TableHead>Work hrs</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Approver</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {timesheets.map((t) => (
                            <TimesheetOwnerRow key={t.id} row={t} onChanged={() => void loadTimesheets()} />
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <p className="mt-10 text-center text-[11px] text-slate-400">
          AA Innovation · Owner portal ·{" "}
          <Link to="/" className="underline hover:text-slate-600">
            Return to website
          </Link>
        </p>
      </div>

      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Employee profile</DialogTitle>
            <DialogDescription className="break-all">{profileTargetEmail}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <Label htmlFor="adm-prof-name">Display name</Label>
              <Input id="adm-prof-name" value={profileNameAdm} onChange={(e) => setProfileNameAdm(e.target.value)} placeholder="Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adm-prof-phone">Phone</Label>
              <Input id="adm-prof-phone" value={profilePhoneAdm} onChange={(e) => setProfilePhoneAdm(e.target.value)} placeholder="Phone" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setProfileDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" disabled={profileSaving} onClick={() => void saveEmployeeProfileAdmin()}>
              {profileSaving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => {
          if (!open && !deleteBusy) setPendingDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this submission?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove it from your inbox. You cannot undo this action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteBusy}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({ variant: "destructive" })}
              disabled={deleteBusy}
              onClick={(e) => {
                e.preventDefault();
                void executeDeleteSubmission();
              }}
            >
              {deleteBusy ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{displayName(selected)}</SheetTitle>
                <SheetDescription>{selected.email}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4 text-sm">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Received</p>
                  <p className="text-slate-800">{format(new Date(selected.created_at), "PPpp")}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Company</p>
                  <p className="text-slate-800">{selected.company ?? "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Phone</p>
                  <p className="text-slate-800">{selected.phone ?? "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Source</p>
                  <p className="text-slate-800">{sourceLabel[selected.form_source] ?? selected.form_source}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Message</p>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{selected.message ?? "—"}</p>
                </div>
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <Label htmlFor="internal-notes">Your notes (private)</Label>
                  <Textarea
                    id="internal-notes"
                    rows={5}
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    placeholder="Call notes, follow-ups…"
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <Button type="button" size="sm" onClick={() => void saveNotes()} disabled={notesSaving}>
                      {notesSaving ? "Saving…" : "Save notes"}
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 text-destructive border-destructive/30 hover:bg-destructive/5"
                      aria-label="Delete submission"
                      onClick={() => openDeleteConfirm(selected.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

function TimesheetOwnerRow({ row, onChanged }: { row: TimesheetRow; onChanged: () => void }) {
  const { toast } = useToast();
  const [hours, setHours] = useState(String(row.hours));
  const [notes, setNotes] = useState(row.entry_notes ?? "");
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setHours(String(row.hours));
    setNotes(row.entry_notes ?? "");
  }, [row]);

  const canOwnerEdit = row.status === "submitted" || row.status === "approved";
  const ws = String(row.week_start).slice(0, 10);
  const daily = (row.daily_entries ?? {}) as DailyEntriesMap;
  const dailyLines = Object.keys(daily)
    .sort()
    .map((d) => `${d}: ${daily[d]?.type ?? "?"}${daily[d]?.type === "WORK" ? ` ${daily[d]?.hours}h` : ""}`);

  const saveOwner = async () => {
    const h = Number.parseFloat(hours);
    if (Number.isNaN(h) || h < 0 || h > 168) {
      toast({ title: "Invalid hours", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { error } = await ownerUpdateTimesheet(row.id, h, notes, null);
    setBusy(false);
    if (error) {
      toast({ title: "Save failed", description: error, variant: "destructive" });
      return;
    }
    toast({ title: "Updated" });
    onChanged();
  };

  const approve = async () => {
    setBusy(true);
    const { error } = await approveTimesheet(row.id);
    setBusy(false);
    if (error) {
      toast({ title: "Approve failed", description: error, variant: "destructive" });
      return;
    }
    toast({ title: "Approved" });
    onChanged();
  };

  return (
    <TableRow>
      <TableCell className="text-sm break-all">{row.user_email}</TableCell>
      <TableCell className="text-sm whitespace-nowrap">
        <span className="block">{formatYmdInNy(ws)}</span>
        <span className="text-[11px] text-muted-foreground">{ws}</span>
      </TableCell>
      <TableCell className="min-w-[140px]">
        <Input
          className="h-8"
          type="number"
          min={0}
          max={168}
          step={0.25}
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          disabled={!canOwnerEdit}
        />
        {dailyLines.length > 0 && (
          <Collapsible open={open} onOpenChange={setOpen} className="mt-2">
            <CollapsibleTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
                Daily breakdown
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="text-[11px] text-slate-600 whitespace-pre-wrap leading-snug mt-1 max-w-[220px]">{dailyLines.join("\n")}</p>
            </CollapsibleContent>
          </Collapsible>
        )}
      </TableCell>
      <TableCell className="text-xs uppercase text-slate-500">{row.status}</TableCell>
      <TableCell className="text-xs text-slate-700 max-w-[140px]">
        {row.approved_by_name ? (
          <>
            <span className="font-medium">{row.approved_by_name}</span>
            {row.approved_at && (
              <span className="block text-[10px] text-muted-foreground mt-0.5">{format(new Date(row.approved_at), "PPp")}</span>
            )}
          </>
        ) : (
          "—"
        )}
      </TableCell>
      <TableCell className="text-right space-y-2">
        {row.status === "submitted" && (
          <Button type="button" size="sm" disabled={busy} onClick={() => void approve()}>
            Approve
          </Button>
        )}
        {canOwnerEdit && (
          <div className="flex flex-col items-end gap-1">
            <Textarea className="min-h-[56px] w-48 text-xs" value={notes} onChange={(e) => setNotes(e.target.value)} />
            <Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => void saveOwner()}>
              Save
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}

export default AdminSubmissions;
