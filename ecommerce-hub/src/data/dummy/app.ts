import type { CurrentUser, NotificationItem, Workspace } from "@/data/types";

export const dummyWorkspaces: Workspace[] = [
  { id: "ws_1", name: "Northwind Goods", plan: "Growth", logoColor: "#6366f1", initials: "NG" },
  { id: "ws_2", name: "Aurora Audio", plan: "Scale", logoColor: "#0ea5e9", initials: "AA" },
  { id: "ws_3", name: "Trailhead Outdoors", plan: "Starter", logoColor: "#10b981", initials: "TO" },
];

export const dummyCurrentUser: CurrentUser = {
  id: "user_1",
  name: "Jordan Avery",
  email: "jordan@northwindgoods.com",
  role: "Store Owner",
  avatarColor: "#6366f1",
};

export const dummyNotifications: NotificationItem[] = [
  { id: "ntf_1", title: "New order #1042", description: "Olivia Bennett placed a $418.00 order.", timestamp: "2026-08-14T11:32:00Z", read: false, type: "order" },
  { id: "ntf_2", title: "Low stock alert", description: "Pulse Smart Watch is below its reorder point (58 left).", timestamp: "2026-08-14T10:05:00Z", read: false, type: "inventory" },
  { id: "ntf_3", title: "eBay sync failed", description: "Authentication expired — reconnect required.", timestamp: "2026-08-13T22:16:00Z", read: false, type: "integration" },
  { id: "ntf_4", title: "Out of stock", description: "Orbit Wireless Charger is now out of stock.", timestamp: "2026-08-11T09:02:00Z", read: true, type: "inventory" },
  { id: "ntf_5", title: "Payout sent", description: "Your weekly payout of $18,240.00 is on the way.", timestamp: "2026-08-11T06:00:00Z", read: true, type: "system" },
];
