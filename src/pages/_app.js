import { Provider } from 'react-redux';
import { store } from '../app/store';
import Layout from '../components/Layout';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <div suppressHydrationWarning>
        <Provider store={store}>
          {typeof window === 'undefined' ? null : <Component {...pageProps} />}
        </Provider>
      </div>
    </Layout>
  );
};

export default MyApp;
