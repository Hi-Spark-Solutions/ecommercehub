"use client";

import * as React from "react";
import {
  ArrowUpRight,
  Bell,
  Building2,
  Camera,
  CreditCard,
  LogOut,
  Plus,
  Save,
  Shield,
  User,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/toast";
import { useAsyncData } from "@/hooks/use-async-data";
import { dataAdapter } from "@/data";
import type { CurrentUser, Workspace } from "@/data/types";
import { cn, formatNumber } from "@/lib/utils";

// ----------------------------------------------------------------------------
// Section registry + shared types
// ----------------------------------------------------------------------------

type SectionId = "profile" | "store" | "notifications" | "billing" | "team" | "security";
type BadgeTone = React.ComponentProps<typeof Badge>["tone"];

interface SectionDef {
  id: SectionId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sections: SectionDef[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "store", label: "Store", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "team", label: "Team", icon: Users },
  { id: "security", label: "Security", icon: Shield },
];

// ----------------------------------------------------------------------------
// Static UI-only data (this screen is presentational)
// ----------------------------------------------------------------------------

const currencyOptions = [
  { label: "USD — US Dollar", value: "USD" },
  { label: "EUR — Euro", value: "EUR" },
  { label: "GBP — British Pound", value: "GBP" },
  { label: "CAD — Canadian Dollar", value: "CAD" },
];

const timezoneOptions = [
  { label: "Pacific Time (PT)", value: "America/Los_Angeles" },
  { label: "Mountain Time (MT)", value: "America/Denver" },
  { label: "Central Time (CT)", value: "America/Chicago" },
  { label: "Eastern Time (ET)", value: "America/New_York" },
  { label: "UTC", value: "UTC" },
];

const weightOptions = [
  { label: "Kilograms (kg)", value: "kg" },
  { label: "Pounds (lb)", value: "lb" },
];

type NotificationKey =
  | "newOrders"
  | "lowStock"
  | "failedSyncs"
  | "weeklySummary"
  | "productReviews"
  | "payoutNotifications";

const notificationRows: { id: NotificationKey; title: string; description: string }[] = [
  { id: "newOrders", title: "New orders", description: "Get notified as soon as a new order comes in." },
  { id: "lowStock", title: "Low stock alerts", description: "Know when inventory drops below its reorder point." },
  { id: "failedSyncs", title: "Failed syncs", description: "Be alerted the moment a channel sync fails." },
  { id: "weeklySummary", title: "Weekly summary", description: "A performance digest delivered every Monday." },
  { id: "productReviews", title: "Product reviews", description: "Hear about it when customers leave a review." },
  { id: "payoutNotifications", title: "Payout notifications", description: "Get a heads up whenever a payout is sent." },
];

const billingUsage: { label: string; used: number; limit: number }[] = [
  { label: "Orders this month", used: 8420, limit: 10000 },
  { label: "Products", used: 642, limit: 1000 },
  { label: "Team seats", used: 4, limit: 10 },
];

const recentInvoices: {
  id: string;
  number: string;
  date: string;
  amount: string;
  status: string;
  tone: BadgeTone;
}[] = [
  { id: "in_1042", number: "INV-1042", date: "Aug 1, 2026", amount: "$79.00", status: "Paid", tone: "success" },
  { id: "in_1041", number: "INV-1041", date: "Jul 1, 2026", amount: "$79.00", status: "Paid", tone: "success" },
  { id: "in_1040", number: "INV-1040", date: "Jun 1, 2026", amount: "$79.00", status: "Paid", tone: "success" },
];

const teamMembers: { id: string; name: string; email: string; role: string; tone: BadgeTone }[] = [
  { id: "tm_1", name: "Jordan Avery", email: "jordan@northwindgoods.com", role: "Owner", tone: "primary" },
  { id: "tm_2", name: "Riley Chen", email: "riley@northwindgoods.com", role: "Admin", tone: "info" },
  { id: "tm_3", name: "Sam Okafor", email: "sam@northwindgoods.com", role: "Editor", tone: "neutral" },
  { id: "tm_4", name: "Priya Nair", email: "priya@northwindgoods.com", role: "Viewer", tone: "neutral" },
];

// ----------------------------------------------------------------------------
// Root view
// ----------------------------------------------------------------------------

export function SettingsView() {
  const [active, setActive] = React.useState<SectionId>("profile");

  const { data } = useAsyncData(async () => {
    const [user, workspaces] = await Promise.all([
      dataAdapter.getCurrentUser(),
      dataAdapter.getWorkspaces(),
    ]);
    return { user, workspaces };
  }, []);

  const user: CurrentUser | null = data?.user ?? null;
  const workspace: Workspace | null = data?.workspaces[0] ?? null;

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your store, team and account preferences." />

      {/* Mobile section switcher */}
      <div className="lg:hidden">
        <Tabs
          tabs={sections.map((s) => ({ value: s.id, label: s.label }))}
          value={active}
          onValueChange={(value) => setActive(value as SectionId)}
        />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Desktop vertical nav */}
        <nav className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-6 space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = section.id === active;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActive(section.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Active section */}
        <div className="min-w-0 flex-1">
          {active === "profile" && <ProfileSection user={user} />}
          {active === "store" && <StoreSection workspace={workspace} />}
          {active === "notifications" && <NotificationsSection />}
          {active === "billing" && <BillingSection />}
          {active === "team" && <TeamSection />}
          {active === "security" && <SecuritySection />}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Profile
// ----------------------------------------------------------------------------

function ProfileSection({ user }: { user: CurrentUser | null }) {
  const { toast } = useToast();
  const name = user?.name ?? "Jordan Avery";
  const email = user?.email ?? "jordan@northwindgoods.com";
  const role = user?.role ?? "Store Owner";

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal details and public profile.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar name={name} size="lg" />
          <div className="space-y-2">
            <Button variant="outline" size="sm" leftIcon={<Camera className="h-4 w-4" />}>
              Change photo
            </Button>
            <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
          </div>
        </div>

        {/* keyed so uncontrolled defaults refresh once async data arrives */}
        <div key={user?.id ?? "loading"} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="profile-name">Full name</Label>
            <Input id="profile-name" defaultValue={name} placeholder="Your name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-email">Email</Label>
            <Input id="profile-email" type="email" defaultValue={email} placeholder="you@example.com" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="profile-role">Role</Label>
            <Input id="profile-role" defaultValue={role} />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="profile-bio">Bio</Label>
            <Textarea
              id="profile-bio"
              defaultValue="Store owner at Northwind Goods, focused on building a delightful shopping experience."
              placeholder="Tell us a little about yourself"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          leftIcon={<Save className="h-4 w-4" />}
          onClick={() => toast({ title: "Profile updated", tone: "success" })}
        >
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
}

// ----------------------------------------------------------------------------
// Store
// ----------------------------------------------------------------------------

function StoreSection({ workspace }: { workspace: Workspace | null }) {
  const { toast } = useToast();
  const [currency, setCurrency] = React.useState("USD");
  const [timezone, setTimezone] = React.useState("America/Los_Angeles");
  const [weightUnit, setWeightUnit] = React.useState("kg");
  const storeName = workspace?.name ?? "Northwind Goods";

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Store details</CardTitle>
          <CardDescription>Configure your storefront and regional settings.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div key={workspace?.id ?? "loading"} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="store-name">Store name</Label>
            <Input id="store-name" defaultValue={storeName} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="store-url">Store URL</Label>
            <Input id="store-url" defaultValue="northwindgoods.myshop.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="store-currency">Currency</Label>
            <Select id="store-currency" value={currency} onValueChange={setCurrency} options={currencyOptions} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="store-timezone">Timezone</Label>
            <Select id="store-timezone" value={timezone} onValueChange={setTimezone} options={timezoneOptions} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="store-weight">Weight unit</Label>
            <Select id="store-weight" value={weightUnit} onValueChange={setWeightUnit} options={weightOptions} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          leftIcon={<Save className="h-4 w-4" />}
          onClick={() => toast({ title: "Store settings saved", tone: "success" })}
        >
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
}

// ----------------------------------------------------------------------------
// Notifications
// ----------------------------------------------------------------------------

function NotificationsSection() {
  const { toast } = useToast();
  const [prefs, setPrefs] = React.useState<Record<NotificationKey, boolean>>({
    newOrders: true,
    lowStock: true,
    failedSyncs: true,
    weeklySummary: false,
    productReviews: false,
    payoutNotifications: true,
  });

  const setPref = (key: NotificationKey, value: boolean) =>
    setPrefs((prev) => ({ ...prev, [key]: value }));

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose what you want to be notified about.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="divide-y divide-border">
        {notificationRows.map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{row.title}</p>
              <p className="text-sm text-muted-foreground">{row.description}</p>
            </div>
            <Switch
              checked={prefs[row.id]}
              onCheckedChange={(value) => setPref(row.id, value)}
              label={row.title}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          leftIcon={<Save className="h-4 w-4" />}
          onClick={() => toast({ title: "Notification preferences saved", tone: "success" })}
        >
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
}

// ----------------------------------------------------------------------------
// Billing
// ----------------------------------------------------------------------------

function BillingSection() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Plan &amp; usage</CardTitle>
            <CardDescription>Manage your subscription and monitor usage.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-muted/40 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <CreditCard className="h-5 w-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">Growth plan</p>
                  <Badge tone="primary">Current</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Billed monthly · renews Sep 1, 2026</p>
              </div>
            </div>
            <p className="text-lg font-semibold text-foreground">
              $79<span className="text-sm font-normal text-muted-foreground">/mo</span>
            </p>
          </div>

          <div className="space-y-4">
            {billingUsage.map((item) => {
              const pct = Math.min(100, Math.round((item.used / item.limit) * 100));
              return (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.label}</span>
                    <span className="text-muted-foreground">
                      {formatNumber(item.used)} / {formatNumber(item.limit)}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="ghost" onClick={() => toast({ title: "Opening invoices", tone: "info" })}>
            View invoices
          </Button>
          <Button
            variant="outline"
            leftIcon={<ArrowUpRight className="h-4 w-4" />}
            onClick={() =>
              toast({ title: "Upgrade plan", description: "Plan changes are coming soon.", tone: "info" })
            }
          >
            Upgrade plan
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Recent invoices</CardTitle>
            <CardDescription>Your last few payments.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {recentInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{invoice.date}</p>
                  <p className="text-xs text-muted-foreground">{invoice.number}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-foreground">{invoice.amount}</span>
                  <Badge tone={invoice.tone} dot>
                    {invoice.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Team
// ----------------------------------------------------------------------------

function TeamSection() {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Team members</CardTitle>
          <CardDescription>Manage who has access to this workspace.</CardDescription>
        </div>
        <Button
          size="sm"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() =>
            toast({
              title: "Invite teammate",
              description: "Team invitations are coming soon.",
              tone: "info",
            })
          }
        >
          Invite member
        </Button>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-border">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={member.name} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{member.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <Badge tone={member.tone}>{member.role}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------------
// Security
// ----------------------------------------------------------------------------

function SecuritySection() {
  const { toast } = useToast();
  const [twoFactor, setTwoFactor] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your password and account security.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="divide-y divide-border">
        {/* Change password */}
        <div className="space-y-4 pb-6">
          <div>
            <p className="text-sm font-medium text-foreground">Change password</p>
            <p className="text-sm text-muted-foreground">
              Use a strong password that you do not reuse elsewhere.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="current-password">Current password</Label>
              <Input id="current-password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" />
            </div>
          </div>
          <div>
            <Button
              leftIcon={<Save className="h-4 w-4" />}
              onClick={() => toast({ title: "Password updated", tone: "success" })}
            >
              Update password
            </Button>
          </div>
        </div>

        {/* Two-factor */}
        <div className="flex items-center justify-between gap-4 py-6">
          <div>
            <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account.
            </p>
          </div>
          <Switch
            checked={twoFactor}
            onCheckedChange={setTwoFactor}
            label="Two-factor authentication"
          />
        </div>

        {/* Sessions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <div>
            <p className="text-sm font-medium text-foreground">Active sessions</p>
            <p className="text-sm text-muted-foreground">
              Sign out of all other browsers and devices.
            </p>
          </div>
          <Button
            variant="outline"
            leftIcon={<LogOut className="h-4 w-4" />}
            className="border-danger/40 text-danger hover:bg-danger/10 hover:text-danger"
            onClick={() => toast({ title: "Signed out of all sessions", tone: "success" })}
          >
            Sign out all sessions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
