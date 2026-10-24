import { dataAdapter } from "@/data";
import type { Customer, CustomerActivity, CustomerFilters, Order, Paginated } from "@/data/types";

export function getCustomers(filters?: CustomerFilters): Promise<Paginated<Customer>> {
  return dataAdapter.listCustomers(filters);
}

export function getCustomer(id: string): Promise<Customer | null> {
  return dataAdapter.getCustomer(id);
}

export function getCustomerOrders(customerId: string): Promise<Order[]> {
  return dataAdapter.getCustomerOrders(customerId);
}

export function getCustomerActivity(customerId: string): Promise<CustomerActivity[]> {
  return dataAdapter.getCustomerActivity(customerId);
}
