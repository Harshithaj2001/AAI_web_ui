import { format } from "date-fns";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import type { EmployeePortalOutletContext } from "./types";
import type { EmployeeNotification } from "@/lib/portal";

const EmployeePortalNotificationsPage = () => {
  const { notifications, openNotification, unreadCount } = useOutletContext<EmployeePortalOutletContext>();

  const onOpen = (n: EmployeeNotification) => {
    void openNotification(n);
  };

  return (
    <Card className="border-slate-200 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Bell className="h-5 w-5 text-primary" />
          Notifications
        </CardTitle>
        <CardDescription>
          In-app only (no email from this portal). {unreadCount > 0 ? `${unreadCount} unread.` : "All caught up."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {!notifications?.length ? (
          <p className="text-sm text-muted-foreground">No notifications yet.</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`rounded-lg border p-4 text-left transition-colors ${
                  n.read_at ? "border-slate-100 bg-slate-50/50" : "border-primary/20 bg-primary/5"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{n.title}</p>
                    {n.body && <p className="text-sm text-muted-foreground mt-1">{n.body}</p>}
                    <p className="text-[11px] text-muted-foreground mt-2">{format(new Date(n.created_at), "PPp")}</p>
                  </div>
                  {!n.read_at && (
                    <Button type="button" size="sm" variant="outline" className="shrink-0" onClick={() => onOpen(n)}>
                      Mark read
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeePortalNotificationsPage;
