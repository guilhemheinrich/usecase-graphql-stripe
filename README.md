# usecase-graphql-stripe
A quick playground displaying a graphql endpoint to handle stripe payment, with a multiple destination pyament intent

# Hasura
Once docker compose is run, go to
http://localhost:8080/console

## Tracking migrations
We need to use the console, which does the work of binding change made through the UI to local code file
https://hasura.io/docs/2.0/hasura-cli/quickstart/ 

# Express
Pour build uniquement le service express
```bash
docker compose build express-server
```

## Stripe TODO

Entrée de l'api : un événement ID (c'est lui qui détient les infos pour la répartition et les comptes connect)
Il doit renvoyer une session de payment (checkout)

multiple destination for a payment : https://chatgpt.com/share/66ed92b0-15dc-8002-9a5d-9d08108b96d8
un seul payment vers l'entreprise (BeeWize), puis des transactions qui se déclacnhe par webhook lors d'un événement payment succeed

 * gérér les échec de paiements

 doc stripe: https://docs.stripe.com/connect/charges#separate-charges-transfers