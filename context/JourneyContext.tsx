import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MoodOption } from '../types';
import { MOODS } from '../constants';

interface JourneyContextType {
  isModalOpen: boolean;
  selectedMood: MoodOption | null;
  openModal: (mood?: MoodOption) => void;
  closeModal: () => void;
  setSelectedMood: (mood: MoodOption) => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const JourneyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);

  const openModal = (mood?: MoodOption) => {
    if (mood) {
      setSelectedMood(mood);
    } else if (!selectedMood) {
      // Default to the first mood if opening without a specific selection (e.g. from Nav)
      setSelectedMood(MOODS[0]);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMood(null);
  };

  return (
    <JourneyContext.Provider value={{ isModalOpen, selectedMood, openModal, closeModal, setSelectedMood }}>
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => {
  const context = useContext(JourneyContext);
  if (!context) throw new Error('useJourney must be used within a JourneyProvider');
  return context;
};