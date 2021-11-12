import { Provider } from 'react-redux';
import { store } from '../app/store';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { Provider as AuthProvider } from 'next-auth/client';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
let persistor = persistStore(store);

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <div suppressHydrationWarning>
              {typeof window === 'undefined' ? null : (
                <Component {...pageProps} />
              )}
            </div>
          </Layout>
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
};

export default MyApp;
