import Stripe from 'stripe';
import { Config } from 'configuration';

const stripe_pk = Config.STRIPE_PRIVATE_KEY;

const stripe = new Stripe(stripe_pk as string);

export interface InitStripeOptions {
  id: string;
  email: string;
  table_name: string;
  name?: string;
  address?: string;
}

export async function createStripeCustomerId(options: InitStripeOptions) {
  const customers = await stripe.customers.search({
    query: `email: "${options.email}"`,
  });

  if (customers.data.length === 1) {
    return customers.data[0].id;
  }

  const created_customer = await stripe.customers.create({
    name: options.name
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()),
    email: options.email,
    preferred_locales: ['fr', 'en'],
    metadata: {
      database_id: options.id,
      database_table: options.table_name,
    },
  });

  return created_customer.id;
}
