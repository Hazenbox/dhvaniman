import React from 'react';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { MoodSelector } from './components/MoodSelector';
import { SoundClock } from './components/SoundClock';
import { CombinedJourney } from './components/CombinedJourney';
import { PlayerBar } from './components/PlayerBar';
import { Workshops } from './components/Workshops';
import { PlayerProvider } from './context/PlayerContext';
import { JourneyProvider } from './context/JourneyContext';

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <JourneyProvider>
        <div className="min-h-screen selection:bg-clay-600 selection:text-white bg-void-950">
          <Navigation />
          <Hero />
          <MoodSelector />
          <SoundClock />
          
          <main>
            <CombinedJourney />
            <Workshops />
          </main>

          <footer className="bg-void-950 text-earth-400 py-12 px-6 border-t border-void-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h4 className="font-serif text-2xl text-earth-200 mb-2">The Dhvaniman</h4>
                    <p className="text-sm">Sound as a doorway — from noise to knowing.</p>
                </div>
                {/* Links removed as requested */}
                <div className="text-xs text-earth-600">
                    &copy; {new Date().getFullYear()} The Dhvaniman Platform. All rights reserved.
                </div>
            </div>
          </footer>

          <PlayerBar />
        </div>
      </JourneyProvider>
    </PlayerProvider>
  );
};

export default App;