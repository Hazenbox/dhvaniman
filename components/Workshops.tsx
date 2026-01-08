import React from 'react';
import { MapPin, Calendar, ArrowUpRight, Clock } from 'lucide-react';

const WORKSHOPS = [
  { date: 'MAR 25', day: 'MON', title: 'Tabaruq Arts Music School', time: '9:00 AM', location: 'Wilsons Creek, Australia' },
  { date: 'JUN 17', day: 'MON', title: 'Private retreat venue', time: '1:00 PM', location: 'Essaouira, Morocco' },
  { date: 'SEP 01', day: 'SUN', title: 'Bali - Momentum Collective Event', time: '1:00 PM', location: 'Bali, Indonesia' },
  { date: 'OCT 12', day: 'SAT', title: 'WORKSHOP: How to Pray the Sufi Way', time: '2:30 PM', location: 'Portland, OR, United States' },
  { date: 'DEC 11', day: 'WED', title: 'Sama Music Immersion with Tahir Qawwal', time: '9:00 AM', location: 'Kabupaten Gianyar, Indonesia' },
  { date: 'JAN 17', day: 'FRI', title: 'Ascention San Marcos', time: '2:00 PM', location: 'San Marcos, Guatemala' },
  { date: 'JAN 17', day: 'FRI', title: 'Maloca Atitlan', time: '7:00 PM', location: 'San Marcos La Laguna, Guatemala' },
];

export const Workshops: React.FC = () => {
  return (
    <section id="workshops" className="py-24 bg-void-950 relative overflow-hidden bg-noise">
      {/* Subtle Background pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-clay-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.2em] text-clay-500 text-sm font-medium mb-3 block">
            Sacred Spaces
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-earth-100 font-light leading-tight">
            Upcoming Workshops
          </h2>
          <div className="h-px w-16 bg-void-700 mx-auto mt-6" />
        </div>
        
        <div className="space-y-4">
          {WORKSHOPS.slice(0, 4).map((ws, i) => (
            <div 
              key={i} 
              className="group relative bg-void-800 border border-void-700 p-6 md:p-8 hover:border-clay-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-black/20 rounded-xl flex flex-col md:flex-row gap-6 md:items-center justify-between overflow-hidden"
            >
              {/* Hover Accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-clay-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />

              <div className="flex flex-col md:flex-row gap-6 md:items-center flex-grow">
                {/* Date Block */}
                <div className="flex-shrink-0 flex md:flex-col items-center gap-3 md:gap-1 bg-void-900/50 px-6 py-3 md:py-4 rounded-lg border border-void-700 group-hover:border-clay-500/30 transition-colors w-fit md:w-24 text-center">
                   <span className="text-xs font-bold uppercase tracking-widest text-earth-500 group-hover:text-clay-500">{ws.day}</span>
                   <span className="font-serif text-2xl md:text-xl font-bold text-earth-200 group-hover:text-earth-100 leading-none whitespace-nowrap">
                     {ws.date}
                   </span>
                </div>
                
                {/* Details */}
                <div className="space-y-2">
                   <h3 className="font-serif text-2xl text-earth-200 group-hover:text-clay-400 transition-colors">
                     {ws.title}
                   </h3>
                   <div className="flex flex-wrap gap-4 text-xs md:text-sm text-earth-500 uppercase tracking-wider font-medium">
                     <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-clay-600" />
                        {ws.location}
                     </div>
                     <div className="flex items-center gap-2">
                        <Clock size={14} className="text-earth-600" />
                        {ws.time}
                     </div>
                   </div>
                </div>
              </div>
              
              {/* Action */}
              <div className="flex justify-start md:justify-end mt-2 md:mt-0">
                 <button className="flex items-center space-x-2 px-6 py-3 bg-void-900 text-earth-400 rounded-full hover:bg-clay-600 hover:text-white transition-all duration-300 shadow-md group-hover:shadow-lg transform group-hover:-translate-y-0.5 border border-void-700 group-hover:border-clay-600">
                   <span className="text-xs font-bold uppercase tracking-widest">Reserve</span>
                   <ArrowUpRight size={16} />
                 </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <p className="font-serif text-xl italic text-earth-500">
                "We gather not to learn new things, but to remember what we always knew."
            </p>
        </div>
      </div>
    </section>
  );
};