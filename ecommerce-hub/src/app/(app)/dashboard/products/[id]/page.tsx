import { ProductDetail } from "@/features/products/components/product-detail";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return <ProductDetail id={params.id} />;
}
