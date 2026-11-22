import React, { useState } from 'react';
import { RealEstateProject } from '../types';
import { formatBDT } from '../services/formatters';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Layers, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Sparkles,
  ArrowUpRight,
  Filter,
  PlusCircle
} from 'lucide-react';

interface RealEstateShowcaseProps {
  projects: RealEstateProject[];
  onBookProject: (projectName: string) => void;
}

export const RealEstateShowcase: React.FC<RealEstateShowcaseProps> = ({
  projects,
  onBookProject,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredProjects = projects.filter(p => {
    const matchesCity = selectedCity === 'all' || p.city === selectedCity;
    const matchesType = selectedType === 'all' || p.type === selectedType;
    return matchesCity && matchesType;
  });

  const totalUnits = projects.reduce((sum, p) => sum + p.totalUnits, 0);
  const totalSold = projects.reduce((sum, p) => sum + p.soldUnits, 0);
  const totalAvailable = projects.reduce((sum, p) => sum + p.availableUnits, 0);
  const overallOccupancyPct = totalUnits > 0 ? Math.round((totalSold / totalUnits) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Top Inventory Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E2E8E5] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5A6570] mb-2">
            <span className="font-semibold uppercase tracking-wider">Total BD Projects</span>
            <Building className="w-4 h-4 text-[#1B6B38]" />
          </div>
          <div className="text-2xl font-black text-[#1E242B]">
            {projects.length} Premier Locations
          </div>
          <p className="text-xs text-[#5A6570] mt-1">
            Gulshan, Banani, Purbachal, Uttara & Cox's Bazar
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E2E8E5] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5A6570] mb-2">
            <span className="font-semibold uppercase tracking-wider">Total Units Portfolio</span>
            <Layers className="w-4 h-4 text-[#1B6B38]" />
          </div>
          <div className="text-2xl font-black text-[#1E242B]">
            {totalUnits} Units
          </div>
          <p className="text-xs text-[#5A6570] mt-1">
            Condos, Villas, and Commercial Suites
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E2E8E5] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5A6570] mb-2">
            <span className="font-semibold uppercase tracking-wider">Total Units Sold</span>
            <CheckCircle className="w-4 h-4 text-[#1B6B38]" />
          </div>
          <div className="text-2xl font-black text-[#1B6B38]">
            {totalSold} Units ({overallOccupancyPct}%)
          </div>
          <p className="text-xs text-[#1B6B38] mt-1 font-medium">
            Strong sales velocity in 2026
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E2E8E5] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5A6570] mb-2">
            <span className="font-semibold uppercase tracking-wider">Available For Sale</span>
            <Clock className="w-4 h-4 text-[#1B6B38]" />
          </div>
          <div className="text-2xl font-black text-[#1E242B]">
            {totalAvailable} Available
          </div>
          <p className="text-xs text-[#5A6570] mt-1">
            Ready for instant booking & EMI plan
          </p>
        </div>

      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-[#E2E8E5] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-[#1E242B] flex items-center">
            <Building className="w-4 h-4 mr-2 text-[#1B6B38]" />
            Active Bangladesh Real Estate Property Showcase
          </h4>
          <p className="text-xs text-[#5A6570] mt-0.5">
            Real-time inventory showcase with starting prices, sqft rates, and flexible EMI schemes
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* City Filter */}
          <div className="flex items-center space-x-1.5 bg-[#FFFFFF] border border-[#E2E8E5] rounded-lg px-2.5 py-1.5 text-xs text-[#1E242B] shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#5A6570]" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent border-none text-xs text-[#1E242B] focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#FFFFFF] text-[#1E242B]">All Cities</option>
              <option value="Dhaka" className="bg-[#FFFFFF] text-[#1E242B]">Dhaka</option>
              <option value="Cox's Bazar" className="bg-[#FFFFFF] text-[#1E242B]">Cox's Bazar</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center space-x-1.5 bg-[#FFFFFF] border border-[#E2E8E5] rounded-lg px-2.5 py-1.5 text-xs text-[#1E242B] shadow-sm">
            <Filter className="w-3.5 h-3.5 text-[#5A6570]" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-transparent border-none text-xs text-[#1E242B] focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#FFFFFF] text-[#1E242B]">All Categories</option>
              <option value="Luxury Condominium" className="bg-[#FFFFFF] text-[#1E242B]">Luxury Condos</option>
              <option value="Duplex Villa" className="bg-[#FFFFFF] text-[#1E242B]">Duplex Villas</option>
              <option value="Commercial Space" className="bg-[#FFFFFF] text-[#1E242B]">Commercial Spaces</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Showcase Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => {
          const soldPercentage = Math.round((proj.soldUnits / proj.totalUnits) * 100);

          return (
            <div
              key={proj.id}
              className="bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E2E8E5] hover:border-[#1B6B38]/50 transition-all shadow-sm flex flex-col justify-between group"
            >
              {/* Image & Badges */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E242B]/90 via-[#1E242B]/30 to-transparent" />
                
                {proj.featured && (
                  <span className="absolute top-3 left-3 bg-[#1B6B38] text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 mr-0.5" /> Featured BD Luxury
                  </span>
                )}

                <span className="absolute top-3 right-3 bg-[#FFFFFF]/90 backdrop-blur-md text-[#1E242B] font-semibold text-[10px] px-2.5 py-1 rounded-full border border-white/50">
                  {proj.type}
                </span>

                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-base font-extrabold text-white group-hover:text-[#25D366] transition-colors">
                    {proj.name}
                  </h4>
                  <p className="text-xs text-slate-200 flex items-center mt-0.5">
                    <MapPin className="w-3 h-3 mr-1 text-[#25D366]" />
                    {proj.location}
                  </p>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                
                {/* Price & Rate Grid */}
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-[#E2E8E5]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#5A6570] block">Starting Price</span>
                    <span className="text-sm font-extrabold text-[#1B6B38]">{formatBDT(proj.startingPrice, true)}</span>
                    <span className="text-[10px] text-[#5A6570] block">Max: {formatBDT(proj.maxPrice, true)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-[#5A6570] block">Avg Rate / Sqft</span>
                    <span className="text-sm font-extrabold text-[#1E242B]">৳ {proj.avgPricePerSqft.toLocaleString('en-BD')}</span>
                    <span className="text-[10px] text-[#5A6570] block">Ready by {proj.completionYear}</span>
                  </div>
                </div>

                {/* Units Sold Progress */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#1E242B] font-medium">Sales Absorption</span>
                    <span className="text-[#1B6B38] font-bold">{soldPercentage}% Sold</span>
                  </div>
                  <div className="w-full bg-[#E2E8E5] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1B6B38]"
                      style={{ width: `${soldPercentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#5A6570]">
                    <span>Sold: {proj.soldUnits} units</span>
                    <span className="text-[#1B6B38] font-semibold">{proj.availableUnits} units available</span>
                  </div>
                </div>

                {/* Available EMI Schemes */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5A6570] block mb-1">
                    Available EMI Plans:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.emiPlansAvailable.map((plan, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium bg-[#F4F6F5] text-[#5A6570] px-2 py-0.5 rounded-md border border-[#E2E8E5]"
                      >
                        {plan}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onBookProject(proj.name)}
                  className="w-full mt-2 py-2.5 rounded-xl bg-[#1B6B38] hover:bg-[#14522B] text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-sm active:scale-98"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Book Unit / Record Deal</span>
                </button>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
