import React from 'react';
import { Sun, Moon, Sunrise, Sunset, Play, Music } from 'lucide-react';
import { usePlayer, Track } from '../context/PlayerContext';

export const SoundClock: React.FC = () => {
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  const CLOCK_ITEMS = [
    {
      id: 'morning',
      title: 'Morning',
      subtitle: 'Resonant Lines',
      icon: <Sunrise className="w-8 h-8" />,
      colorClass: 'text-clay-400',
      borderColor: 'border-clay-500',
      track: {
        title: 'Resonant Lines',
        subtitle: 'Morning Clarity • Focus',
        image: 'https://picsum.photos/seed/veena/100/100'
      }
    },
    {
      id: 'day',
      title: 'Day',
      subtitle: 'Raag Field',
      icon: <Sun className="w-8 h-8" />,
      colorClass: 'text-sage-400',
      borderColor: 'border-sage-500',
      track: {
        title: 'Slow Blooming',
        subtitle: 'Afternoon • Bhimpalasi',
        image: 'https://picsum.photos/seed/afternoon/100/100'
      }
    },
    {
      id: 'twilight',
      title: 'Twilight',
      subtitle: 'String Theory',
      icon: <Sunset className="w-8 h-8" />,
      colorClass: 'text-clay-500',
      borderColor: 'border-clay-600',
      track: {
        title: 'Strings of Stillness',
        subtitle: 'Twilight • Deep Listening',
        image: 'https://picsum.photos/seed/sitar/100/100'
      }
    },
    {
      id: 'night',
      title: 'Night',
      subtitle: 'Midnight Letters',
      icon: <Moon className="w-8 h-8" />,
      colorClass: 'text-earth-400',
      borderColor: 'border-earth-600',
      track: {
        title: 'Midnight Letters',
        subtitle: 'Night • Ghazal',
        image: 'https://picsum.photos/seed/letter/100/100'
      }
    }
  ];

  const handlePlay = (item: any) => {
    playTrack({
        ...item.track,
        icon: item.icon,
        colorClass: item.colorClass
    });
  };

  return (
    <div id="rhythm" className="py-32 bg-void-950 relative overflow-hidden bg-noise">
        {/* Background decorative elements - Pulsing "Beats" */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.05]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-earth-100 rounded-full animate-pulse-slow"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-earth-100 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-earth-100 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-full border border-void-700 bg-void-800 mb-6">
            <Music size={16} className="text-earth-400 animate-bounce" />
        </div>
        
        <h2 className="font-serif text-5xl md:text-6xl mb-6 text-earth-100 tracking-tight">
          The <span className="italic text-clay-500">Sound</span> Clock
        </h2>
        <p className="text-earth-400 mb-20 max-w-xl mx-auto font-sans text-xs md:text-sm tracking-[0.25em] uppercase border-b border-void-800 pb-8">
          Rhythm • Mood • Energy • Time
        </p>

        <div className="relative max-w-6xl mx-auto">
            {/* The Timeline Line */}
            <div className="hidden md:block absolute top-[3rem] left-10 right-10 h-px bg-gradient-to-r from-transparent via-void-700 to-transparent -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
                {CLOCK_ITEMS.map((item) => {
                    const isActive = currentTrack.title === item.track.title;
                    const isPlayingItem = isActive && isPlaying;
                    
                    return (
                        <div 
                            key={item.id} 
                            onClick={() => handlePlay(item)}
                            className="flex flex-col items-center group cursor-pointer"
                        >
                            {/* Icon Container */}
                            <div className="relative h-24 w-24 mb-8 flex items-center justify-center">
                                {/* Rotating Ring when active */}
                                {isActive && (
                                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-earth-500 animate-spin-slow opacity-50"></div>
                                )}
                                
                                {/* Main Circle */}
                                <div className={`
                                    h-20 w-20 rounded-full bg-void-800 border flex items-center justify-center 
                                    relative shadow-2xl transition-all duration-500
                                    ${isActive ? `${item.borderColor} ring-4 ring-void-700 ring-offset-2 ring-offset-void-900` : 'border-void-700 group-hover:border-void-600'}
                                    ${item.colorClass}
                                `}>
                                    <div className={`transition-all duration-500 ${isPlayingItem ? 'scale-75 opacity-0 blur-sm absolute' : 'scale-100 opacity-100'}`}>
                                        {item.icon}
                                    </div>
                                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isPlayingItem ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                                        <Play fill="currentColor" className="w-8 h-8 text-earth-100" />
                                    </div>
                                </div>
                            </div>
                            
                            <h3 className={`font-serif text-3xl mb-2 transition-all duration-300 ${isActive ? 'text-earth-50 scale-110' : 'text-earth-300 group-hover:text-earth-200'}`}>
                                {item.title}
                            </h3>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-earth-500 group-hover:text-clay-500 transition-colors">
                                {item.subtitle}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
};