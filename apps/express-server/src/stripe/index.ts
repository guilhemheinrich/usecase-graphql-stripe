import Stripe from 'stripe';
import { Config } from 'configuration';

const stripe_pk = Config.STRIPE_PRIVATE_KEY;

export const stripeClient = new Stripe(stripe_pk as string);

export default stripeClient;
