import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import '@/globals.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Loading from './components/Loading';

const Home = lazy(() => import('@/app/home/page'));
const QrCode = lazy(() => import('@/app/qrcode/page'));
const Passenger = lazy(() => import('@/app/passenger/page'));
const Conductor = lazy(() => import('@/app/conductor/page'));
const Operator = lazy(() => import('@/app/operator/page'));
const NotFound = lazy(() => import('@/app/NotFound'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qrcode" element={<QrCode />} />
          <Route path="/passenger/:token" element={<Passenger />} />
          <Route path="/conductor" element={<Conductor />} />
          <Route path="/operator" element={<Operator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
    <Toaster richColors />
  </StrictMode>
);
