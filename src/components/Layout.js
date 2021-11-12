import Head from 'next/head';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div
      className={`bg-gray-100 no-scrollbar h-screen overflow-hidden ${
        window.location.pathname === '/' && 'overflow-y-scroll'
      }`}
    >
      <Head>
        <title>Amazon clone</title>
      </Head>
      {window.location.pathname !== '/checkout' && <Header />}
      {children}
    </div>
  );
};

export default Layout;
