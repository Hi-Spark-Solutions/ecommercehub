"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MapPin,
  MoreHorizontal,
  Package,
  Printer,
  Truck,
  StickyNote,
  Clock,
} from "lucide-react";
import { getOrder } from "@/features/orders/api";
import { useAsyncData } from "@/hooks/use-async-data";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, ProductThumb } from "@/components/ui/avatar";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/ui/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState, EmptyState } from "@/components/ui/states";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/toast";
import type { Address, OrderTimelineEvent } from "@/data/types";
import { formatCurrency, formatDate } from "@/lib/utils";

const timelineIcon = {
  created: Clock,
  payment: CreditCard,
  fulfillment: Package,
  shipping: Truck,
  delivered: CheckCircle2,
  note: StickyNote,
} as const;

function AddressBlock({ address }: { address: Address }) {
  return (
    <div className="text-sm text-muted-foreground">
      <p className="font-medium text-foreground">{address.name}</p>
      <p>{address.line1}</p>
      {address.line2 && <p>{address.line2}</p>}
      <p>
        {address.city}
        {address.state ? `, ${address.state}` : ""} {address.postalCode}
      </p>
      <p>{address.country}</p>
    </div>
  );
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-1.5 text-sm ${strong ? "font-semibold text-foreground" : ""}`}>
      <span className={strong ? "" : "text-muted-foreground"}>{label}</span>
      <span className={strong ? "" : "text-foreground"}>{value}</span>
    </div>
  );
}

export function OrderDetail({ id }: { id: string }) {
  const { data: order, loading, error, reload } = useAsyncData(() => getOrder(id), [id]);
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Skeleton className="h-80 lg:col-span-2" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  if (error) return <Card><ErrorState onRetry={reload} /></Card>;
  if (!order)
    return (
      <Card>
        <EmptyState
          title="Order not found"
          description="This order may have been removed."
          action={<Link href="/dashboard/orders"><Button size="sm">Back to orders</Button></Link>}
        />
      </Card>
    );

  return (
    <div className="space-y-6">
      <Link href="/dashboard/orders" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to orders
      </Link>

      <PageHeader
        title={`Order ${order.number}`}
        description={`Placed ${formatDate(order.createdAt, "long")} · ${order.channel}`}
        actions={
          <>
            <OrderStatusBadge status={order.status} />
            <Button variant="outline" size="sm" leftIcon={<Printer className="h-4 w-4" />}>Print</Button>
            <Button size="sm" leftIcon={<Truck className="h-4 w-4" />} onClick={() => toast({ title: "Fulfillment started", tone: "success" })}>
              Fulfill
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="outline" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => toast({ title: "Refund issued", tone: "warning" })}>Refund order</DropdownItem>
                <DropdownItem danger onClick={() => toast({ title: "Order cancelled", tone: "danger" })}>Cancel order</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
              <PaymentStatusBadge status={order.paymentStatus} />
            </CardHeader>
            <CardContent className="pt-2">
              <ul className="divide-y divide-border">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 py-3">
                    <ProductThumb emoji={item.imageEmoji} color={item.imageColor} />
                    <div className="min-w-0 flex-1">
                      <Link href={`/dashboard/products/${item.productId}`} className="text-sm font-medium text-foreground hover:text-primary">
                        {item.name}
                      </Link>
                      {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
                      <p className="text-xs text-muted-foreground">{item.sku}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">
                        {formatCurrency(item.price)} × {item.quantity}
                      </p>
                      <p className="font-medium text-foreground">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t border-border pt-4">
                <SummaryRow label="Subtotal" value={formatCurrency(order.subtotal)} />
                {order.discount > 0 && <SummaryRow label="Discount" value={`- ${formatCurrency(order.discount)}`} />}
                <SummaryRow label="Shipping" value={order.shipping === 0 ? "Free" : formatCurrency(order.shipping)} />
                <SummaryRow label="Tax" value={formatCurrency(order.tax)} />
                <div className="mt-1 border-t border-border pt-1">
                  <SummaryRow label="Total" value={formatCurrency(order.total)} strong />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
              <CardContent className="pt-2 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  Visa ending 4242
                </div>
                <p className="mt-2 text-muted-foreground">
                  {order.paymentStatus === "paid" ? "Payment captured" : "Awaiting payment"} · {formatCurrency(order.total)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Fulfillment</CardTitle></CardHeader>
              <CardContent className="pt-2 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  {order.shippingMethod}
                </div>
                {order.trackingNumber ? (
                  <p className="mt-2 text-muted-foreground">Tracking: <span className="font-medium text-foreground">{order.trackingNumber}</span></p>
                ) : (
                  <p className="mt-2 text-muted-foreground">Not yet shipped</p>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
            <CardContent className="pt-2">
              <ol className="relative space-y-5 border-l border-border pl-6">
                {order.timeline.map((event: OrderTimelineEvent) => {
                  const Icon = timelineIcon[event.type];
                  return (
                    <li key={event.id} className="relative">
                      <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <p className="text-sm font-medium text-foreground">{event.label}</p>
                      {event.description && <p className="text-xs text-muted-foreground">{event.description}</p>}
                      <p className="mt-0.5 text-xs text-muted-foreground/70">{formatDate(event.timestamp, "long")}</p>
                    </li>
                  );
                })}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Customer</CardTitle></CardHeader>
            <CardContent className="pt-2">
              <div className="flex items-center gap-3">
                <Avatar name={order.customerName} size="md" />
                <div className="min-w-0">
                  <Link href={`/dashboard/customers/${order.customerId}`} className="text-sm font-medium text-foreground hover:text-primary">
                    {order.customerName}
                  </Link>
                  <p className="truncate text-xs text-muted-foreground">{order.customerEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-muted-foreground" />Shipping address</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <AddressBlock address={order.shippingAddress} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5"><CreditCard className="h-4 w-4 text-muted-foreground" />Billing address</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <AddressBlock address={order.billingAddress} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
