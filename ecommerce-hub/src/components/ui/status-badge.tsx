import { Badge } from "@/components/ui/badge";
import type {
  OrderStatus,
  PaymentStatus,
  ProductStatus,
  StockStatus,
  IntegrationStatus,
  CustomerSegment,
} from "@/data/types";

type Tone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

const orderMap: Record<OrderStatus, { label: string; tone: Tone }> = {
  pending: { label: "Pending", tone: "warning" },
  processing: { label: "Processing", tone: "info" },
  fulfilled: { label: "Fulfilled", tone: "primary" },
  delivered: { label: "Delivered", tone: "success" },
  cancelled: { label: "Cancelled", tone: "neutral" },
  refunded: { label: "Refunded", tone: "danger" },
};

const paymentMap: Record<PaymentStatus, { label: string; tone: Tone }> = {
  paid: { label: "Paid", tone: "success" },
  pending: { label: "Pending", tone: "warning" },
  refunded: { label: "Refunded", tone: "danger" },
  partially_refunded: { label: "Partial refund", tone: "warning" },
};

const productMap: Record<ProductStatus, { label: string; tone: Tone }> = {
  active: { label: "Active", tone: "success" },
  draft: { label: "Draft", tone: "neutral" },
  archived: { label: "Archived", tone: "warning" },
};

const stockMap: Record<StockStatus, { label: string; tone: Tone }> = {
  in_stock: { label: "In stock", tone: "success" },
  low_stock: { label: "Low stock", tone: "warning" },
  out_of_stock: { label: "Out of stock", tone: "danger" },
};

const integrationMap: Record<IntegrationStatus, { label: string; tone: Tone }> = {
  connected: { label: "Connected", tone: "success" },
  not_connected: { label: "Not connected", tone: "neutral" },
  error: { label: "Error", tone: "danger" },
  syncing: { label: "Syncing", tone: "info" },
};

const segmentMap: Record<CustomerSegment, { label: string; tone: Tone }> = {
  vip: { label: "VIP", tone: "primary" },
  returning: { label: "Returning", tone: "success" },
  new: { label: "New", tone: "info" },
  at_risk: { label: "At risk", tone: "warning" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { label, tone } = orderMap[status];
  return <Badge tone={tone} dot>{label}</Badge>;
}
export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const { label, tone } = paymentMap[status];
  return <Badge tone={tone}>{label}</Badge>;
}
export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  const { label, tone } = productMap[status];
  return <Badge tone={tone} dot>{label}</Badge>;
}
export function StockStatusBadge({ status }: { status: StockStatus }) {
  const { label, tone } = stockMap[status];
  return <Badge tone={tone} dot>{label}</Badge>;
}
export function IntegrationStatusBadge({ status }: { status: IntegrationStatus }) {
  const { label, tone } = integrationMap[status];
  return <Badge tone={tone} dot>{label}</Badge>;
}
export function SegmentBadge({ segment }: { segment: CustomerSegment }) {
  const { label, tone } = segmentMap[segment];
  return <Badge tone={tone}>{label}</Badge>;
}
