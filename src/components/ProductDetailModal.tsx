import React, { useState } from 'react';
import { X, Star, ShieldCheck, MessageSquare, PhoneCall, Check, Car } from 'lucide-react';
import { Product } from '../types.ts';
import { getProductWhatsAppUrl, WORKSHOP_DETAILS } from '../data/catalog.ts';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  theme?: 'light' | 'dark';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [vehicleInfo, setVehicleInfo] = useState('');

  if (!product) return null;

  const whatsappUrl = getProductWhatsAppUrl(product, vehicleInfo);

  const isRedBadge = product.badge?.includes('F1') || 
                     product.badge?.includes('SPEC') || 
                     product.badge?.includes('MOTORSPORT') ||
                     product.badge?.includes('DOWNFORCE');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#122c21] border-2 border-[#234d3b] rounded-3xl overflow-hidden shadow-2xl shadow-black/90 my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2.5 bg-black/80 hover:bg-black border border-[#2d5d45] text-emerald-300 hover:text-white rounded-full transition-colors cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative aspect-square md:aspect-auto bg-black flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-[#234d3b]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#122c21] via-transparent to-transparent pointer-events-none" />

            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 font-label text-xs rounded-md shadow-lg font-extrabold tracking-wider ${
                  isRedBadge ? 'bg-red-500 text-white' : 'bg-emerald-400 text-slate-950'
                }`}>
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto bg-[#122c21]">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs mb-2 font-label">
                <span className="text-emerald-400 font-bold uppercase tracking-wider">
                  {product.categoryName} • {product.subCategoryName}
                </span>
                <span className="text-emerald-300/60 font-mono-code font-semibold">SKU: {product.sku}</span>
              </div>

              {/* Product Subheading / Name */}
              <h2 className="font-heading text-2xl sm:text-3xl text-white leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs font-label">
                <div className="flex items-center text-amber-300">
                  <Star className="w-4 h-4 fill-amber-300" />
                  <span className="ml-1 font-bold tabular-nums text-amber-200">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-[#2d5d45]">·</span>
                <span className="text-emerald-200/70">{product.reviewsCount} Fitment Verified Reviews</span>
              </div>

              {/* Pricing */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-price text-3xl sm:text-4xl text-white tracking-wide leading-none tabular-nums font-bold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && (
                  <span className="font-price text-base sm:text-lg text-emerald-300/40 line-through tracking-wide leading-none tabular-nums">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-label text-emerald-300/60">MRP incl. GST</span>
              </div>

              {/* Workshop Availability Status */}
              <div className="mt-2 text-xs font-label text-emerald-400 flex items-center gap-1.5 font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>Available at Kumbakonam Workshop · Custom Fitment Consultation Included</span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-emerald-100/80 font-body leading-relaxed border-t border-[#1f4736] pt-4">
                {product.shortDesc}
              </p>

              {/* Specifications Table */}
              <div className="mt-5 border border-[#2d5d45] rounded-2xl overflow-hidden">
                <div className="bg-[#17382a] px-4 py-2.5 border-b border-[#2d5d45] text-xs font-label text-emerald-300 uppercase tracking-wider font-bold">
                  Engineering Specifications
                </div>
                <div className="divide-y divide-[#1f4736] text-xs bg-[#10271d]">
                  {Object.entries(product.specs || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2.5 px-4">
                      <span className="text-emerald-300/70 font-label text-[11px] uppercase tracking-wider font-semibold">{key}</span>
                      <span className="text-emerald-100 text-right font-body text-[12px] font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fitment Guarantee Box */}
              <div className="mt-4 p-3.5 bg-black/60 border border-[#2d5d45] rounded-2xl flex items-start gap-2.5 text-xs text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-body">
                  <strong className="text-white font-semibold">MAAC Fitment Assurance:</strong> Every inquiry is cross-checked against your vehicle chassis year, bolt PCD, and offset prior to dispatch.
                </span>
              </div>

              {/* Vehicle Compatibility Form */}
              <div className="mt-5 space-y-2">
                <label htmlFor="vehicle-model" className="block text-xs font-label text-emerald-300 font-bold uppercase tracking-wider">
                  Specify Your Car Model (For Perfect Fitment)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                    <Car className="w-4 h-4" />
                  </div>
                  <input
                    id="vehicle-model"
                    type="text"
                    value={vehicleInfo}
                    onChange={(e) => setVehicleInfo(e.target.value)}
                    placeholder="e.g. Hyundai Creta 2024, Mahindra Thar, VW Virtus"
                    className="w-full pl-10 pr-3 py-2.5 bg-[#0f241a] border border-[#2d5d45] rounded-xl text-xs sm:text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 font-body"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-5 border-t border-[#1f4736] flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-98 text-slate-950 font-button text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Inquire Fitment on WhatsApp</span>
              </a>

              <a
                href={`tel:${WORKSHOP_DETAILS.phone.replace(/[^0-9+]/g, '')}`}
                className="py-3 px-4 bg-black/80 hover:bg-black border border-[#2d5d45] text-white font-button text-xs sm:text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
