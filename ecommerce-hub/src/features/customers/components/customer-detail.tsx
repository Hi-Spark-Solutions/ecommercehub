"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone, ShoppingBag, Tag, Check, X } from "lucide-react";
import { getCustomer, getCustomerOrders, getCustomerActivity } from "@/features/customers/api";
import { useAsyncData } from "@/hooks/use-async-data";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SegmentBadge, OrderStatusBadge } from "@/components/ui/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState, EmptyState } from "@/components/ui/states";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold text-foreground">{value}</p>
    </Card>
  );
}

export function CustomerDetail({ id }: { id: string }) {
  const { data: customer, loading, error, reload } = useAsyncData(() => getCustomer(id), [id]);
  const { data: orders } = useAsyncData(() => getCustomerOrders(id), [id]);
  const { data: activity } = useAsyncData(() => getCustomerActivity(id), [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Skeleton className="h-72 lg:col-span-2" />
          <Skeleton className="h-72" />
        </div>
      </div>
    );
  }

  if (error) return <Card><ErrorState onRetry={reload} /></Card>;
  if (!customer)
    return (
      <Card>
        <EmptyState title="Customer not found" description="This customer may have been removed." action={<Link href="/dashboard/customers"><Button size="sm">Back to customers</Button></Link>} />
      </Card>
    );

  return (
    <div className="space-y-6">
      <Link href="/dashboard/customers" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to customers
      </Link>

      <PageHeader
        title={customer.name}
        description={`Customer since ${formatDate(customer.createdAt)}`}
        actions={
          <>
            <SegmentBadge segment={customer.segment} />
            <Button variant="outline" size="sm" leftIcon={<Mail className="h-4 w-4" />}>Email</Button>
            <Button size="sm" leftIcon={<ShoppingBag className="h-4 w-4" />}>Create order</Button>
          </>
        }
      />

      {/* Stat row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Total spent" value={formatCurrency(customer.totalSpend)} />
        <Stat label="Orders" value={formatNumber(customer.ordersCount)} />
        <Stat label="Avg. order value" value={formatCurrency(customer.averageOrderValue)} />
        <Stat label="Last order" value={formatDate(customer.lastOrderAt, "short")} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left: orders + timeline */}
        <div className="space-y-4 lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader><CardTitle>Order history</CardTitle></CardHeader>
            <CardContent className="px-0 pb-0 pt-2">
              {!orders || orders.length === 0 ? (
                <EmptyState icon={<ShoppingBag className="h-6 w-6" />} title="No orders yet" description="This customer hasn't placed an order." />
              ) : (
                <Table>
                  <THead>
                    <TR className="hover:bg-transparent">
                      <TH>Order</TH>
                      <TH>Date</TH>
                      <TH>Status</TH>
                      <TH className="text-right">Total</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {orders.map((o) => (
                      <TR key={o.id}>
                        <TD>
                          <Link href={`/dashboard/orders/${o.id}`} className="font-medium text-foreground hover:text-primary">{o.number}</Link>
                        </TD>
                        <TD className="text-muted-foreground">{formatDate(o.createdAt, "short")}</TD>
                        <TD><OrderStatusBadge status={o.status} /></TD>
                        <TD className="text-right font-medium">{formatCurrency(o.total)}</TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {activity && activity.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Activity</CardTitle></CardHeader>
              <CardContent className="pt-2">
                <ol className="relative space-y-5 border-l border-border pl-6">
                  {activity.map((a) => (
                    <li key={a.id} className="relative">
                      <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
                        <Tag className="h-3 w-3" />
                      </span>
                      <p className="text-sm font-medium text-foreground">{a.label}</p>
                      {a.description && <p className="text-xs text-muted-foreground">{a.description}</p>}
                      <p className="mt-0.5 text-xs text-muted-foreground/70">{formatDate(a.timestamp, "long")}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: profile */}
        <div className="space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center py-6 text-center">
              <Avatar name={customer.name} size="lg" />
              <p className="mt-3 text-base font-semibold text-foreground">{customer.name}</p>
              <p className="text-sm text-muted-foreground">{customer.location}</p>
              <div className="mt-3"><SegmentBadge segment={customer.segment} /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
            <CardContent className="space-y-3 pt-2 text-sm">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" /><span className="truncate text-foreground">{customer.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" /><span className="text-foreground">{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" /><span className="text-foreground">{customer.location}, {customer.country}</span>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                {customer.acceptsMarketing ? <Check className="h-4 w-4 shrink-0 text-success" /> : <X className="h-4 w-4 shrink-0 text-danger" />}
                <span className="text-foreground">{customer.acceptsMarketing ? "Subscribed to marketing" : "Not subscribed"}</span>
              </div>
            </CardContent>
          </Card>

          {customer.tags.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Tags</CardTitle></CardHeader>
              <CardContent className="pt-2">
                <div className="flex flex-wrap gap-2">
                  {customer.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {customer.note && (
            <Card>
              <CardHeader><CardTitle>Note</CardTitle></CardHeader>
              <CardContent className="pt-2">
                <p className="text-sm text-muted-foreground">{customer.note}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
