import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'UniCore',
  description: 'University Management System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}