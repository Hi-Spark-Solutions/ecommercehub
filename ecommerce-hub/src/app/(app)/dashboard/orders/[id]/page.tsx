import { OrderDetail } from "@/features/orders/components/order-detail";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return <OrderDetail id={params.id} />;
}
