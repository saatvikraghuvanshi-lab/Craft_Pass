import React, { useState, useMemo } from 'react';
import { CraftProduct } from '../types';
import { Search, X, ChevronDown, CheckCircle2, MapPin, ChevronRight, SearchX, Layers } from 'lucide-react';

interface ExploreViewProps {
  products: CraftProduct[];
  onSelectProduct: (productId: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({ products, onSelectProduct }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedCraftFilter, setSelectedCraftFilter] = useState<string>('all');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string>('all');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Available unique filter items
  const craftCategories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ['all', ...cats];
  }, [products]);

  const regions = useMemo(() => {
    const regs = Array.from(new Set(products.map((p) => p.region)));
    return ['all', ...regs];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.material.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesVerified = !verifiedOnly || item.isVerified;

      const matchesCraft =
        selectedCraftFilter === 'all' || item.category.toLowerCase() === selectedCraftFilter.toLowerCase();

      const matchesRegion =
        selectedRegionFilter === 'all' || item.region.toLowerCase() === selectedRegionFilter.toLowerCase();

      let matchesPrice = true;
      if (selectedPriceFilter === 'under-2000') {
        matchesPrice = item.price < 2000;
      } else if (selectedPriceFilter === '2000-5000') {
        matchesPrice = item.price >= 2000 && item.price <= 5000;
      } else if (selectedPriceFilter === 'above-5000') {
        matchesPrice = item.price > 5000;
      }

      return matchesSearch && matchesVerified && matchesCraft && matchesRegion && matchesPrice;
    });
  }, [
    products,
    searchQuery,
    verifiedOnly,
    selectedCraftFilter,
    selectedRegionFilter,
    selectedPriceFilter,
  ]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-16 pb-24">
      {/* Header Section */}
      <div className="mb-10 md:mb-14 text-center md:text-left max-w-3xl">
        <h1 className="font-serif-display text-[32px] sm:text-[42px] md:text-[50px] text-[#994422] font-medium mb-3 tracking-tight">
          Discover authentic craft.
        </h1>
        <p className="text-[17px] md:text-[19px] text-[#55433c] leading-relaxed">
          Every product carries the story of the hands and place behind it.
        </p>
      </div>

      {/* Search and Filters Bar (Sticky) */}
      <div className="sticky top-[68px] z-30 bg-[#fff8f6]/95 backdrop-blur-md py-4 mb-10 border-b border-[#dbc1b8]/50 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-96 group">
          <Search className="w-4 h-4 text-[#88726b] absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#994422] transition-colors" />
          <input
            id="craft-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crafts, artisans, regions..."
            className="w-full bg-[#fff1eb] border-b-2 border-[#dbc1b8] focus:border-[#994422] pb-2 pl-9 pr-8 text-[#271811] placeholder:text-[#88726b] focus:outline-none font-medium text-[14px] transition-colors rounded-t-sm pt-2"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#88726b] hover:text-[#271811]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Overflow Container */}
        <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <div className="flex items-center space-x-2 md:space-x-3 whitespace-nowrap min-w-max">
            {/* Craft Filter */}
            <div className="relative">
              <button
                id="filter-craft-btn"
                onClick={() => toggleDropdown('craft')}
                className={`px-4 py-2 rounded-full border text-[13px] font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  selectedCraftFilter !== 'all'
                    ? 'bg-[#b85c38] text-white border-[#b85c38]'
                    : 'border-[#dbc1b8] text-[#55433c] hover:border-[#994422] hover:bg-[#fff1eb]'
                }`}
              >
                <span>
                  {selectedCraftFilter === 'all'
                    ? 'Craft'
                    : selectedCraftFilter.charAt(0).toUpperCase() + selectedCraftFilter.slice(1)}
                </span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'craft' && (
                <div className="absolute top-full left-0 mt-2 bg-[#fff8f6] border border-[#dbc1b8] rounded-[8px] shadow-lg py-2 z-50 min-w-[160px]">
                  {craftCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCraftFilter(cat);
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#fff1eb] transition-colors cursor-pointer ${
                        selectedCraftFilter === cat ? 'text-[#994422] font-bold' : 'text-[#271811]'
                      }`}
                    >
                      {cat === 'all' ? 'All Crafts' : cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Region Filter */}
            <div className="relative">
              <button
                id="filter-region-btn"
                onClick={() => toggleDropdown('region')}
                className={`px-4 py-2 rounded-full border text-[13px] font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  selectedRegionFilter !== 'all'
                    ? 'bg-[#b85c38] text-white border-[#b85c38]'
                    : 'border-[#dbc1b8] text-[#55433c] hover:border-[#994422] hover:bg-[#fff1eb]'
                }`}
              >
                <span>
                  {selectedRegionFilter === 'all' ? 'Region' : selectedRegionFilter}
                </span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'region' && (
                <div className="absolute top-full left-0 mt-2 bg-[#fff8f6] border border-[#dbc1b8] rounded-[8px] shadow-lg py-2 z-50 min-w-[160px]">
                  {regions.map((reg) => (
                    <button
                      key={reg}
                      onClick={() => {
                        setSelectedRegionFilter(reg);
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#fff1eb] transition-colors cursor-pointer ${
                        selectedRegionFilter === reg ? 'text-[#994422] font-bold' : 'text-[#271811]'
                      }`}
                    >
                      {reg === 'all' ? 'All Regions' : reg}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div className="relative">
              <button
                id="filter-price-btn"
                onClick={() => toggleDropdown('price')}
                className={`px-4 py-2 rounded-full border text-[13px] font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  selectedPriceFilter !== 'all'
                    ? 'bg-[#b85c38] text-white border-[#b85c38]'
                    : 'border-[#dbc1b8] text-[#55433c] hover:border-[#994422] hover:bg-[#fff1eb]'
                }`}
              >
                <span>
                  {selectedPriceFilter === 'all'
                    ? 'Price'
                    : selectedPriceFilter === 'under-2000'
                    ? 'Under ₹2,000'
                    : selectedPriceFilter === '2000-5000'
                    ? '₹2,000 - ₹5,000'
                    : 'Above ₹5,000'}
                </span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'price' && (
                <div className="absolute top-full left-0 mt-2 bg-[#fff8f6] border border-[#dbc1b8] rounded-[8px] shadow-lg py-2 z-50 min-w-[160px]">
                  <button
                    onClick={() => {
                      setSelectedPriceFilter('all');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#fff1eb] cursor-pointer"
                  >
                    All Prices
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPriceFilter('under-2000');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#fff1eb] cursor-pointer"
                  >
                    Under ₹2,000
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPriceFilter('2000-5000');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#fff1eb] cursor-pointer"
                  >
                    ₹2,000 - ₹5,000
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPriceFilter('above-5000');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#fff1eb] cursor-pointer"
                  >
                    Above ₹5,000
                  </button>
                </div>
              )}
            </div>

            {/* Clear filters if any active */}
            {(selectedCraftFilter !== 'all' ||
              selectedRegionFilter !== 'all' ||
              selectedPriceFilter !== 'all' ||
              searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCraftFilter('all');
                  setSelectedRegionFilter('all');
                  setSelectedPriceFilter('all');
                  setSearchQuery('');
                  setVerifiedOnly(false);
                }}
                className="text-[12px] text-[#994422] underline font-medium px-2 cursor-pointer"
              >
                Reset
              </button>
            )}

            {/* Verified Only Toggle */}
            <label className="flex items-center space-x-2 cursor-pointer ml-3 pl-3 border-l border-[#dbc1b8] select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`block w-10 h-6 rounded-full transition-colors ${
                    verifiedOnly ? 'bg-[#ffe2d6]' : 'bg-[#e8e2d6]'
                  }`}
                ></div>
                <div
                  className={`dot absolute left-1 top-1 bg-[#994422] w-4 h-4 rounded-full transition-transform ${
                    verifiedOnly ? 'transform translate-x-4 bg-[#994422]' : 'bg-[#88726b]'
                  }`}
                ></div>
              </div>
              <span className="text-[13px] font-semibold text-[#994422] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified only
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Product Grid (Bento / Editorial Asymmetric Layout matching Design) */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-[#fff1eb] rounded-[12px] border border-[#dbc1b8]/50 p-8">
          <SearchX className="w-12 h-12 text-[#88726b] mx-auto mb-3" />
          <h3 className="font-serif-display text-[24px] text-[#271811] font-medium mb-2">
            No artisan curations found
          </h3>
          <p className="text-[15px] text-[#55433c] max-w-md mx-auto mb-6">
            Try adjusting your search criteria or removing the active filters to see more craft treasures.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCraftFilter('all');
              setSelectedRegionFilter('all');
              setSelectedPriceFilter('all');
              setVerifiedOnly(false);
            }}
            className="px-6 py-2.5 bg-[#b85c38] text-white rounded-[6px] font-medium text-[14px] hover:bg-[#994422] cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product.id)}
              className="group flex flex-col bg-[#DCC9A3]/15 border border-[#DCC9A3]/40 hover:border-[#DCC9A3] transition-all rounded-[12px] overflow-hidden p-4 cursor-pointer shadow-xs hover:shadow-[0_8px_24px_rgba(59,42,34,0.08)] hover:-translate-y-1 duration-200"
            >
              {/* Product Image Container */}
              <div className="relative aspect-[3/4] mb-5 overflow-hidden rounded-[8px] bg-[#ffeae1]">
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Provenance / GI Badge */}
                <div className="absolute top-3 left-3 bg-[#D4A72C] text-[#271811] px-3 py-1 rounded-full text-[12px] font-bold flex items-center gap-1 shadow-xs backdrop-blur-xs bg-opacity-95">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{product.giTagLabel || (product.isVerified ? 'CraftPass Verified' : 'Handmade')}</span>
                </div>

                {/* Certificate ID Pill */}
                <div className="absolute bottom-3 right-3 bg-[#271811]/85 text-[#fff8f6] px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider backdrop-blur-xs">
                  {product.certificateId}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-serif-display text-[21px] text-[#271811] font-semibold leading-tight group-hover:text-[#994422] transition-colors">
                    {product.name}
                  </h3>
                  <span className="font-sans font-bold text-[16px] text-[#994422] whitespace-nowrap">
                    {product.currency}
                    {product.price.toLocaleString()}
                  </span>
                </div>

                {/* Artisan & Region info footer */}
                <div className="mt-auto pt-4 border-t border-[#dbc1b8]/30 flex items-center space-x-3">
                  <img
                    src={product.artisanAvatar}
                    alt={product.artisanName}
                    className="w-9 h-9 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all border border-[#dbc1b8]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#271811] truncate">
                      {product.artisanName}
                    </p>
                    <p className="text-[12px] text-[#55433c] truncate">{product.origin}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#88726b] group-hover:translate-x-1 transition-transform group-hover:text-[#994422]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
