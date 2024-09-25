import { Database } from '@org/supabase-types';
import stripeClient from '..';

export interface InitStripeCustomerOptions {
  db_id: string;
  email: string;
  table_name: string;
  name?: string;
  address?: string;
}

export type stripe_customer_tables = Extract<
  keyof Database['public']['Tables'],
  'beewyse_artist' | 'beewyse_ong'
>;

export interface StripeCustomerMetadata {
  database_id: string;
  database_table: stripe_customer_tables;
}

export async function createStripeCustomerId(
  options: InitStripeCustomerOptions
) {
  const customers = await stripeClient.customers.search({
    query: `email: "${options.email}"`,
  });

  if (customers.data.length === 1) {
    return customers.data[0].id;
  }

  const created_customer = await stripeClient.customers.create({
    name: options.name
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()),
    email: options.email,
    preferred_locales: ['fr', 'en'],
    metadata: {
      database_id: options.db_id,
      database_table: options.table_name,
    },
  });

  return created_customer.id;
}
