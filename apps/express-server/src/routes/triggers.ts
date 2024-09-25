import { Router, Request, Response } from 'express';
import supabase from '../supabase';
import { Database, Tables, TablesUpdate } from '@org/supabase-types';
import {
  createStripeCustomerId,
  stripe_customer_tables,
} from '../stripe/functions/createStripeCustomerId';
import { createStripeAccount } from '../stripe/functions/createStripeAccount';
export const router: any = Router();

export interface TriggerInsertPayload {
  data: Tables<stripe_customer_tables>;
  table: {
    name: stripe_customer_tables;
    schema: 'public';
  };
}
// Déclarer les interace et type avec zod pour pouvoir valider les payloads
export interface StripeCustomerInit {
  id: string | number;
  table: {
    name: stripe_customer_tables;
    schema: 'public';
  };
}

export interface StripeAccountInit {
  id: string | number;
  table: {
    name: stripe_customer_tables;
    schema: 'public';
  };
}

//* On pourrait aller plus loin dans le typage pour s'assurer que les clés sont des noms de colonnes valides
const primary_key_mapping: {
  [T in stripe_customer_tables]: {
    pk: string;
    stripe_account_key: string;
    stripe_customer_key: string;
  };
} = {
  beewyse_artist: {
    pk: '_id',
    stripe_account_key: 'stripe_account_id',
    stripe_customer_key: 'stripe_customer_id',
  },
  beewyse_ong: {
    pk: 'slug',
    stripe_account_key: 'stripe_account_id',
    stripe_customer_key: 'stripe_customer_id',
  },
};

router.post(
  '/stripe_customer_init',
  async (req: Request<{}, {}, TriggerInsertPayload>, res: Response) => {
    console.log('received body', req.body);
    try {
      const payload = req.body;
      console.log(payload.data);
      if (
        payload.data[
          primary_key_mapping[payload.table.name].stripe_customer_key
        ]
      ) {
        console.log('already one');
        return res.send(`Already has a customer_id: ${payload.data}`);
      }
      // Stripe init
      // res.send(`Initialization: ${JSON.stringify(req.body)}`);

      let name: string;
      switch (payload.table.name) {
        case 'beewyse_artist':
          const artist = payload.data as Tables<'beewyse_artist'>;
          name = `${artist.firstname} ${artist.lastname}`;
          break;
        case 'beewyse_ong':
          const ong = payload.data as Tables<'beewyse_ong'>;
          name = `ONG ${ong.slug}`;
          break;
        default:
          break;
      }

      const stripeCustomerId = await createStripeCustomerId({
        db_id: payload.data[primary_key_mapping[payload.table.name].pk],
        email: payload.data.email, //! email is required, and should be present in any table that we want to initialize
        table_name: payload.table.name,
        name: name,
      });
      console.log('stripeCustomerId', stripeCustomerId);
      const updatePayload: TablesUpdate<stripe_customer_tables> = {
        [primary_key_mapping[payload.table.name].stripe_customer_key]:
          stripeCustomerId,
      };
      console.log('Uploading payload', updatePayload);
      const {
        data: customerisable_beewyse_update_data,
        error: customerisable_beewyse_update_error,
      } = await supabase
        .from(payload.table.name)
        .update(updatePayload)
        .eq(
          primary_key_mapping[payload.table.name].pk,
          payload.data[primary_key_mapping[payload.table.name].pk]
        )
        .select()
        .single();
      if (customerisable_beewyse_update_error)
        throw {
          type: 'fetch_info_supabase',
          error: customerisable_beewyse_update_error,
        };
      return res.send(
        `Completed initialisation: ${customerisable_beewyse_update_data}`
      );
    } catch (error) {
      console.error(error);
      return res.send(error);
    }
  }
);

router.post(
  '/stripe_account_init',
  async (req: Request<{}, {}, TriggerInsertPayload>, res: Response) => {
    console.log('received body', req.body);
    try {
      const payload = req.body;

      if (
        payload.data[primary_key_mapping[payload.table.name].stripe_account_key]
      ) {
        console.log('already one');
        res.send(`Already has a customer_id: ${payload.data}`);
        return;
      }
      res.send(`Initialization: ${JSON.stringify(req.body)}`);
      let individual: Parameters<typeof createStripeAccount>[0]['individual'] =
        {};
      switch (payload.table.name) {
        case 'beewyse_artist':
          const artist = payload.data as Tables<'beewyse_artist'>;
          individual.email = artist.email;
          break;
        case 'beewyse_ong':
          const ong = payload.data as Tables<'beewyse_ong'>;
          individual = null;
          break;
        default:
          individual = null;
          break;
      }

      const stripeAccountId = await createStripeAccount({
        email: payload.data.email,
        individual: individual,
      });

      const updatePayload: TablesUpdate<stripe_customer_tables> = {
        [primary_key_mapping[payload.table.name].stripe_account_key]:
          stripeAccountId,
      };
      const {
        data: customerisable_beewyse_update_data,
        error: customerisable_beewyse_update_error,
      } = await supabase
        .from(payload.table.name)
        .update(updatePayload)
        .eq(
          primary_key_mapping[payload.table.name].pk,
          payload.data[primary_key_mapping[payload.table.name].pk]
        )
        .select()
        .single();
      if (customerisable_beewyse_update_error)
        throw customerisable_beewyse_update_error;
      res.send(
        `Completed initialisation: ${customerisable_beewyse_update_data}`
      );
    } catch (error) {
      console.error(error);
    }
  }
);

export default router;
