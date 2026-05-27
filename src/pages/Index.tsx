import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { ServerOverlay } from '@/components/ServerOverlay';
import { CartPanel } from '@/components/CartPanel';
import { GuideModal } from '@/components/GuideModal';
import { CustomCursor } from '@/components/CustomCursor';
import { Home } from './Home';
import { Shop } from './Shop';
import { Rules } from './Rules';
import { Contacts } from './Contacts';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white font-body overflow-x-hidden">
      <CustomCursor />
      <ServerOverlay />
      <Navbar />
      <CartPanel />
      <GuideModal />

      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/shop"     element={<Shop />} />
        <Route path="/rules"    element={<Rules />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </div>
  );
};

export default Index;
