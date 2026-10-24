"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Edit3, MoreHorizontal, Trash2 } from "lucide-react";
import { getProduct } from "@/features/products/api";
import { useAsyncData } from "@/hooks/use-async-data";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductStatusBadge } from "@/components/ui/status-badge";
import { ProductThumb } from "@/components/ui/avatar";
import { Tabs } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState, EmptyState } from "@/components/ui/states";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/toast";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

export function ProductDetail({ id }: { id: string }) {
  const { data: product, loading, error, reload } = useAsyncData(() => getProduct(id), [id]);
  const [tab, setTab] = React.useState("overview");
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Skeleton className="h-64 lg:col-span-2" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (error) return <Card><ErrorState onRetry={reload} /></Card>;
  if (!product)
    return (
      <Card>
        <EmptyState title="Product not found" description="This product may have been removed." action={<Link href="/dashboard/products"><Button size="sm">Back to products</Button></Link>} />
      </Card>
    );

  const margin = product.price > 0 ? ((product.price - product.cost) / product.price) * 100 : 0;

  return (
    <div className="space-y-6">
      <Link href="/dashboard/products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>

      <PageHeader
        title={product.name}
        description={`SKU ${product.sku} · ${product.vendor}`}
        actions={
          <>
            <ProductStatusBadge status={product.status} />
            <Button variant="outline" size="sm" leftIcon={<Edit3 className="h-4 w-4" />}>Edit</Button>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="outline" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem icon={<Copy className="h-4 w-4" />} onClick={() => toast({ title: "Product duplicated", tone: "success" })}>Duplicate</DropdownItem>
                <DropdownItem icon={<Trash2 className="h-4 w-4" />} danger onClick={() => toast({ title: "Archived product", tone: "warning" })}>Archive</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        }
      />

      <Tabs
        tabs={[
          { value: "overview", label: "Overview" },
          { value: "variants", label: "Variants", count: product.variants.length },
          { value: "channels", label: "Channels", count: product.channels.length },
        ]}
        value={tab}
        onValueChange={setTab}
      />

      {tab === "overview" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Card>
              <CardHeader><CardTitle>Product information</CardTitle></CardHeader>
              <CardContent className="pt-2">
                <div className="flex gap-4">
                  <ProductThumb emoji={product.imageEmoji} color={product.imageColor} size="lg" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Media</CardTitle></CardHeader>
              <CardContent className="pt-2">
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex aspect-square items-center justify-center rounded-lg text-3xl"
                      style={{ backgroundColor: `${product.imageColor}14`, border: `1px solid ${product.imageColor}33` }}
                    >
                      {product.imageEmoji}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
              <CardContent className="divide-y divide-border pt-0">
                <Field label="Price" value={formatCurrency(product.price)} />
                {product.compareAtPrice && <Field label="Compare at" value={<span className="text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</span>} />}
                <Field label="Cost" value={formatCurrency(product.cost)} />
                <Field label="Margin" value={`${margin.toFixed(0)}%`} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Inventory</CardTitle></CardHeader>
              <CardContent className="divide-y divide-border pt-0">
                <Field label="In stock" value={formatNumber(product.stock)} />
                <Field label="Reorder point" value={formatNumber(product.reorderPoint)} />
                <Field label="Units sold" value={formatNumber(product.unitsSold)} />
                <Field label="Revenue" value={formatCurrency(product.revenue)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Details</CardTitle></CardHeader>
              <CardContent className="divide-y divide-border pt-0">
                <Field label="Category" value={product.category} />
                <Field label="Vendor" value={product.vendor} />
                <Field label="Created" value={formatDate(product.createdAt)} />
                <Field label="Updated" value={formatDate(product.updatedAt)} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {tab === "variants" && (
        <Card className="overflow-hidden">
          {product.variants.length === 0 ? (
            <EmptyState title="No variants" description="This product is sold as a single option." />
          ) : (
            <Table>
              <THead>
                <TR className="hover:bg-transparent">
                  <TH>Variant</TH>
                  <TH>SKU</TH>
                  <TH className="text-right">Price</TH>
                  <TH className="text-right">Stock</TH>
                </TR>
              </THead>
              <TBody>
                {product.variants.map((v) => (
                  <TR key={v.id}>
                    <TD className="font-medium">{v.name}</TD>
                    <TD className="text-muted-foreground">{v.sku}</TD>
                    <TD className="text-right font-medium">{formatCurrency(v.price)}</TD>
                    <TD className="text-right">{formatNumber(v.stock)}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          )}
        </Card>
      )}

      {tab === "channels" && (
        <Card>
          <CardHeader><CardTitle>Sales channels</CardTitle></CardHeader>
          <CardContent className="pt-2">
            <div className="flex flex-wrap gap-2">
              {product.channels.map((c) => (
                <Badge key={c} tone="primary" dot>{c}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
