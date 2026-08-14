import React, { useState } from 'react';
import { ArtisanProfile, OrderItem, CraftProduct, AppView } from '../types';
import { HeritageDivider } from './HeritageDivider';
import {
  Plus,
  Package,
  CheckCircle2,
  Truck,
  Wallet,
  ShoppingBag,
  Award,
  Sparkles,
  X,
  FileText,
  Check,
  Loader2,
  Tag,
} from 'lucide-react';

interface ArtisanDashboardViewProps {
  artisan: ArtisanProfile;
  orders: OrderItem[];
  products: CraftProduct[];
  onAddNewProduct: (newProduct: Partial<CraftProduct>) => void;
  onNavigate: (view: AppView) => void;
}

export const ArtisanDashboardView: React.FC<ArtisanDashboardViewProps> = ({
  artisan,
  orders,
  products,
  onAddNewProduct,
  onNavigate,
}) => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAllOrdersModal, setShowAllOrdersModal] = useState(false);
  const [showCertificatesModal, setShowCertificatesModal] = useState(false);

  // Form states for new product
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Dupatta');
  const [price, setPrice] = useState('2400');
  const [technique, setTechnique] = useState('Dabu hand-block printing');
  const [craftingTime, setCraftingTime] = useState('10 hours');
  const [declaredMaterials, setDeclaredMaterials] = useState('100% Chanderi Silk, Natural Madder Red Dye');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiGeneratedBio, setAiGeneratedBio] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleGenerateAiStory = async () => {
    if (!productName) {
      alert('Please enter a product name first to generate an artisan story.');
      return;
    }
    setAiGenerating(true);
    try {
      const res = await fetch('/api/ai/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artisanName: artisan.name,
          craftName: productName,
          region: artisan.location,
          technique,
          materials: declaredMaterials,
        }),
      });
      const data = await res.json();
      if (data.story) {
        setAiGeneratedBio(data.story);
      }
    } catch (err) {
      console.error('Failed to generate AI story:', err);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = parseFloat(price) || 2000;
    const artisanShare = Math.round(numericPrice * 0.78);
    const logisticsShare = Math.round(numericPrice * 0.12);
    const platformShare = numericPrice - artisanShare - logisticsShare;

    onAddNewProduct({
      name: productName,
      category,
      price: numericPrice,
      currency: '₹',
      origin: artisan.location,
      region: 'Rajasthan',
      material: declaredMaterials,
      technique,
      craftingTime,
      artisanId: artisan.id,
      artisanName: artisan.name,
      artisanAvatar: artisan.avatar,
      artisanExperience: `${artisan.experienceYears} Years Experience`,
      artisanBio: aiGeneratedBio || artisan.bio,
      priceBreakdown: {
        artisan: artisanShare,
        logistics: logisticsShare,
        craftpass: platformShare,
        currency: '₹',
      },
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowAddProductModal(false);
      setProductName('');
      setAiGeneratedBio('');
    }, 2000);
  };

  const totalEarnings = orders.reduce((acc, curr) => acc + curr.price, 18800);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12 pb-28">
      {/* Greeting & Primary Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="font-serif-display text-[32px] sm:text-[42px] md:text-[48px] text-[#994422] mb-1 font-medium">
            Good morning, {artisan.name.split(' ')[0]}.
          </h1>
          <p className="text-[17px] text-[#55433c]">
            Here is a summary of your craft business today.
          </p>
        </div>

        <button
          id="add-product-open-btn"
          onClick={() => setShowAddProductModal(true)}
          className="w-full md:w-auto bg-[#b85c38] hover:bg-[#994422] text-white text-[14px] font-semibold px-7 py-3.5 rounded-full flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all shadow-[0_4px_12px_rgba(59,42,34,0.12)] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Metrics Bento Grid (4 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
        {/* Products */}
        <div className="bg-[#DCC9A3] p-5 md:p-6 rounded-[12px] flex flex-col justify-between min-h-[140px] border border-[#d2bc8f] shadow-xs hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start">
            <span className="text-[12px] font-bold text-[#271811] uppercase tracking-wider">
              Products
            </span>
            <Package className="w-5 h-5 text-[#994422]" />
          </div>
          <div className="font-serif-display text-[40px] md:text-[46px] font-bold text-[#994422] mt-2 leading-none">
            {products.length}
          </div>
        </div>

        {/* Verified */}
        <div className="bg-[#ffce51] p-5 md:p-6 rounded-[12px] flex flex-col justify-between min-h-[140px] border border-[#e0b23b] shadow-xs hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start">
            <span className="text-[12px] font-bold text-[#735700] uppercase tracking-wider">
              Verified
            </span>
            <CheckCircle2 className="w-5 h-5 text-[#735700]" />
          </div>
          <div className="font-serif-display text-[40px] md:text-[46px] font-bold text-[#735700] mt-2 leading-none">
            {products.filter((p) => p.isVerified).length}
          </div>
        </div>

        {/* Orders */}
        <div className="bg-[#DCC9A3] p-5 md:p-6 rounded-[12px] flex flex-col justify-between min-h-[140px] border border-[#d2bc8f] shadow-xs hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start">
            <span className="text-[12px] font-bold text-[#271811] uppercase tracking-wider">
              Orders
            </span>
            <Truck className="w-5 h-5 text-[#994422]" />
          </div>
          <div className="font-serif-display text-[40px] md:text-[46px] font-bold text-[#994422] mt-2 leading-none">
            {orders.length + 5}
          </div>
        </div>

        {/* Earnings */}
        <div className="bg-[#ffe2d6] p-5 md:p-6 rounded-[12px] flex flex-col justify-between min-h-[140px] border border-[#dbc1b8] shadow-xs hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start">
            <span className="text-[12px] font-bold text-[#55433c] uppercase tracking-wider">
              Earnings
            </span>
            <Wallet className="w-5 h-5 text-[#615d54]" />
          </div>
          <div className="font-serif-display text-[30px] md:text-[34px] font-bold text-[#271811] mt-2 leading-none">
            ₹{totalEarnings.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Heritage Divider */}
      <HeritageDivider className="my-8" />

      {/* Bottom Section: Recent Orders & Verification Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Recent Orders Card */}
        <div className="bg-[#fff8f6] border border-[#dbc1b8] rounded-[14px] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-serif-display text-[22px] font-semibold text-[#994422] mb-5 border-b border-[#dbc1b8]/60 pb-3">
              Recent Orders
            </h3>

            <div className="space-y-3.5">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between items-center py-2.5 border-b border-[#ffe2d6] last:border-0"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#ffe2d6] flex items-center justify-center text-[#994422]">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#271811]">
                        {order.productName}
                      </p>
                      <p className="text-[12px] text-[#55433c]">
                        Order {order.orderNumber} • {order.buyerName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[14px] font-bold text-[#775a00] block">
                      {order.currency}{order.price.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-[#88726b]">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            id="view-all-orders-btn"
            onClick={() => setShowAllOrdersModal(true)}
            className="mt-6 w-full py-3 border border-[#994422] text-[#994422] rounded-full text-[13px] font-semibold hover:bg-[#fff1eb] transition-colors cursor-pointer"
          >
            View All Orders ({orders.length + 5})
          </button>
        </div>

        {/* Artisan Status Card (Sand Canvas) */}
        <div className="bg-[#DCC9A3] border border-[#d2bc8f] rounded-[14px] p-6 md:p-8 flex flex-col justify-center items-center text-center shadow-xs">
          <div className="w-16 h-16 bg-[#ffce51] rounded-full flex items-center justify-center mb-4 shadow-xs border border-[#e0b23b]">
            <Award className="w-8 h-8 text-[#735700]" />
          </div>

          <h3 className="font-serif-display text-[24px] font-semibold text-[#271811] mb-2">
            Artisan Status: Verified
          </h3>

          <p className="text-[14px] text-[#3e2d24] mb-6 max-w-sm leading-relaxed">
            Your CraftPass digital certificate is active. Buyers can verify the authenticity of your {products.length} listed products worldwide.
          </p>

          <button
            id="manage-certificates-btn"
            onClick={() => setShowCertificatesModal(true)}
            className="bg-[#b85c38] hover:bg-[#994422] text-white text-[13px] font-semibold px-8 py-3 rounded-full transition-colors shadow-xs cursor-pointer"
          >
            Manage Certificates
          </button>
        </div>
      </div>

      {/* Add Product Modal with AI Story Generation */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-[#271811]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fff8f6] border border-[#dbc1b8] rounded-[14px] max-w-lg w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {formSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#ffce51] text-[#735700] flex items-center justify-center mx-auto shadow-xs">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-[24px] font-semibold text-[#271811]">
                  Craft Submitted for Verification!
                </h3>
                <p className="text-[14px] text-[#55433c]">
                  Our verifiers have received your documentation and will audit the GI registry within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="font-serif-display text-[24px] font-semibold text-[#271811]">
                      Register Craft for Provenance
                    </h3>
                    <p className="text-[13px] text-[#55433c]">
                      Submit materials and craft technique to generate immutable certificate
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddProductModal(false)}
                    className="text-[#88726b] hover:text-[#271811] p-1 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#55433c] uppercase tracking-wider mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Indigo Dabu Printed Silk Stole"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full bg-white border border-[#dbc1b8] focus:border-[#994422] rounded-[6px] p-2.5 text-[14px] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-bold text-[#55433c] uppercase tracking-wider mb-1">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-white border border-[#dbc1b8] rounded-[6px] p-2.5 text-[14px] outline-none"
                      >
                        <option value="Dupatta">Dupatta / Stole</option>
                        <option value="Saree">Saree</option>
                        <option value="Pottery">Pottery / Ceramics</option>
                        <option value="Textiles">Shawls / Textiles</option>
                        <option value="Woodwork">Woodwork</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-[#55433c] uppercase tracking-wider mb-1">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-white border border-[#dbc1b8] focus:border-[#994422] rounded-[6px] p-2.5 text-[14px] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#55433c] uppercase tracking-wider mb-1">
                      Crafting Technique
                    </label>
                    <input
                      type="text"
                      required
                      value={technique}
                      onChange={(e) => setTechnique(e.target.value)}
                      className="w-full bg-white border border-[#dbc1b8] focus:border-[#994422] rounded-[6px] p-2.5 text-[14px] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#55433c] uppercase tracking-wider mb-1">
                      Declared Materials
                    </label>
                    <input
                      type="text"
                      required
                      value={declaredMaterials}
                      onChange={(e) => setDeclaredMaterials(e.target.value)}
                      className="w-full bg-white border border-[#dbc1b8] focus:border-[#994422] rounded-[6px] p-2.5 text-[14px] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#55433c] uppercase tracking-wider mb-1">
                      Estimated Crafting Time
                    </label>
                    <input
                      type="text"
                      required
                      value={craftingTime}
                      onChange={(e) => setCraftingTime(e.target.value)}
                      className="w-full bg-white border border-[#dbc1b8] focus:border-[#994422] rounded-[6px] p-2.5 text-[14px] outline-none"
                    />
                  </div>

                  {/* Gemini AI Storyteller Feature */}
                  <div className="p-3.5 bg-[#fff1eb] border border-[#dbc1b8] rounded-[8px] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] font-bold text-[#994422] flex items-center gap-1.5 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Artisan Storyteller (Gemini)
                      </span>
                      <button
                        type="button"
                        onClick={handleGenerateAiStory}
                        disabled={aiGenerating}
                        className="text-[11px] font-bold bg-[#994422] text-white px-2.5 py-1 rounded flex items-center gap-1 hover:bg-[#b85c38] transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {aiGenerating ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Sparkles className="w-3 h-3" />
                        )}
                        {aiGenerating ? 'Generating...' : 'Auto-Generate Story'}
                      </button>
                    </div>
                    {aiGeneratedBio && (
                      <p className="text-[12px] text-[#55433c] bg-white p-2.5 rounded border border-[#dbc1b8] italic">
                        "{aiGeneratedBio}"
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#b85c38] text-white py-3.5 rounded-[6px] font-semibold text-[14px] hover:bg-[#994422] transition-colors mt-2 cursor-pointer"
                  >
                    Submit for Verification & Issue Tag
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Certificates Modal */}
      {showCertificatesModal && (
        <div className="fixed inset-0 z-50 bg-[#271811]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fff8f6] border border-[#dbc1b8] rounded-[14px] max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#dbc1b8]">
              <h3 className="font-serif-display text-[22px] font-semibold text-[#271811]">
                Active CraftPass Registry Certificates
              </h3>
              <button
                onClick={() => setShowCertificatesModal(false)}
                className="text-[#88726b] hover:text-[#271811] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3.5 bg-white rounded-[8px] border border-[#dbc1b8] flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-[#271811] text-[14px]">{prod.name}</p>
                    <p className="text-[12px] font-mono text-[#88726b] flex items-center gap-1">
                      <Tag className="w-3 h-3 text-[#994422]" />
                      {prod.certificateId}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowCertificatesModal(false);
                      onNavigate('verify');
                    }}
                    className="text-[12px] text-[#994422] font-semibold underline hover:text-[#b85c38] cursor-pointer"
                  >
                    View Tag
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Orders Modal */}
      {showAllOrdersModal && (
        <div className="fixed inset-0 z-50 bg-[#271811]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fff8f6] border border-[#dbc1b8] rounded-[14px] max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#dbc1b8]">
              <h3 className="font-serif-display text-[22px] font-semibold text-[#271811]">
                Order Ledger
              </h3>
              <button
                onClick={() => setShowAllOrdersModal(false)}
                className="text-[#88726b] hover:text-[#271811] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-3.5 bg-white rounded-[8px] border border-[#dbc1b8] flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-[#271811] text-[14px]">{ord.productName}</p>
                    <p className="text-[12px] text-[#55433c]">
                      Order {ord.orderNumber} • {ord.buyerName} • {ord.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[14px] font-bold text-[#775a00]">
                      {ord.currency}{ord.price.toLocaleString()}
                    </span>
                    <span className="block text-[11px] text-[#88726b]">{ord.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
