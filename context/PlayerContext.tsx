import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Track {
  title: string;
  subtitle: string;
  image: string;
  icon?: ReactNode;
  colorClass?: string;
}

interface PlayerContextType {
  currentTrack: Track;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const DEFAULT_TRACK: Track = {
  title: 'Strings of Stillness',
  subtitle: 'Nikhil Banerjee Inspired',
  image: 'https://picsum.photos/seed/sitar/100/100'
};

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track>(DEFAULT_TRACK);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, playTrack, togglePlay }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within a PlayerProvider');
  return context;
};