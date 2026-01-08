import React from 'react';
import { SectionData } from '../types';
import { Play } from 'lucide-react';

interface Props {
  data: SectionData;
}

export const JourneySection: React.FC<Props> = ({ data }) => {
  const isDark = data.variant === 'dark';
  const isImageBg = data.variant === 'image';

  return (
    <section 
      id={data.id}
      className={`
        py-20 px-6 md:px-12 lg:px-24
        ${isDark ? 'bg-earth-900 text-earth-100' : 'bg-earth-50 text-earth-900'}
        ${isImageBg ? 'relative text-white overflow-hidden' : ''}
      `}
    >
        {isImageBg && (
            <div className="absolute inset-0 z-0">
                <img src="https://picsum.photos/seed/texture2/1600/900" alt="Background" className="w-full h-full object-cover opacity-90 brightness-50 sepia-[.5]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
        )}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 max-w-3xl">
          <span className={`uppercase tracking-[0.2em] text-sm font-medium ${isDark || isImageBg ? 'text-earth-300' : 'text-clay-600'} mb-4 block`}>
            {data.description}
          </span>
          <h2 className="font-serif text-5xl md:text-6xl mb-6 font-light leading-tight">
            {data.title}
          </h2>
          <p className={`font-serif text-2xl md:text-3xl italic opacity-80 ${isDark || isImageBg ? 'text-earth-200' : 'text-earth-600'}`}>
            "{data.tagline}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item) => (
            <div 
              key={item.id}
              className={`
                group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1
                ${isDark ? 'bg-earth-800' : 'bg-white'}
                ${isImageBg ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'shadow-sm'}
              `}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <Play fill="white" className="text-white ml-1" />
                    </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <h3 className={`font-serif text-2xl mb-2 ${isDark || isImageBg ? 'text-earth-50' : 'text-earth-900'}`}>
                            {item.title}
                        </h3>
                        {item.subtitle && (
                            <p className={`text-xs uppercase tracking-widest mb-4 ${isDark || isImageBg ? 'text-earth-400' : 'text-clay-600'}`}>
                                {item.subtitle}
                            </p>
                        )}
                        <p className={`text-sm leading-relaxed ${isDark || isImageBg ? 'text-earth-300' : 'text-earth-600'}`}>
                            {item.description || item.tagline}
                        </p>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};