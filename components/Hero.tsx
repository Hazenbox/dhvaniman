import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-earth-900 flex items-center justify-center text-center px-4">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60 scale-105"
        >
          <source src="https://github.com/Hazenbox/dhvaniman/blob/main/video_bg.webm?raw=true" type="video/webm" />
        </video>

        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] pointer-events-none"></div>
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-earth-900" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-10">
        <p className="text-earth-300 uppercase tracking-[0.4em] text-xs md:text-sm font-medium animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          A Sound-Based Experiential Platform
        </p>
        
        <h1 className="font-serif text-7xl md:text-9xl lg:text-[10rem] text-earth-50 leading-[0.9] tracking-tight mix-blend-screen animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          The <span className="italic text-earth-200">Dhvaniman</span>
        </h1>

        <div className="h-px w-32 bg-gradient-to-r from-transparent via-clay-500 to-transparent mx-auto opacity-50 animate-pulse-slow" />

        <p className="font-serif text-2xl md:text-4xl text-earth-100 font-light leading-snug max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          "This is not music to consume.<br/> 
          This is sound to <span className="italic text-clay-400">return home</span>."
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 text-earth-400">
             <ChevronDown size={24} />
        </div>
      </div>
    </div>
  );
};