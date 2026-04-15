import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Bell } from "lucide-react";
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
  fetchAdminNotifications,
  markAdminNotificationRead,
  type AdminNotificationRow,
} from "@/lib/contactSubmissions";

export const ADMIN_NOTIFICATIONS_REFRESH_EVENT = "adminNotificationsRefresh";

export function requestAdminNotificationsRefresh() {
  window.dispatchEvent(new Event(ADMIN_NOTIFICATIONS_REFRESH_EVENT));
}

/**
 * Owner-only bell next to the account menu. Opens deep links into /admin (inbox row or timesheets).
 */
export function AdminNotificationsBell() {
  const { isOwner, loading, session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [items, setItems] = useState<AdminNotificationRow[] | null>(null);

  const load = useCallback(async () => {
    if (!isOwner || !session) return;
    const { data, error } = await fetchAdminNotifications(50);
    if (error) {
      toast({ title: "Could not load notifications", description: error, variant: "destructive" });
      setItems([]);
      return;
    }
    setItems(data ?? []);
  }, [isOwner, session, toast]);

  useEffect(() => {
    if (loading || !session || !isOwner) return;
    void load();
  }, [loading, session, isOwner, load]);

  useEffect(() => {
    const onRefresh = () => void load();
    window.addEventListener(ADMIN_NOTIFICATIONS_REFRESH_EVENT, onRefresh);
    return () => window.removeEventListener(ADMIN_NOTIFICATIONS_REFRESH_EVENT, onRefresh);
  }, [load]);

  const onPick = async (n: AdminNotificationRow) => {
    if (!n.read_at) {
      const { error } = await markAdminNotificationRead(n.id);
      if (!error) void load();
    }
    if (n.related_contact_submission_id) {
      navigate(`/admin?openSubmission=${encodeURIComponent(n.related_contact_submission_id)}`);
      return;
    }
    if (n.related_timesheet_id) {
      navigate("/admin?view=timesheets");
    }
  };

  if (!isOwner || !session) return null;

  const unreadCount = items?.filter((n) => !n.read_at).length ?? 0;

  return (
    <DropdownMenu onOpenChange={(open) => open && void load()}>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="icon" className="relative rounded-full shrink-0" aria-label="Admin notifications">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center px-1">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 max-h-80 overflow-y-auto">
        <DropdownMenuLabel>Admin notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!items?.length && <DropdownMenuItem disabled>No notifications yet.</DropdownMenuItem>}
        {items?.map((n) => (
          <DropdownMenuItem
            key={n.id}
            className="flex flex-col items-start gap-1 whitespace-normal"
            onClick={() => void onPick(n)}
          >
            <span className="font-semibold text-sm">{n.title}</span>
            {n.body && <span className="text-xs text-muted-foreground">{n.body}</span>}
            <span className="text-[10px] text-muted-foreground">{format(new Date(n.created_at), "PPp")}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
