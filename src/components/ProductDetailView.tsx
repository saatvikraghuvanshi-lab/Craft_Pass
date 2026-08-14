import React, { useState } from 'react';
import { CraftProduct, AppView } from '../types';
import { HeritageDivider } from './HeritageDivider';
import {
  ArrowLeft,
  ShieldCheck,
  ShoppingBag,
  QrCode,
  MapPin,
  User,
  Hammer,
  Clock,
  Sparkles,
  Truck,
  CheckCircle2,
  X,
  ArrowRight,
  Award,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: CraftProduct;
  onNavigate: (view: AppView) => void;
  onVerifyProduct: (certificateId: string) => void;
  onPlaceOrder: (product: CraftProduct) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onNavigate,
  onVerifyProduct,
  onPlaceOrder,
}) => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyerName, setBuyerName] = useState('Aarav Mehta');
  const [buyerEmail, setBuyerEmail] = useState('aarav.mehta@example.com');
  const [buyerAddress, setBuyerAddress] = useState('14 Rajpath Enclave, Bengaluru, 560001');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaceOrder(product);
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setShowBuyModal(false);
    }, 2400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12 pb-28">
      {/* Back button breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-[14px]">
        <button
          onClick={() => onNavigate('explore')}
          className="text-[#994422] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Curations</span>
        </button>
        <span className="text-[#88726b]">/</span>
        <span className="text-[#55433c]">{product.category}</span>
        <span className="text-[#88726b]">/</span>
        <span className="text-[#271811] font-medium truncate max-w-[200px]">{product.name}</span>
      </div>

      {/* Hero Section: Photo & Core Info (2 Columns on Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Large Product Photo */}
        <div className="md:col-span-7 h-[420px] sm:h-[500px] md:h-[620px] rounded-[14px] overflow-hidden relative shadow-[0_8px_32px_rgba(59,42,34,0.08)] border border-[#dbc1b8]/60 bg-[#ffeae1]">
          <img
            src={product.mainImage}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Verification Badge (Mustard) */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-[#D4A72C] text-[#271811] px-4 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>{product.isGiTagged ? 'GI Tagged & Verified' : 'CraftPass Verified'}</span>
            </div>
          </div>

          {/* Certificate Tag ID pill */}
          <div className="absolute bottom-4 right-4 bg-[#271811]/85 text-white px-3 py-1 rounded text-[12px] font-mono tracking-widest backdrop-blur-xs">
            ID: {product.certificateId}
          </div>
        </div>

        {/* Product Info & Actions Column */}
        <div className="md:col-span-5 flex flex-col justify-center py-2 md:pl-4">
          <div className="text-[13px] font-bold text-[#88726b] uppercase tracking-widest mb-2">
            {product.category}
          </div>
          <h1 className="font-serif-display text-[32px] sm:text-[40px] md:text-[46px] text-[#994422] mb-3 leading-[1.15] font-medium">
            {product.name}
          </h1>

          <div className="font-serif-display text-[28px] md:text-[32px] font-semibold text-[#271811] mb-6">
            {product.currency}
            {product.price.toLocaleString()}
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3.5 mb-8">
            <button
              id="product-buy-reserve-btn"
              onClick={() => setShowBuyModal(true)}
              className="w-full bg-[#b85c38] text-white font-semibold text-[15px] py-4 rounded-[6px] hover:-translate-y-0.5 hover:bg-[#994422] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy / Reserve</span>
            </button>

            <button
              id="product-verify-craft-btn"
              onClick={() => onVerifyProduct(product.certificateId)}
              className="w-full bg-transparent border border-[#3e2d24] text-[#3e2d24] font-semibold text-[15px] py-4 rounded-[6px] hover:-translate-y-0.5 hover:bg-[#fff1eb] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-[#994422]" />
              <span>Verify this Craft</span>
            </button>
          </div>

          {/* Metadata Specification Box (Sand Tint) */}
          <div className="bg-[#DCC9A3]/25 rounded-[12px] p-6 border border-[#dbc1b8] space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#dbc1b8]/60 pb-3">
              <span className="text-[#55433c] text-[14px] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#994422]" />
                Origin
              </span>
              <span className="font-semibold text-[#271811] text-[14px]">{product.origin}</span>
            </div>

            <div className="flex justify-between items-center border-b border-[#dbc1b8]/60 pb-3">
              <span className="text-[#55433c] text-[14px] flex items-center gap-2">
                <User className="w-4 h-4 text-[#994422]" />
                Artisan
              </span>
              <span className="font-semibold text-[#271811] text-[14px]">{product.artisanName}</span>
            </div>

            <div className="flex justify-between items-start border-b border-[#dbc1b8]/60 pb-3">
              <span className="text-[#55433c] text-[14px] flex items-center gap-2">
                <Hammer className="w-4 h-4 text-[#994422]" />
                Technique
              </span>
              <span className="font-semibold text-[#271811] text-[14px] text-right max-w-[210px]">
                {product.technique}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#55433c] text-[14px] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#994422]" />
                Time
              </span>
              <span className="font-semibold text-[#271811] text-[14px]">{product.craftingTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Heritage Divider */}
      <HeritageDivider className="my-8" />

      {/* Meet the Maker Section */}
      <section className="my-12 md:my-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Artisan Portrait Frame */}
          <div className="md:col-span-5 relative flex justify-center">
            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-md border-4 border-[#fff8f6] ring-2 ring-[#dbc1b8]/70">
              <img
                src={product.artisanAvatar}
                alt={product.artisanName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-2 bg-[#D4A72C] text-[#271811] px-3.5 py-1 rounded-full text-[12px] font-bold shadow-md flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Master Artisan</span>
            </div>
          </div>

          {/* Artisan Story */}
          <div className="md:col-span-7">
            <h2 className="font-serif-display text-[28px] sm:text-[34px] text-[#994422] font-medium mb-1">
              Meet the maker
            </h2>
            <h3 className="font-serif-display text-[24px] font-semibold text-[#271811] mb-2">
              {product.artisanName}
            </h3>
            <p className="text-[12px] font-bold text-[#88726b] uppercase tracking-widest mb-4">
              {product.artisanExperience}
            </p>
            <p className="text-[16px] text-[#55433c] mb-6 leading-relaxed">
              {product.artisanBio}
            </p>
            <button
              onClick={() => onNavigate('artisan-dashboard')}
              className="bg-transparent text-[#994422] font-semibold text-[14px] border-b-2 border-[#994422] pb-1 hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer"
            >
              <span>View Artisan Profile & Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Price Transparency Bento Grid: "Where your ₹1,850 goes" */}
      <section className="my-14 bg-[#DCC9A3]/15 p-8 md:p-12 rounded-[16px] border border-[#dbc1b8]">
        <h2 className="font-serif-display text-[28px] md:text-[34px] text-[#994422] mb-8 text-center font-medium">
          Where your {product.currency}{product.price.toLocaleString()} goes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Artisan Share Card */}
          <div className="bg-[#fff8f6] rounded-[12px] p-6 shadow-xs border border-[#dbc1b8]/50 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#b85c38] text-white flex items-center justify-center mb-4 shadow-xs">
              <User className="w-7 h-7" />
            </div>
            <div className="font-serif-display text-[28px] font-semibold text-[#994422] mb-1">
              {product.currency}{product.priceBreakdown.artisan.toLocaleString()}
            </div>
            <div className="text-[13px] font-bold text-[#271811] mb-2 uppercase tracking-wider">
              Artisan
            </div>
            <p className="text-[14px] text-[#55433c] leading-relaxed">
              Direct payment to {product.artisanName} for her time, skill, and raw materials. (
              {Math.round((product.priceBreakdown.artisan / product.price) * 100)}%)
            </p>
          </div>

          {/* Logistics Card */}
          <div className="bg-[#fff8f6] rounded-[12px] p-6 shadow-xs border border-[#dbc1b8]/50 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#ffdf98] text-[#5a4300] flex items-center justify-center mb-4 shadow-xs">
              <Truck className="w-7 h-7" />
            </div>
            <div className="font-serif-display text-[28px] font-semibold text-[#994422] mb-1">
              {product.currency}{product.priceBreakdown.logistics.toLocaleString()}
            </div>
            <div className="text-[13px] font-bold text-[#271811] mb-2 uppercase tracking-wider">
              Logistics
            </div>
            <p className="text-[14px] text-[#55433c] leading-relaxed">
              Eco-friendly packaging, quality inspection, and secure insured delivery to your doorstep.
            </p>
          </div>

          {/* Platform Maintenance Card */}
          <div className="bg-[#fff8f6] rounded-[12px] p-6 shadow-xs border border-[#dbc1b8]/50 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#faddd0] text-[#7b2f0e] flex items-center justify-center mb-4 shadow-xs">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="font-serif-display text-[28px] font-semibold text-[#994422] mb-1">
              {product.currency}{product.priceBreakdown.craftpass.toLocaleString()}
            </div>
            <div className="text-[13px] font-bold text-[#271811] mb-2 uppercase tracking-wider">
              CraftPass
            </div>
            <p className="text-[14px] text-[#55433c] leading-relaxed">
              Verification audit, provenance certificate registry, and decentralized platform maintenance.
            </p>
          </div>
        </div>
      </section>

      {/* Buy / Reserve Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 z-50 bg-[#271811]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fff8f6] border border-[#dbc1b8] rounded-[14px] max-w-lg w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {orderSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#D4A72C] text-[#271811] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-serif-display text-[26px] text-[#271811] font-semibold">
                  Reservation Confirmed!
                </h3>
                <p className="text-[15px] text-[#55433c]">
                  Your direct payment of {product.currency}{product.priceBreakdown.artisan.toLocaleString()} has been routed to {product.artisanName}'s verified bank account.
                </p>
                <div className="p-3 bg-[#fff1eb] border border-[#dbc1b8] rounded-[8px] text-[13px] font-mono text-[#271811]">
                  Order ID: #{Math.floor(4000 + Math.random() * 900)} • Certificate Tagged
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-serif-display text-[24px] text-[#271811] font-semibold">
                      Reserve Authentic Piece
                    </h3>
                    <p className="text-[13px] text-[#55433c]">
                      Direct purchase with verified artisan provenance
                    </p>
                  </div>
                  <button
                    onClick={() => setShowBuyModal(false)}
                    className="text-[#88726b] hover:text-[#271811] p-1 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Summary Row */}
                <div className="flex items-center gap-4 p-3.5 bg-[#fff1eb] rounded-[8px] border border-[#dbc1b8] mb-6">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="w-14 h-14 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-serif-display text-[17px] font-semibold text-[#271811]">
                      {product.name}
                    </h4>
                    <p className="text-[12px] text-[#55433c]">
                      By {product.artisanName} • {product.origin}
                    </p>
                  </div>
                  <div className="font-bold text-[#994422] text-[16px]">
                    {product.currency}{product.price.toLocaleString()}
                  </div>
                </div>

                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#55433c] uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full bg-white border border-[#dbc1b8] focus:border-[#994422] rounded-[6px] p-2.5 text-[14px] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#55433c] uppercase tracking-wider mb-1">
                      Email for Digital Certificate
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full bg-white border border-[#dbc1b8] focus:border-[#994422] rounded-[6px] p-2.5 text-[14px] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#55433c] uppercase tracking-wider mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerAddress}
                      onChange={(e) => setBuyerAddress(e.target.value)}
                      className="w-full bg-white border border-[#dbc1b8] focus:border-[#994422] rounded-[6px] p-2.5 text-[14px] outline-none"
                    />
                  </div>

                  {/* Payment Fair Split Notice */}
                  <div className="p-3 bg-[#DCC9A3]/20 rounded-[6px] border border-[#dbc1b8] text-[12px] text-[#3e2d24]">
                    <span className="font-bold">Transparent Split:</span> {product.currency}{product.priceBreakdown.artisan} to artisan • {product.currency}{product.priceBreakdown.logistics} logistics • {product.currency}{product.priceBreakdown.craftpass} platform registry.
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#b85c38] text-white font-semibold text-[15px] py-3.5 rounded-[6px] hover:bg-[#994422] transition-colors mt-2 cursor-pointer"
                  >
                    Confirm Order & Issue Certificate ({product.currency}{product.price.toLocaleString()})
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
