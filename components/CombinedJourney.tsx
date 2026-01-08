import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { 
  STRING_THEORY, 
  VOICE_OF_DEVOTION, 
  TIMELESS_ECHOES, 
  RAAG_FIELD, 
  HEART_SPACE, 
  SANSKRIT_CODES 
} from '../constants';

const ALL_SECTIONS = [
  STRING_THEORY,
  VOICE_OF_DEVOTION,
  TIMELESS_ECHOES,
  RAAG_FIELD, 
  HEART_SPACE, 
  SANSKRIT_CODES
];

const FILTERS = [
  { id: 'string-theory', label: 'String Theory' },
  { id: 'voice-of-devotion', label: 'Devotion' },
  { id: 'timeless-echoes', label: 'Echoes' },
  { id: 'raag-field', label: 'Raag Field' },
  { id: 'heart-space', label: 'Heart Space' },
  { id: 'sanskrit-codes', label: 'Ancient Codes' }
];

export const CombinedJourney: React.FC = () => {
  // Set default active filter to String Theory
  const [activeFilter, setActiveFilter] = useState('string-theory');

  // Flatten items with their section info
  const allItems = ALL_SECTIONS.flatMap(section => 
    section.items.map(item => ({
      ...item,
      sectionId: section.id,
      sectionTitle: section.title,
    }))
  );

  const filteredItems = allItems.filter(item => item.sectionId === activeFilter);

  const getSectionLabel = (id: string) => {
    switch(id) {
      case 'string-theory': return 'STRINGS';
      case 'voice-of-devotion': return 'VOICES';
      case 'timeless-echoes': return 'ECHOES';
      case 'raag-field': return 'LANDSCAPES';
      case 'heart-space': return 'HEART RESONANCE';
      case 'sanskrit-codes': return 'ANCIENT CODES';
      default: return 'JOURNEY';
    }
  };

  return (
    <section id="journeys" className="bg-void-950 py-24 px-6 md:px-12 min-h-screen flex flex-col justify-center bg-noise relative">
       
       {/* Constrain width to max-w-5xl to make cards naturally smaller and centered */}
       <div className="max-w-5xl mx-auto w-full relative z-10">
           {/* Section Header */}
           <div className="text-center mb-12">
              <span className="uppercase tracking-[0.3em] text-clay-600 text-xs font-bold mb-4 block">
                The Collections
              </span>
              <h2 className="font-serif text-5xl md:text-6xl text-earth-100 font-light leading-none tracking-tight">
                Journeys in <span className="italic text-earth-400">Sound</span>
              </h2>
           </div>

           {/* Filter Pills */}
           <div className="flex flex-wrap justify-center gap-3 mb-16">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-5 py-1.5 rounded-full border transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.15em] relative overflow-hidden group
                    ${activeFilter === filter.id 
                      ? 'bg-clay-600 border-clay-600 text-white shadow-md' 
                      : 'bg-transparent border-void-700 text-earth-500 hover:border-void-600 hover:text-earth-300'
                    }
                  `}
                >
                  <span className="relative z-10">{filter.label}</span>
                  {/* Hover fill effect */}
                  {activeFilter !== filter.id && (
                     <div className="absolute inset-0 bg-void-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 -z-0"></div>
                  )}
                </button>
              ))}
           </div>
    
           {/* Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {filteredItems.map((item, index) => (
                 <div 
                   key={item.id}
                   style={{ animationDelay: `${index * 0.05}s` }}
                   className="animate-fade-in-up group relative bg-void-800 border border-void-700 rounded-2xl p-6 aspect-[4/5] flex flex-col hover:border-clay-500/50 transition-all duration-300 ease-out cursor-pointer overflow-hidden shadow-lg hover:shadow-clay-900/20 hover:scale-[1.02]"
                 >
                    {/* Background Image Fade In on Hover (Optional feel) or just gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-clay-500/0 via-transparent to-black/80 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Top Row */}
                    <div className="relative z-10 flex justify-between items-start mb-auto">
                       <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-earth-600 group-hover:text-clay-400 transition-colors duration-200">
                         {getSectionLabel(item.sectionId)}
                       </span>
                       <div className="h-8 w-8 rounded-full border border-void-600 flex items-center justify-center group-hover:bg-clay-600 group-hover:border-clay-600 transition-all duration-300 group-hover:rotate-[-45deg]">
                          <ArrowRight size={12} className="text-earth-500 group-hover:text-white transition-colors" />
                       </div>
                    </div>
    
                    {/* Middle: Title */}
                    <div className="relative z-10 my-4 transform transition-transform duration-300 group-hover:translate-y-[-2px]">
                       <h3 className="font-serif text-3xl text-earth-100 leading-[1] font-light tracking-wide group-hover:text-white transition-colors duration-200">
                         {item.title}
                       </h3>
                    </div>
    
                    {/* Bottom: Tagline */}
                    <div className="relative z-10 mt-auto">
                       <div className="h-px w-8 bg-clay-600 mb-4 group-hover:w-full transition-all duration-300 ease-out" />
                       <p className="font-serif text-base italic text-earth-400 opacity-70 leading-relaxed group-hover:text-earth-200 group-hover:opacity-100 transition-all duration-300">
                         "{item.tagline}"
                       </p>
                    </div>
                 </div>
              ))}
           </div>
       </div>
    </section>
  );
};