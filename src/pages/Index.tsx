import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { ServerOverlay } from '@/components/ServerOverlay';
import { CartPanel } from '@/components/CartPanel';
import { GuideModal } from '@/components/GuideModal';
import { CustomCursor } from '@/components/CustomCursor';
import { Footer } from '@/components/Footer';
import { Home } from './Home';
import { Shop } from './Shop';
import { Rules } from './Rules';
import { Contacts } from './Contacts';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white font-body overflow-x-hidden flex flex-col">
      <CustomCursor />
      <ServerOverlay />
      <Navbar />
      <CartPanel />
      <GuideModal />

      <main className="flex-1">
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/shop"     element={<Shop />} />
          <Route path="/rules"    element={<Rules />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default Index;