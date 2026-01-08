import React, { useState, useEffect, useRef } from 'react';
import { MOODS } from '../constants';
import { 
  ArrowRight, 
  X, 
  ChevronDown, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  Check,
  Sparkles
} from 'lucide-react';
import { useJourney } from '../context/JourneyContext';

export const MoodSelector: React.FC = () => {
  // Use Global Context
  const { isModalOpen, selectedMood, openModal, closeModal, setSelectedMood } = useJourney();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Form State
  const [form, setForm] = useState({ name: '', whatsapp: '', email: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // UI State
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMoodDropdownOpen, setIsMoodDropdownOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const calendarRef = useRef<HTMLDivElement>(null);
  const moodDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
      if (moodDropdownRef.current && !moodDropdownRef.current.contains(event.target as Node)) {
        setIsMoodDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setSelectedDate(null);
      setSelectedTime(null);
      setForm({ name: '', whatsapp: '', email: '' });
      setErrors({});
    }
  }, [isModalOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Name Validation
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // WhatsApp/Phone Validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!form.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!phoneRegex.test(form.whatsapp.replace(/\s/g, ''))) {
      newErrors.whatsapp = 'Enter a valid phone number (min 10 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && selectedMood && selectedDate && selectedTime) {
        // In a real app, you would send the form data here
        console.log('Booking:', { ...form, mood: selectedMood, date: selectedDate, time: selectedTime });
        scrollToSection(selectedMood.targetSection);
        closeModal();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // --- Calendar Logic ---
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentMonth(newDate);
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    setSelectedTime(null); // Reset time when date changes because slots might change
    setIsCalendarOpen(false);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDate?.toDateString() === dateToCheck.toDateString();
      const isToday = new Date().toDateString() === dateToCheck.toDateString();

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(day)}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm transition-all
            ${isSelected ? 'bg-clay-600 text-white font-bold shadow-md' : 'hover:bg-void-700 text-earth-300 hover:text-earth-100'}
            ${isToday && !isSelected ? 'border border-clay-500 text-clay-400 font-medium' : ''}
          `}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  // --- Time Slot Logic ---
  const getTimeSlots = (date: Date) => {
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = day === 0 || day === 6;

    if (isWeekend) {
        return [
            '7:15 AM - 8:00 AM',
            '8:15 AM - 9:00 AM',
            '9:15 AM - 10:00 AM'
        ];
    } else {
        return [
            '7:15 AM - 8:00 AM',
            '9:15 PM - 10:00 PM'
        ];
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
  };

  return (
    <div id="moods" className="py-24 px-6 bg-void-950 border-b border-void-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-earth-100 text-center mb-12">
          Begin Journey
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4">
          {MOODS.map((mood) => (
            <React.Fragment key={mood.id}>
              {mood.id === 'let-go' && <div className="w-full h-0 basis-full" />}
              <button
                onClick={() => openModal(mood)}
                className="group relative px-8 py-4 bg-void-800 border border-void-700 rounded-full shadow-sm hover:shadow-md hover:border-clay-500 transition-all duration-300 flex items-center space-x-2"
              >
                <span className="font-sans text-sm font-medium uppercase tracking-widest text-earth-200 group-hover:text-clay-400 transition-colors">
                  I want to {mood.label}
                </span>
                <ArrowRight className="w-4 h-4 text-earth-500 group-hover:text-clay-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedMood && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-void-950/80 backdrop-blur-sm transition-opacity duration-500"
            onClick={closeModal}
          />
          
          <div className="relative bg-void-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar border border-void-700 ring-1 ring-white/5 animate-fade-in-up transform transition-all">
            {/* Decorative Top Bar */}
            <div className="sticky top-0 z-20 h-1.5 w-full bg-gradient-to-r from-void-900 via-clay-600 to-void-900"></div>

            <div className="p-8 md:p-10">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full text-earth-500 hover:text-earth-200 hover:bg-void-700 transition-all duration-300 z-20"
              >
                <X size={20} />
              </button>

              <div className="mb-8 text-center">
                <span className="text-[10px] font-bold tracking-[0.25em] text-clay-500 uppercase mb-3 block">Intention</span>
                <h3 className="font-serif text-4xl text-earth-100">Begin Your Journey</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                
                {/* Custom Mood Dropdown */}
                <div className="space-y-2" ref={moodDropdownRef}>
                  <div className="relative">
                      <button
                          type="button"
                          onClick={() => setIsMoodDropdownOpen(!isMoodDropdownOpen)}
                          className={`w-full text-left px-5 pl-12 py-4 rounded-xl bg-void-800 ring-1 ring-void-700 text-earth-100 focus:outline-none focus:ring-2 focus:ring-clay-500/30 transition-all font-sans text-sm font-medium uppercase tracking-widest cursor-pointer shadow-sm flex items-center justify-between group
                              ${isMoodDropdownOpen ? 'ring-clay-500/50 bg-void-700' : 'hover:bg-void-700'}
                          `}
                      >
                           <div className="flex items-center gap-3">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-500 group-hover:text-clay-500 transition-colors">
                                    <Sparkles size={18} />
                                </span>
                                <span>I want to {selectedMood.label}</span>
                           </div>
                           <ChevronDown className={`h-5 w-5 text-earth-500 transition-transform duration-300 ${isMoodDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {isMoodDropdownOpen && (
                           <div className="absolute top-full left-0 right-0 mt-2 bg-void-800 rounded-xl shadow-xl border border-void-600 py-2 z-50 animate-[fadeInUp_0.1s_ease-out_forwards] max-h-60 overflow-y-auto">
                               {MOODS.map((mood) => (
                                   <button
                                       key={mood.id}
                                       type="button"
                                       onClick={() => {
                                           setSelectedMood(mood);
                                           setIsMoodDropdownOpen(false);
                                       }}
                                       className={`w-full text-left px-5 py-3 hover:bg-void-700 transition-colors flex items-center justify-between font-sans text-sm font-medium uppercase tracking-widest
                                            ${selectedMood.id === mood.id ? 'text-clay-500 bg-void-700/50' : 'text-earth-300'}
                                       `}
                                   >
                                       <span>I want to {mood.label}</span>
                                       {selectedMood.id === mood.id && <Check size={18} className="text-clay-500" />}
                                   </button>
                               ))}
                           </div>
                      )}
                  </div>
                </div>

                {/* Floating Label Inputs */}
                <div className="space-y-5">
                    {/* Name Field */}
                    <div className="relative">
                       <input 
                         type="text" 
                         id="name"
                         value={form.name}
                         onChange={(e) => handleInputChange('name', e.target.value)}
                         required 
                         placeholder=" "
                         className={`peer w-full pl-12 pr-5 py-3 pt-5 rounded-lg bg-void-800 ring-1 text-earth-100 focus:outline-none focus:ring-2 transition-all placeholder-transparent
                            ${errors.name ? 'ring-red-900/50 focus:ring-red-800 bg-red-900/10' : 'ring-void-700 focus:ring-clay-500/30'}
                         `}
                       />
                       <label 
                         htmlFor="name"
                         className={`absolute left-12 top-1 text-[10px] font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase pointer-events-none
                            ${errors.name ? 'text-red-400 peer-placeholder-shown:text-red-400 peer-focus:text-red-500' : 'text-earth-500 peer-placeholder-shown:text-earth-500 peer-focus:text-clay-500'}
                         `}
                       >
                         Your Name
                       </label>
                       <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors pointer-events-none
                           ${errors.name ? 'text-red-400' : 'text-earth-500 peer-focus:text-clay-500'}
                       `}>
                           <User size={18} />
                       </div>
                       {errors.name && (
                         <div className="absolute right-3 top-3.5 text-red-500">
                           <AlertCircle size={16} />
                         </div>
                       )}
                       {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                       <input 
                         type="email" 
                         id="email"
                         value={form.email}
                         onChange={(e) => handleInputChange('email', e.target.value)}
                         required 
                         placeholder=" "
                         className={`peer w-full pl-12 pr-5 py-3 pt-5 rounded-lg bg-void-800 ring-1 text-earth-100 focus:outline-none focus:ring-2 transition-all placeholder-transparent
                            ${errors.email ? 'ring-red-900/50 focus:ring-red-800 bg-red-900/10' : 'ring-void-700 focus:ring-clay-500/30'}
                         `}
                       />
                       <label 
                         htmlFor="email"
                         className={`absolute left-12 top-1 text-[10px] font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase pointer-events-none
                            ${errors.email ? 'text-red-400 peer-placeholder-shown:text-red-400 peer-focus:text-red-500' : 'text-earth-500 peer-placeholder-shown:text-earth-500 peer-focus:text-clay-500'}
                         `}
                       >
                         Email Address
                       </label>
                       <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors pointer-events-none
                           ${errors.email ? 'text-red-400' : 'text-earth-500 peer-focus:text-clay-500'}
                       `}>
                           <Mail size={18} />
                       </div>
                       {errors.email && (
                         <div className="absolute right-3 top-3.5 text-red-500">
                           <AlertCircle size={16} />
                         </div>
                       )}
                       {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.email}</p>}
                    </div>
                    
                    {/* WhatsApp Field */}
                     <div className="relative">
                       <input 
                         type="tel" 
                         id="whatsapp"
                         value={form.whatsapp}
                         onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                         required 
                         placeholder=" "
                         className={`peer w-full pl-12 pr-5 py-3 pt-5 rounded-lg bg-void-800 ring-1 text-earth-100 focus:outline-none focus:ring-2 transition-all placeholder-transparent
                            ${errors.whatsapp ? 'ring-red-900/50 focus:ring-red-800 bg-red-900/10' : 'ring-void-700 focus:ring-clay-500/30'}
                         `}
                       />
                       <label 
                         htmlFor="whatsapp"
                         className={`absolute left-12 top-1 text-[10px] font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase pointer-events-none
                            ${errors.whatsapp ? 'text-red-400 peer-placeholder-shown:text-red-400 peer-focus:text-red-500' : 'text-earth-500 peer-placeholder-shown:text-earth-500 peer-focus:text-clay-500'}
                         `}
                       >
                         WhatsApp / Phone
                       </label>
                       <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors pointer-events-none
                           ${errors.whatsapp ? 'text-red-400' : 'text-earth-500 peer-focus:text-clay-500'}
                       `}>
                           <Phone size={18} />
                       </div>
                       {errors.whatsapp && (
                         <div className="absolute right-3 top-3.5 text-red-500">
                           <AlertCircle size={16} />
                         </div>
                       )}
                       {errors.whatsapp && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.whatsapp}</p>}
                    </div>
                </div>

                {/* Date & Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date Picker */}
                  <div className="relative" ref={calendarRef}>
                      <button
                          type="button"
                          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                          className={`w-full flex items-center justify-between px-4 py-3 bg-void-800 rounded-lg ring-1 text-earth-100 focus:outline-none transition-all
                              ${isCalendarOpen ? 'ring-clay-500/50' : 'ring-void-700 hover:bg-void-700'}
                              ${selectedDate ? 'text-earth-100' : 'text-earth-400'}
                          `}
                      >
                          <div className="flex items-center gap-3">
                              <Calendar size={18} className="text-earth-500" />
                              <span>{selectedDate ? formatDate(selectedDate) : 'Select Date'}</span>
                          </div>
                          <ChevronDown className={`h-4 w-4 text-earth-500 transition-transform ${isCalendarOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Calendar Dropdown */}
                      {isCalendarOpen && (
                          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-void-800 rounded-xl shadow-xl border border-void-600 z-50 animate-fade-in-up">
                              <div className="flex items-center justify-between mb-4">
                                  <button type="button" onClick={() => changeMonth(-1)} className="p-1 hover:bg-void-700 rounded-full text-earth-400 hover:text-earth-200">
                                      <ChevronLeft size={16} />
                                  </button>
                                  <span className="font-sans font-medium text-earth-200">
                                      {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                  </span>
                                  <button type="button" onClick={() => changeMonth(1)} className="p-1 hover:bg-void-700 rounded-full text-earth-400 hover:text-earth-200">
                                      <ChevronRight size={16} />
                                  </button>
                              </div>
                              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                                      <div key={day} className="text-[10px] font-bold text-earth-500">{day}</div>
                                  ))}
                              </div>
                              <div className="grid grid-cols-7 gap-1 place-items-center">
                                  {renderCalendarDays()}
                              </div>
                          </div>
                      )}
                  </div>

                  {/* Time Slot Picker */}
                  <div className="relative">
                       <div className="relative">
                           <button
                               type="button"
                               disabled={!selectedDate}
                               className={`w-full flex items-center justify-between px-4 py-3 bg-void-800 rounded-lg ring-1 transition-all
                                   ${!selectedDate ? 'opacity-50 cursor-not-allowed ring-void-700' : 'ring-void-700 hover:bg-void-700 cursor-default'}
                                   text-earth-100
                               `}
                           >
                               <div className="flex items-center gap-3">
                                   <Clock size={18} className="text-earth-500" />
                                   <span>{selectedTime || 'Select Time'}</span>
                               </div>
                           </button>
                       </div>
                       
                       {/* Time Slots List (Displayed below if date selected) */}
                       {selectedDate && (
                           <div className="mt-2 grid grid-cols-1 gap-2">
                               {getTimeSlots(selectedDate).map((time) => (
                                   <button
                                       key={time}
                                       type="button"
                                       onClick={() => setSelectedTime(time)}
                                       className={`px-3 py-2 rounded-md text-sm text-center border transition-all
                                           ${selectedTime === time 
                                               ? 'bg-clay-600/20 border-clay-500 text-clay-400' 
                                               : 'bg-void-800 border-void-700 text-earth-300 hover:border-clay-500/50 hover:text-earth-100'}
                                       `}
                                   >
                                       {time}
                                   </button>
                               ))}
                           </div>
                       )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!selectedMood || !selectedDate || !selectedTime}
                  className={`w-full py-4 mt-8 rounded-full font-sans text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center justify-center space-x-2
                      ${(!selectedMood || !selectedDate || !selectedTime) 
                          ? 'bg-void-800 text-earth-600 cursor-not-allowed border border-void-700' 
                          : 'bg-clay-600 text-white hover:bg-clay-500 hover:shadow-clay-900/20 hover:-translate-y-0.5 border border-clay-500'}
                  `}
                >
                  <span>Confirm Booking</span>
                  <ArrowRight size={16} />
                </button>

              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
