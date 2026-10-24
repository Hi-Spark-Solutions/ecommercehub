import type {
  Address,
  ChannelName,
  Order,
  OrderLineItem,
  OrderStatus,
  PaymentStatus,
  FulfillmentStatus,
  OrderTimelineEvent,
} from "@/data/types";
import { dummyProducts } from "@/data/dummy/products";
import { dummyCustomers } from "@/data/dummy/customers";

const productById = new Map(dummyProducts.map((p) => [p.id, p]));
const customerById = new Map(dummyCustomers.map((c) => [c.id, c]));

interface OrderSeed {
  n: number;
  customerId: string;
  channel: ChannelName;
  status: OrderStatus;
  payment: PaymentStatus;
  fulfillment: FulfillmentStatus;
  createdAt: string;
  lines: { productId: string; qty: number; variant?: string }[];
  shippingMethod: string;
  tracking?: string;
}

const cityAddress = (customerId: string): Address => {
  const c = customerById.get(customerId)!;
  const [city, state] = c.location.split(", ");
  return {
    name: c.name,
    line1: `${100 + (c.ordersCount % 900)} Market Street`,
    line2: c.ordersCount % 3 === 0 ? "Apt 4B" : undefined,
    city: city ?? c.location,
    state: state ?? "",
    postalCode: `${10000 + (c.ordersCount * 137) % 89999}`,
    country: c.country,
  };
};

const buildTimeline = (seed: OrderSeed, base: Date): OrderTimelineEvent[] => {
  const events: OrderTimelineEvent[] = [
    { id: `${seed.n}-t1`, label: "Order placed", type: "created", timestamp: seed.createdAt },
  ];
  const h = (hrs: number) => new Date(base.getTime() + hrs * 3600_000).toISOString();
  if (seed.payment === "paid" || seed.payment === "partially_refunded") {
    events.push({ id: `${seed.n}-t2`, label: "Payment captured", type: "payment", timestamp: h(0.2) });
  }
  if (seed.fulfillment !== "unfulfilled") {
    events.push({ id: `${seed.n}-t3`, label: "Items fulfilled", description: seed.tracking ? `Tracking ${seed.tracking}` : undefined, type: "fulfillment", timestamp: h(20) });
    events.push({ id: `${seed.n}-t4`, label: "Shipped", type: "shipping", timestamp: h(24) });
  }
  if (seed.status === "delivered") {
    events.push({ id: `${seed.n}-t5`, label: "Delivered", type: "delivered", timestamp: h(72) });
  }
  if (seed.status === "refunded") {
    events.push({ id: `${seed.n}-t6`, label: "Order refunded", type: "note", timestamp: h(96) });
  }
  return events.reverse();
};

function buildOrder(seed: OrderSeed): Order {
  const customer = customerById.get(seed.customerId)!;
  const items: OrderLineItem[] = seed.lines.map((l, i) => {
    const p = productById.get(l.productId)!;
    return {
      id: `${seed.n}-li-${i}`,
      productId: p.id,
      name: p.name,
      variant: l.variant,
      sku: p.sku,
      quantity: l.qty,
      price: p.price,
      imageEmoji: p.imageEmoji,
      imageColor: p.imageColor,
    };
  });
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 9.95;
  const discount = seed.channel === "TikTok Shop" ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const tax = Math.round((subtotal - discount) * 0.0825 * 100) / 100;
  const total = Math.round((subtotal + shipping + tax - discount) * 100) / 100;
  const base = new Date(seed.createdAt);

  return {
    id: `order_${3000 + seed.n}`,
    number: `#${1000 + seed.n}`,
    customerId: customer.id,
    customerName: customer.name,
    customerEmail: customer.email,
    channel: seed.channel,
    status: seed.status,
    paymentStatus: seed.payment,
    fulfillmentStatus: seed.fulfillment,
    items,
    subtotal: Math.round(subtotal * 100) / 100,
    shipping,
    tax,
    discount,
    total,
    currency: "USD",
    shippingAddress: cityAddress(customer.id),
    billingAddress: cityAddress(customer.id),
    shippingMethod: seed.shippingMethod,
    trackingNumber: seed.tracking,
    timeline: buildTimeline(seed, base),
    createdAt: seed.createdAt,
    updatedAt: seed.createdAt,
  };
}

const seeds: OrderSeed[] = [
  { n: 42, customerId: "cust_2001", channel: "Online Store", status: "processing", payment: "paid", fulfillment: "unfulfilled", createdAt: "2026-08-13T15:32:00Z", shippingMethod: "Express (2-day)", lines: [{ productId: "prod_1001", qty: 1, variant: "Midnight Black" }, { productId: "prod_1005", qty: 1, variant: "Charcoal" }] },
  { n: 41, customerId: "cust_2007", channel: "Shopify", status: "fulfilled", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-08-13T11:05:00Z", shippingMethod: "Standard (5-day)", tracking: "1Z999AA10123456784", lines: [{ productId: "prod_1004", qty: 1, variant: "44mm / Graphite" }] },
  { n: 40, customerId: "cust_2016", channel: "Amazon", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-08-13T09:50:00Z", shippingMethod: "Amazon Prime", tracking: "TBA304928374651", lines: [{ productId: "prod_1005", qty: 1, variant: "Coral" }] },
  { n: 39, customerId: "cust_2008", channel: "Online Store", status: "processing", payment: "paid", fulfillment: "unfulfilled", createdAt: "2026-08-13T10:15:00Z", shippingMethod: "Standard (5-day)", lines: [{ productId: "prod_1001", qty: 1, variant: "Arctic White" }] },
  { n: 38, customerId: "cust_2005", channel: "TikTok Shop", status: "fulfilled", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-08-12T08:45:00Z", shippingMethod: "Standard (7-day)", tracking: "TT88371625490", lines: [{ productId: "prod_1008", qty: 2, variant: "Sage" }, { productId: "prod_1015", qty: 1 }] },
  { n: 37, customerId: "cust_2015", channel: "Online Store", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-08-12T11:25:00Z", shippingMethod: "Express (2-day)", tracking: "1Z999AA10199887766", lines: [{ productId: "prod_1006", qty: 1, variant: "Cognac" }] },
  { n: 36, customerId: "cust_2003", channel: "Shopify", status: "processing", payment: "paid", fulfillment: "partial", createdAt: "2026-08-12T12:00:00Z", shippingMethod: "International", tracking: "RR123456789IT", lines: [{ productId: "prod_1002", qty: 2, variant: "M / Heather Grey" }, { productId: "prod_1013", qty: 1 }] },
  { n: 35, customerId: "cust_2010", channel: "eBay", status: "fulfilled", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-08-11T13:40:00Z", shippingMethod: "Standard (5-day)", tracking: "9400110200881234567", lines: [{ productId: "prod_1024", qty: 1 }, { productId: "prod_1011", qty: 1, variant: "Ocean" }] },
  { n: 34, customerId: "cust_2001", channel: "Online Store", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-08-11T15:32:00Z", shippingMethod: "Express (2-day)", tracking: "1Z999AA10155443322", lines: [{ productId: "prod_1004", qty: 1, variant: "40mm / Graphite" }, { productId: "prod_1017", qty: 1 }] },
  { n: 33, customerId: "cust_2009", channel: "Amazon", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-08-08T09:30:00Z", shippingMethod: "Amazon Prime", tracking: "TBA998877665544", lines: [{ productId: "prod_1003", qty: 1, variant: "US 10 / Slate" }] },
  { n: 32, customerId: "cust_2011", channel: "Online Store", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-08-01T07:20:00Z", shippingMethod: "International", tracking: "EE334455667JP", lines: [{ productId: "prod_1010", qty: 1 }, { productId: "prod_1014", qty: 2, variant: "Matte Black" }] },
  { n: 31, customerId: "cust_2002", channel: "Shopify", status: "fulfilled", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-08-06T09:10:00Z", shippingMethod: "Standard (5-day)", tracking: "1Z999AA10133221100", lines: [{ productId: "prod_1016", qty: 1, variant: "L / Storm Blue" }] },
  { n: 30, customerId: "cust_2014", channel: "TikTok Shop", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-07-31T15:10:00Z", shippingMethod: "International", tracking: "TT77665544332", lines: [{ productId: "prod_1022", qty: 1 }, { productId: "prod_1018", qty: 1, variant: "Tortoise" }] },
  { n: 29, customerId: "cust_2004", channel: "Online Store", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-07-28T14:20:00Z", shippingMethod: "International", tracking: "RR998877665GB", lines: [{ productId: "prod_1007", qty: 1 }] },
  { n: 28, customerId: "cust_2001", channel: "Online Store", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-07-22T11:10:00Z", shippingMethod: "Express (2-day)", tracking: "1Z999AA10111009988", lines: [{ productId: "prod_1004", qty: 1, variant: "44mm / Graphite" }] },
  { n: 27, customerId: "cust_2013", channel: "Shopify", status: "refunded", payment: "refunded", fulfillment: "fulfilled", createdAt: "2026-07-20T09:00:00Z", shippingMethod: "International", tracking: "RR112233445FR", lines: [{ productId: "prod_1021", qty: 1 }] },
  { n: 26, customerId: "cust_2007", channel: "Amazon", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-07-18T16:05:00Z", shippingMethod: "Amazon Prime", tracking: "TBA112233445566", lines: [{ productId: "prod_1009", qty: 1, variant: "Brown Switch" }] },
  { n: 25, customerId: "cust_2012", channel: "Online Store", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-08-05T18:00:00Z", shippingMethod: "Standard (5-day)", tracking: "1Z999AA10166554433", lines: [{ productId: "prod_1011", qty: 2, variant: "Sand" }, { productId: "prod_1013", qty: 1 }] },
  { n: 24, customerId: "cust_2006", channel: "Online Store", status: "cancelled", payment: "refunded", fulfillment: "unfulfilled", createdAt: "2026-03-02T11:00:00Z", shippingMethod: "Standard (5-day)", lines: [{ productId: "prod_1012", qty: 1 }] },
  { n: 23, customerId: "cust_2015", channel: "Etsy", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-08-07T11:25:00Z", shippingMethod: "Standard (5-day)", tracking: "9400110200889998887", lines: [{ productId: "prod_1010", qty: 2 }] },
  { n: 22, customerId: "cust_2003", channel: "Online Store", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-08-09T12:00:00Z", shippingMethod: "International", tracking: "EE556677889IT", lines: [{ productId: "prod_1001", qty: 1, variant: "Navy Blue" }] },
  { n: 21, customerId: "cust_2009", channel: "Shopify", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-07-15T09:00:00Z", shippingMethod: "International", tracking: "RR667788990ES", lines: [{ productId: "prod_1002", qty: 1, variant: "L / Forest Green" }, { productId: "prod_1013", qty: 2 }] },
  { n: 20, customerId: "cust_2010", channel: "Online Store", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-08-04T13:40:00Z", shippingMethod: "Standard (5-day)", tracking: "1Z999AA10177665544", lines: [{ productId: "prod_1024", qty: 1 }] },
  { n: 19, customerId: "cust_2011", channel: "Amazon", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-07-10T07:20:00Z", shippingMethod: "Amazon Prime", tracking: "TBA223344556677", lines: [{ productId: "prod_1005", qty: 1, variant: "Charcoal" }] },
  { n: 18, customerId: "cust_2002", channel: "Online Store", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-07-25T10:00:00Z", shippingMethod: "Express (2-day)", tracking: "1Z999AA10188776655", lines: [{ productId: "prod_1006", qty: 1, variant: "Black" }] },
  { n: 17, customerId: "cust_2014", channel: "eBay", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-07-05T15:10:00Z", shippingMethod: "International", tracking: "9400110200887776665", lines: [{ productId: "prod_1020", qty: 1, variant: "US 9 / Natural" }] },
  { n: 16, customerId: "cust_2015", channel: "Online Store", status: "delivered", payment: "partially_refunded", fulfillment: "fulfilled", createdAt: "2026-06-28T11:25:00Z", shippingMethod: "Standard (5-day)", tracking: "9400110200886665554", lines: [{ productId: "prod_1004", qty: 1, variant: "44mm / Graphite" }, { productId: "prod_1015", qty: 1 }] },
  { n: 15, customerId: "cust_2007", channel: "TikTok Shop", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-08-10T16:05:00Z", shippingMethod: "Standard (7-day)", tracking: "TT55443322110", lines: [{ productId: "prod_1008", qty: 1, variant: "Terracotta" }, { productId: "prod_1014", qty: 1, variant: "Speckled Cream" }] },
  { n: 14, customerId: "cust_2005", channel: "Online Store", status: "pending", payment: "pending", fulfillment: "unfulfilled", createdAt: "2026-08-14T08:00:00Z", shippingMethod: "Standard (5-day)", lines: [{ productId: "prod_1015", qty: 1 }, { productId: "prod_1008", qty: 1, variant: "Sage" }] },
  { n: 13, customerId: "cust_2009", channel: "Online Store", status: "delivered", payment: "paid", fulfillment: "fulfilled", createdAt: "2026-06-20T09:30:00Z", shippingMethod: "International", tracking: "EE778899001ES", lines: [{ productId: "prod_1016", qty: 1, variant: "L / Charcoal" }] },
];

export const dummyOrders: Order[] = seeds
  .map(buildOrder)
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
