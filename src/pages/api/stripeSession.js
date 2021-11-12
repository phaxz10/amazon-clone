import { env } from '../../../next.config';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const formatItems = items.map((item) => ({
    price_data: {
      currency: 'USD',
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: item.price * 100,
    },
    description: item.description,
    quantity: item.count,
  }));

  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    payment_method_types: ['card'],
    line_items: formatItems,
    mode: 'payment',
    metadata: {
      email: email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
    shipping_rates: ['shr_1IyqYmGy0BFxvoJ04PWC3k34'],
    shipping_address_collection: {
      allowed_countries: ['US', 'PH', 'SG'],
    },
  });

  res.status(200).json({ id: session.id });
};
