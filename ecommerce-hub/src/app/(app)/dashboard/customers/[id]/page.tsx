import { CustomerDetail } from "@/features/customers/components/customer-detail";

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  return <CustomerDetail id={params.id} />;
}
