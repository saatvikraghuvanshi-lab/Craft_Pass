import React, { useState, useEffect } from 'react';
import { AppView, CraftProduct, VerificationRequest, OrderItem } from './types';
import { INITIAL_PRODUCTS, INITIAL_VERIFICATION_REQUESTS, ARTISAN_KAMLA_PROFILE, RECENT_ORDERS } from './data/mockData';
import { TopNavBar } from './components/TopNavBar';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { ProductDetailView } from './components/ProductDetailView';
import { VerifyCertificateView } from './components/VerifyCertificateView';
import { VerifierDashboardView } from './components/VerifierDashboardView';
import { ArtisanDashboardView } from './components/ArtisanDashboardView';
import { AuthModal } from './components/AuthModal';
import { getStoredSession, SupabaseUserSession } from './lib/supabase';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [currentSession, setCurrentSession] = useState<SupabaseUserSession>(getStoredSession);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CraftProduct[]>(INITIAL_PRODUCTS);
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>(
    INITIAL_VERIFICATION_REQUESTS
  );
  const [orders, setOrders] = useState<OrderItem[]>(RECENT_ORDERS);
  const [selectedProductId, setSelectedProductId] = useState<string>('prod-bagru-dupatta');
  const [activeCertificateId, setActiveCertificateId] = useState<string>('BG-2026-00142');

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProductId]);

  const selectedProduct =
    products.find((p) => p.id === selectedProductId) || products[0];

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setActiveCertificateId(prod.certificateId);
    }
    setCurrentView('product-detail');
  };

  const handleVerifyProduct = (certificateId: string) => {
    setActiveCertificateId(certificateId);
    setCurrentView('verify');
  };

  const handlePlaceOrder = (product: CraftProduct) => {
    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber: `#${Math.floor(4090 + Math.random() * 80)}`,
      productName: product.name,
      buyerName: 'Aarav Mehta',
      price: product.price,
      currency: product.currency,
      date: 'Just now',
      status: 'Processing',
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleAddNewProduct = (newProductData: Partial<CraftProduct>) => {
    const newId = `prod-${Date.now()}`;
    const certId = `BG-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const fullProduct: CraftProduct = {
      id: newId,
      certificateId: certId,
      name: newProductData.name || 'Handcrafted Masterpiece',
      category: newProductData.category || 'Dupatta',
      price: newProductData.price || 2400,
      currency: '₹',
      origin: newProductData.origin || 'Bagru, Rajasthan',
      region: newProductData.region || 'Rajasthan',
      material: newProductData.material || 'Organic Cotton',
      technique: newProductData.technique || 'Hand-block printing',
      craftingTime: newProductData.craftingTime || '8 hours',
      description: 'Authentic handcrafted piece preserving traditional artisanal techniques.',
      isVerified: true,
      verificationDate: 'August 2026',
      giTagLabel: 'Bagru Prints GI',
      isGiTagged: true,
      mainImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCznciwuiy7bfALVdjN-H8xb_uyMs8GuKLob5PxZTmtN6xF5yXLy3ziiTfFSzO8vTwlpYloqyH0YHG08WGUl26tql9D02trygGGoygB_S6kJheMwbvOMNhVYkugaxmMlYmJOXMVaf6dfmOkkl-znuFjCGG2vVChqNm9O3pzVEzKWk9tOn8azl4KpPS01D3jA5m4e8mZQxSDHmP5rIFFWIyqTNcDhd_y8BgBGU6-sFwfRfOfxxog04T7',
      artisanId: 'artisan-kamla',
      artisanName: 'Kamla Devi',
      artisanAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDTm9dYmIe1k0eS7GvT-6h3Rk2lJbQpU5pGz1e7c9_V3h6aJq6rK2k_Nl8oQ4sT3v9xY7mR1w-5uL0s8',
      artisanExperience: '32 YEARS EXPERIENCE',
      artisanBio:
        'Practicing traditional Bagru Dabu resist hand-block printing since age 14 in Jaipur district.',
      priceBreakdown: newProductData.priceBreakdown || {
        artisan: 1900,
        logistics: 300,
        craftpass: 200,
        currency: '₹',
      },
      verificationChecks: [
        { id: 'v1', label: 'Artisan identity verified', icon: 'how_to_reg', verified: true },
        { id: 'v2', label: 'Craft verified', icon: 'texture', verified: true },
        { id: 'v3', label: 'Origin recorded', icon: 'location_on', verified: true },
        { id: 'v4', label: 'Handmade process declared', icon: 'front_hand', verified: true },
      ],
      timeline: [
        { step: 1, title: 'Artisan Registered', date: 'Feb 2024', icon: 'person_add', status: 'completed' },
        { step: 2, title: 'Craft Verified', date: 'Mar 2024', icon: 'approval', status: 'completed' },
        { step: 3, title: 'Product Registered', date: 'Aug 2026', icon: 'inventory_2', status: 'completed' },
        { step: 4, title: 'CraftPass Issued', date: 'Aug 2026', icon: 'workspace_premium', status: 'completed' },
        { step: 5, title: 'Customer Verified', date: 'Pending Scan', icon: 'person_search', status: 'pending' },
      ],
    };

    setProducts((prev) => [fullProduct, ...prev]);

    // Also add to verifier queue
    const newReq: VerificationRequest = {
      id: `req-${Date.now()}`,
      certificateId: certId,
      productName: fullProduct.name,
      craftName: fullProduct.technique,
      artisanId: 'artisan-kamla',
      artisanName: 'Kamla Devi',
      artisanAvatar: fullProduct.artisanAvatar,
      artisanRegNumber: 'ART-2018-492 Active',
      region: fullProduct.origin,
      submittedTimeAgo: 'Just now',
      submissionDate: 'August 14, 2026',
      status: 'pending',
      giTagRegistered: true,
      giTagName: 'Registered (Bagru Prints)',
      declaredMaterials: [fullProduct.material, 'Natural Botanical Dyes'],
      declaredProcess: `${fullProduct.technique}, natural vat processing and sun dried`,
      mainImage: fullProduct.mainImage,
      processImages: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDTm9dYmIe1k0eS7GvT-6h3Rk2lJbQpU5pGz1e7c9_V3h6aJq6rK2k_Nl8oQ4sT3v9xY7mR1w-5uL0s8',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCznciwuiy7bfALVdjN-H8xb_uyMs8GuKLob5PxZTmtN6xF5yXLy3ziiTfFSzO8vTwlpYloqyH0YHG08WGUl26tql9D02trygGGoygB_S6kJheMwbvOMNhVYkugaxmMlYmJOXMVaf6dfmOkkl-znuFjCGG2vVChqNm9O3pzVEzKWk9tOn8azl4KpPS01D3jA5m4e8mZQxSDHmP5rIFFWIyqTNcDhd_y8BgBGU6-sFwfRfOfxxog04T7',
      ],
      checks: {
        artisanIdentity: true,
        originAndGi: true,
        processAndMaterials: true,
      },
    };
    setVerificationRequests((prev) => [newReq, ...prev]);
  };

  const handleApproveRequest = (requestId: string, notes: string) => {
    setVerificationRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, status: 'verified', verifierNotes: notes }
          : req
      )
    );
  };

  const handleRequestMoreInfo = (requestId: string, notes: string) => {
    setVerificationRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, status: 'needs_info', verifierNotes: notes }
          : req
      )
    );
  };

  const pendingCount = verificationRequests.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#271811] flex flex-col font-sans selection:bg-[#ffce51] selection:text-[#271811]">
      {/* Top App Bar Navigation */}
      <TopNavBar
        currentView={currentView}
        onNavigate={setCurrentView}
        pendingRequestsCount={pendingCount}
        currentSession={currentSession}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Auth & Persona Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentSession={currentSession}
        onSessionChange={setCurrentSession}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={setCurrentView}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'explore' && (
          <ExploreView
            products={products}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'product-detail' && (
          <ProductDetailView
            product={selectedProduct}
            onNavigate={setCurrentView}
            onVerifyProduct={handleVerifyProduct}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {currentView === 'verify' && (
          <VerifyCertificateView
            products={products}
            activeCertificateId={activeCertificateId}
            onSelectCertificate={setActiveCertificateId}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'verifier-dashboard' && (
          <VerifierDashboardView
            requests={verificationRequests}
            onApproveRequest={handleApproveRequest}
            onRequestMoreInfo={handleRequestMoreInfo}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'artisan-dashboard' && (
          <ArtisanDashboardView
            artisan={ARTISAN_KAMLA_PROFILE}
            orders={orders}
            products={products}
            onAddNewProduct={handleAddNewProduct}
            onNavigate={setCurrentView}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <BottomNavBar currentView={currentView} onNavigate={setCurrentView} />

      {/* Footer */}
      <footer className="bg-[#fff1eb] border-t border-[#dbc1b8] py-10 px-4 md:px-12 text-[#55433c] text-[13px] hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-serif-display text-[20px] font-semibold text-[#994422]">
              CraftPass
            </span>
            <span className="text-[#88726b]">•</span>
            <span>Digital Provenance for Heritage Artisan Guilds</span>
          </div>

          <div className="flex items-center space-x-6 text-[13px]">
            <button
              onClick={() => setCurrentView('home')}
              className="hover:text-[#994422] transition-colors"
            >
              Manifesto
            </button>
            <button
              onClick={() => setCurrentView('explore')}
              className="hover:text-[#994422] transition-colors"
            >
              Explore
            </button>
            <button
              onClick={() => setCurrentView('verify')}
              className="hover:text-[#994422] transition-colors"
            >
              Verify Provenance
            </button>
            <button
              onClick={() => setCurrentView('verifier-dashboard')}
              className="hover:text-[#994422] transition-colors"
            >
              Verifier Desk
            </button>
            <button
              onClick={() => setCurrentView('artisan-dashboard')}
              className="hover:text-[#994422] transition-colors"
            >
              Artisan Studio
            </button>
          </div>

          <div className="text-[#88726b] text-[12px]">
            © 2026 CraftPass Foundation • Preserving Indian Mastercrafts
          </div>
        </div>
      </footer>
    </div>
  );
}
