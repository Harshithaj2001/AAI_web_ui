import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import type { EmployeePortalOutletContext } from "./types";

const EmployeePortalProfilePage = () => {
  const {
    authEmail,
    profile,
    profileName,
    profilePhone,
    setProfileName,
    setProfilePhone,
    busy,
    onSaveProfile,
  } = useOutletContext<EmployeePortalOutletContext>();

  return (
    <Card className="border-slate-200 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <User className="h-5 w-5 text-primary" />
          My profile
        </CardTitle>
        <CardDescription>
          Official dates and deadlines use <strong className="text-slate-700">America/New_York</strong>.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Work email (from login)</Label>
            <Input value={authEmail} disabled className="bg-slate-50" />
          </div>
          <div className="space-y-2">
            <Label>Display name {profile?.profile_locked ? "(locked)" : ""}</Label>
            <Input
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              disabled={busy || !!profile?.profile_locked}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Phone {profile?.profile_locked ? "(locked)" : ""}</Label>
            <Input
              value={profilePhone}
              onChange={(e) => setProfilePhone(e.target.value)}
              disabled={busy || !!profile?.profile_locked}
              placeholder="Best number to reach you"
            />
          </div>
        </div>
        {!profile?.profile_locked ? (
          <Button type="button" disabled={busy || !profileName.trim()} onClick={() => void onSaveProfile()}>
            Save profile (locks after first save)
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            Profile is saved and locked. Contact your manager if your name or phone needs to be updated.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeePortalProfilePage;
