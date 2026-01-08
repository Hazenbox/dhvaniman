import { JourneyItem, SectionData, MoodOption } from './types';

export const MOODS: MoodOption[] = [
  { id: 'calm', label: 'Calm Down', targetSection: 'heart-space' },
  { id: 'held', label: 'Feel Held', targetSection: 'voice-of-devotion' },
  { id: 'focus', label: 'Focus', targetSection: 'string-theory' },
  { id: 'heart', label: 'Open Heart', targetSection: 'heart-space' },
  { id: 'let-go', label: 'Let Go', targetSection: 'timeless-echoes' },
  { id: 'listen', label: 'Just Listen', targetSection: 'raag-field' },
];

export const STRING_THEORY: SectionData = {
  id: 'string-theory',
  title: 'String Theory',
  description: 'Instrumental Classical as Sound Archetypes',
  tagline: 'Where strings dissolve thought.',
  variant: 'light',
  items: [
    {
      id: 'strings-stillness',
      title: 'Strings of Stillness',
      subtitle: 'Twilight & Night',
      tagline: 'Deep Listening',
      image: 'https://picsum.photos/seed/sitar/800/600',
      description: 'Sitar, Sarod, Sarangi'
    },
    {
      id: 'resonant-lines',
      title: 'Resonant Lines',
      subtitle: 'Morning Clarity',
      tagline: 'Focus & Awakening',
      image: 'https://picsum.photos/seed/veena/800/600',
      description: 'Violin, Saraswati Veena'
    },
    {
      id: 'eternal-drone',
      title: 'The Eternal Drone',
      subtitle: 'Anytime',
      tagline: 'Grounding',
      image: 'https://picsum.photos/seed/drone/800/600',
      description: 'Tanpura, Sustained Drones'
    }
  ]
};

export const VOICE_OF_DEVOTION: SectionData = {
  id: 'voice-of-devotion',
  title: 'Voice of Devotion',
  description: 'Human Emotions Transcending',
  tagline: 'When devotion becomes direction.',
  variant: 'dark',
  items: [
    {
      id: 'fire-within',
      title: 'Fire Within',
      subtitle: 'Courage & Surrender',
      tagline: 'Ram & Nirgun Bhajans',
      image: 'https://picsum.photos/seed/fire/800/600',
    },
    {
      id: 'the-beloved',
      title: 'The Beloved',
      subtitle: 'Love & Longing',
      tagline: 'Songs to the unseen',
      image: 'https://picsum.photos/seed/krishna/800/600',
    },
    {
      id: 'the-unbound',
      title: 'The Unbound',
      subtitle: 'Truth & Awakening',
      tagline: 'No temple. No rules.',
      image: 'https://picsum.photos/seed/kabir/800/600',
    }
  ]
};

export const TIMELESS_ECHOES: SectionData = {
  id: 'timeless-echoes',
  title: 'Timeless Echoes',
  description: 'Evergreen Songs',
  tagline: 'Songs that remember you.',
  variant: 'light',
  items: [
    {
      id: 'golden-hours',
      title: 'Golden Hours',
      subtitle: 'Nostalgia',
      tagline: 'Old Hindi Classics',
      image: 'https://picsum.photos/seed/retro/800/600',
    },
    {
      id: 'midnight-letters',
      title: 'Midnight Letters',
      subtitle: 'Intimacy',
      tagline: 'Ghazals',
      image: 'https://picsum.photos/seed/letter/800/600',
    },
    {
      id: 'sacred-fervour',
      title: 'Sacred Fervour',
      subtitle: 'Ecstasy',
      tagline: 'Qawwalis',
      image: 'https://picsum.photos/seed/sufi/800/600',
    }
  ]
};

export const RAAG_FIELD: SectionData = {
  id: 'raag-field',
  title: 'The Raag Field',
  description: 'Sound Mandalas',
  tagline: 'Raag as an inner landscape.',
  variant: 'image',
  items: [
    {
      id: 'stillness-sunrise',
      title: 'Stillness Before Sunrise',
      subtitle: 'Bhairav',
      tagline: 'A state of being',
      image: 'https://picsum.photos/seed/sunrise/800/600',
    },
    {
      id: 'slow-blooming',
      title: 'Slow Blooming Afternoon',
      subtitle: 'Bhimpalasi',
      tagline: 'Deep unfolding',
      image: 'https://picsum.photos/seed/afternoon/800/600',
    },
    {
      id: 'twilight-fire',
      title: 'Twilight Fire',
      subtitle: 'Yaman',
      tagline: 'Evening grace',
      image: 'https://picsum.photos/seed/twilight/800/600',
    }
  ]
};

export const HEART_SPACE: SectionData = {
  id: 'heart-space',
  title: 'Heart Space',
  description: 'Wellness & Sound Healing',
  tagline: 'Sound that listens back.',
  variant: 'light',
  items: [
    {
      id: 'open-soften',
      title: 'Open | Soften | Receive',
      subtitle: 'Heart-opening',
      tagline: 'Vocal toning flows',
      image: 'https://picsum.photos/seed/heart/800/600',
    },
    {
      id: 'sound-to-silence',
      title: 'Sound to Silence',
      subtitle: 'Deep Meditative',
      tagline: 'Just dissolve',
      image: 'https://picsum.photos/seed/silence/800/600',
    }
  ]
};

export const SANSKRIT_CODES: SectionData = {
  id: 'sanskrit-codes',
  title: 'Primordial Codes',
  description: 'Vibrational Architecture',
  tagline: 'Before language, there was sound.',
  variant: 'dark',
  items: [
    {
      id: 'phonetic-science',
      title: 'Phonetic Science',
      subtitle: 'Mantra',
      tagline: 'Vibration as structure',
      image: 'https://picsum.photos/seed/sanskrit/800/600',
    }
  ]
};