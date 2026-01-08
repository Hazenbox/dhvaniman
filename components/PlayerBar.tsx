import React from 'react';
import { Play, Pause } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export const PlayerBar: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-auto max-w-[90vw] animate-fade-in-up">
      <div className="bg-void-800/90 backdrop-blur-xl border border-void-700/50 rounded-full p-2 pr-4 shadow-2xl flex items-center gap-3 hover:border-clay-500/30 transition-all duration-300 group ring-1 ring-white/5">
        
        {/* Icon/Image Container - Compact */}
        <div className={`h-10 w-10 flex-shrink-0 rounded-full overflow-hidden relative shadow-md flex items-center justify-center bg-void-900 border border-void-700 ${currentTrack.colorClass || 'text-earth-400'}`}>
             {currentTrack.icon ? (
                 <div className="transform scale-75">{currentTrack.icon}</div>
             ) : (
                 <img src={currentTrack.image} alt="Cover" className="object-cover h-full w-full opacity-90 group-hover:opacity-100 transition-opacity" />
             )}
        </div>

        {/* Info - Compact Text */}
        <div className="flex-1 min-w-[8rem] max-w-[12rem] flex flex-col justify-center">
            <h4 className="font-serif text-earth-100 text-base leading-none truncate pr-2">{currentTrack.title}</h4>
            <p className="text-[9px] uppercase tracking-widest text-earth-400 truncate mt-0.5">{currentTrack.subtitle}</p>
        </div>

        {/* Controls - Compact Button */}
        <button 
           onClick={togglePlay}
           className="h-8 w-8 bg-earth-100 hover:bg-white text-earth-900 rounded-full flex items-center justify-center shadow-lg transition-transform transform active:scale-95 flex-shrink-0"
         >
           {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
         </button>
      </div>
    </div>
  );
};