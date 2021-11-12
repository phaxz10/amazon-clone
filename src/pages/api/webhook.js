import { buffer } from 'micro';
import * as admin from 'firebase-admin';

//firebase admin connection
const serviceAccount = require('../../../firebaseSAKey.json');

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const db = app.firestore();
//connect to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeEndpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async (req, res) => {
  if (req.method === 'POST') {
    const reqBuffer = await buffer(req);
    const payload = reqBuffer.toString();
    const sig = req.headers['stripe-signature'];
    let event;

    const fulfilOrder = async (session) => {
      //   console.log('fulfilling order: ', session);

      return db
        .collection('users')
        .doc(session.metadata.email)
        .collection('orders')
        .doc(session.id)
        .set({
          amount: session.amount_total / 100,
          amout_shipping: session.total_details.amount_shipping / 100,
          images: JSON.parse(session.metadata.images),
          timeStamp: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() =>
          console.log(
            `SUCCESS: order ${session.id} has been added to firestore DB`
          )
        )
        .catch((error) => console.log(error.message));
    };

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        stripeEndpointSecret
      );
    } catch (err) {
      console.log('error: ', err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      return fulfilOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
