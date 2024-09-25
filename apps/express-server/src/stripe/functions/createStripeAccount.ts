import { Database } from '@org/supabase-types';
import stripeClient from '..';
import Stripe from 'stripe';
export interface InitStripeAccountOptions {
  email: string;
  individual?: Stripe.AccountCreateParams.Individual;
}

export type stripe_account_tables = Extract<
  keyof Database['public']['Tables'],
  'beewyse_artist' | 'beewyse_ong'
>;

export interface StripeCustomerMetadata {
  database_id: string;
  database_table: stripe_account_tables;
}
export async function createStripeAccount(options: InitStripeAccountOptions) {
  // create a connect account

  const account = await stripeClient.accounts.create({
    type: 'express',
    email: options.email,
    business_type: options.individual ? 'individual' : 'non_profit',
    individual: options.individual,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  return account;
}
