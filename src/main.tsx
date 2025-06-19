import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/globals.css';

import Home from '@/app/home/page';
import QrCode from '@/app/qrcode/page';
import Passenger from '@/app/passenger/page';
import Conductor from '@/app/conductor/page';
import Operator from '@/app/operator/page';
import NotFound from '@/app/NotFound';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qrcode" element={<QrCode />} />
        <Route path="/passenger" element={<Passenger />} />
        <Route path="/conductor" element={<Conductor />} />
        <Route path="/operator" element={<Operator />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </StrictMode>
);
