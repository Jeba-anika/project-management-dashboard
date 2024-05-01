

import "@/styles/globals.css";
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import 'tailwindcss/tailwind.css';


import {
  QueryClient,
  QueryClientProvider
} from 'react-query';

// Create a client
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(<QueryClientProvider client={queryClient}><ConfigProvider>
    <Component {...pageProps} />
  </ConfigProvider></QueryClientProvider>);
}
