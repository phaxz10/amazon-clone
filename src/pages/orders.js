import { db } from '../../firebase';
import { getSession } from 'next-auth/client';
import moment from 'moment';
import Order from '../components/Order';

const orders = ({ orders, session }) => {
  console.log(orders);
  return (
    <div className='grid p-10 '>
      <div className='font-medium text-4xl border-b-2 border-yellow-300'>
        {!orders ? 'No Orders' : 'Your Orders'}
      </div>
      <p>{orders.length} Orders</p>

      {orders.map(
        ({ id, amount, shippingAmount, images, timeStamp, items }) => (
          <Order
            key={id}
            id={id}
            amount={amount}
            shippingAmount={shippingAmount}
            images={images}
            timeStamp={timeStamp}
            items={items}
          />
        )
      )}
    </div>
  );
};

export default orders;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  if (!session) {
    return {
      props: {},
    };
  }
  const firebaseOrdersDb = await db
    .collection('users')
    .doc(session.user.email)
    .collection('orders')
    .orderBy('timeStamp', 'desc')
    .get();

  const orders = await Promise.all(
    firebaseOrdersDb.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      shippingAmount: order.data().amount_shipping,
      images: order.data().images,
      timeStamp: moment(order.data().timeStamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      session,
      orders,
    },
  };
}
