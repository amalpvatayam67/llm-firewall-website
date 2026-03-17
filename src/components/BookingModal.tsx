'use client';

/**
 * BookingModal — Professional appointment booking.
 *
 * Flow:
 *   Step 1 → Pick a date
 *   Step 2 → Pick a time slot (availability fetched from owner's calendar)
 *   Step 3 → Fill contact form & submit
 *   Step 4 → Success confirmation
 *
 * Visitors NEVER see any Google screen.
 * The owner authenticates once via /api/booking/setup.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CalendarDays,
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Building2,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Sparkles,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ????????? Types ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

interface TimeSlot {
  start: string;
  end: string;
  label: string;
}

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

type Step = 'date' | 'time' | 'form' | 'success' | 'error';

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// ????????? Helpers ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

function toDateISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth() &&
    a.getDate()     === b.getDate();
}

// ????????? Step indicator ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

function StepIndicator({ step }: { step: Step }) {
  const steps: { id: Step; label: string }[] = [
    { id: 'date',    label: 'Date' },
    { id: 'time',    label: 'Time' },
    { id: 'form',    label: 'Details' },
    { id: 'success', label: 'Confirmed' },
  ];
  const current = steps.findIndex((s) => s.id === step);

  return (
    <div className="flex items-center gap-0">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center">
          <div className={cn(
            'flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300',
            i < current   ? 'bg-primary text-background' :
            i === current ? 'bg-primary text-background ring-2 ring-primary/30 ring-offset-2 ring-offset-[#0f1a14]' :
                            'bg-white/8 text-foreground/30'
          )}>
            {i < current ? <CheckCircle2 size={14} /> : i + 1}
          </div>
          {i < steps.length - 1 && (
            <div className={cn(
              'w-12 h-px mx-1 transition-all duration-500',
              i < current ? 'bg-primary' : 'bg-white/10'
            )} />
          )}
        </div>
      ))}
    </div>
  );
}

// ????????? Calendar Grid ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

function CalendarGrid({
  viewYear, viewMonth, selected, today, maxDate, onSelect, onPrev, onNext,
}: {
  viewYear: number; viewMonth: number;
  selected: Date | null; today: Date; maxDate: Date;
  onSelect: (d: Date) => void;
  onPrev: () => void; onNext: () => void;
}) {
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isPrevDisabled = () => {
    const prev = new Date(viewYear, viewMonth - 1, 1);
    return prev < new Date(today.getFullYear(), today.getMonth(), 1);
  };
  const isNextDisabled = () => {
    const next = new Date(viewYear, viewMonth + 1, 1);
    return next > new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
  };

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-5">
        <button onClick={onPrev} disabled={isPrevDisabled()}
          className="p-2 rounded-lg text-foreground/50 hover:text-foreground hover:bg-white/8 disabled:opacity-25 disabled:cursor-not-allowed transition-colors">
          <ChevronLeft size={16} />
        </button>
        <h3 className="text-sm font-semibold text-foreground">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </h3>
        <button onClick={onNext} disabled={isNextDisabled()}
          className="p-2 rounded-lg text-foreground/50 hover:text-foreground hover:bg-white/8 disabled:opacity-25 disabled:cursor-not-allowed transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-[11px] font-medium text-foreground/30 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} />;
          const isToday     = isSameDay(date, today);
          const isSelected  = selected ? isSameDay(date, selected) : false;
          const isPast      = date < today && !isToday;
          const isBeyondMax = date > maxDate;
          const isWeekend   = date.getDay() === 0 || date.getDay() === 6;
          const disabled    = isPast || isBeyondMax;

          return (
            <button key={date.toISOString()} onClick={() => !disabled && onSelect(date)} disabled={disabled}
              className={cn(
                'relative h-9 w-full flex items-center justify-center rounded-lg text-sm transition-all duration-150',
                disabled    ? 'text-foreground/20 cursor-not-allowed' :
                isSelected  ? 'bg-primary text-background font-semibold shadow-lg shadow-primary/20' :
                isToday     ? 'border border-primary/50 text-primary font-medium hover:bg-primary/10' :
                isWeekend   ? 'text-foreground/40 hover:bg-white/5 hover:text-foreground/60' :
                              'text-foreground/80 hover:bg-white/8 hover:text-foreground',
              )}>
              {date.getDate()}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ????????? Main Component ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const today   = new Date(); today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today); maxDate.setDate(maxDate.getDate() + 30);

  const [step, setStep]                 = useState<Step>('date');
  const [viewYear, setViewYear]         = useState(today.getFullYear());
  const [viewMonth, setViewMonth]       = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [slots, setSlots]               = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsWarning, setSlotsWarning] = useState<string | null>(null);
  const [form, setForm]                 = useState<FormState>({ name: '', email: '', company: '', message: '' });
  const [submitting, setSubmitting]     = useState(false);
  const [successData, setSuccessData]   = useState<{ htmlLink?: string; summary?: string } | null>(null);
  const [errorMsg, setErrorMsg]         = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Reset on open/close
  useEffect(() => {
    if (isOpen) {
      setStep('date');
      setSelectedDate(null);
      setSelectedSlot(null);
      setSlots([]);
      setSlotsWarning(null);
      setErrorMsg(null);
      setSuccessData(null);
      setForm({ name: '', email: '', company: '', message: '' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Fetch available slots from owner's calendar
  const fetchSlots = useCallback(async (date: Date) => {
    setSlotsLoading(true);
    setSlotsWarning(null);
    const iso = toDateISO(date);
    try {
      const res  = await fetch(`/api/booking/slots?date=${iso}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load slots');
      setSlots(data.slots ?? []);
      if (data.warning) setSlotsWarning(data.warning);
    } catch (err: unknown) {
      setSlotsWarning(err instanceof Error ? err.message : 'Could not load available slots.');
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  function handleDateSelect(date: Date) {
    setSelectedDate(date);
    setSelectedSlot(null);
    fetchSlots(date);
    setStep('time');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot || !selectedDate) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, start: selectedSlot.start, end: selectedSlot.end, date: toDateISO(selectedDate) }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          setStep('time');
          setSlotsWarning(data.error ?? 'Slot no longer available.');
          await fetchSlots(selectedDate);
          return;
        }
        throw new Error(data.error ?? 'Booking failed.');
      }
      setSuccessData({ htmlLink: data.htmlLink, summary: data.summary });
      setStep('success');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }

  const selectedDateStr = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    : '';

  const panelVariants = {
    hidden:  { opacity: 0, y: 24, scale: 0.97 },
    visible: { opacity: 1, y: 0,  scale: 1    },
    exit:    { opacity: 0, y: -16, scale: 0.97 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] isolate flex items-center justify-center p-4 md:p-6"
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 20,  scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0d1710] border border-white/10 rounded-2xl shadow-2xl shadow-black/60"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#10b98133 transparent' }}
          >
            {/* Header glow */}
            <div className="pointer-events-none absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/8 via-primary/3 to-transparent rounded-t-2xl" />

            {/* Header */}
            <div className="relative flex items-start justify-between px-6 pt-6 pb-4 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-primary/15 border border-primary/20">
                  <CalendarDays size={22} className="text-primary" />
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Sparkles size={9} className="text-background" />
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground leading-tight">Book a Demo</h2>
                  <p className="text-xs text-foreground/50 mt-0.5">Schedule a live walkthrough of LaroGuard</p>
                </div>
              </div>
              <button onClick={onClose}
                className="mt-0.5 p-2 rounded-lg text-foreground/40 hover:text-foreground hover:bg-white/8 transition-colors" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Step indicator */}
            {step !== 'success' && step !== 'error' && (
              <div className="px-6 pt-4 pb-2 flex items-center justify-between">
                <StepIndicator step={step} />
                {selectedDate && step !== 'date' && (
                  <span className="text-xs text-foreground/40 hidden sm:block">{selectedDateStr}</span>
                )}
              </div>
            )}

            {/* Body */}
            <div className="px-6 pb-7 pt-3">
              <AnimatePresence mode="wait">

                {/* ?????? Step 1: Date ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? */}
                {step === 'date' && (
                  <motion.div key="date" variants={panelVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.22 }}>
                    <p className="text-sm text-foreground/50 mb-5">
                      Choose a date for your 30-minute demo session.
                    </p>
                    <CalendarGrid
                      viewYear={viewYear} viewMonth={viewMonth}
                      selected={selectedDate} today={today} maxDate={maxDate}
                      onSelect={handleDateSelect} onPrev={prevMonth} onNext={nextMonth}
                    />
                  </motion.div>
                )}

                {/* ?????? Step 2: Time ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? */}
                {step === 'time' && (
                  <motion.div key="time" variants={panelVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.22 }}>
                    <button onClick={() => setStep('date')}
                      className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground/70 mb-4 transition-colors">
                      <ChevronLeft size={13} /> Back to calendar
                    </button>

                    <div className="flex items-center gap-2 mb-5">
                      <CalendarDays size={15} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">{selectedDateStr}</span>
                    </div>

                    {slotsWarning && (
                      <div className="flex items-start gap-2 mb-4 px-3 py-2.5 rounded-lg bg-warning/10 border border-warning/20 text-warning text-xs">
                        <AlertCircle size={13} className="mt-0.5 shrink-0" />
                        <span>{slotsWarning}</span>
                      </div>
                    )}

                    {slotsLoading ? (
                      <div className="flex flex-col items-center justify-center py-14 gap-3">
                        <Loader2 size={24} className="text-primary animate-spin" />
                        <p className="text-sm text-foreground/40">Checking availability…</p>
                      </div>
                    ) : slots.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-14 gap-3 text-center">
                        <Clock size={32} className="text-foreground/20" />
                        <p className="text-sm text-foreground/50">No available slots for this day.</p>
                        <button onClick={() => setStep('date')} className="mt-1 text-xs text-primary hover:underline">
                          Pick another date
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs text-foreground/40 mb-3">
                          {slots.length} slot{slots.length !== 1 ? 's' : ''} available · 30 min each
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {slots.map((slot) => (
                            <button key={slot.start}
                              onClick={() => { setSelectedSlot(slot); setStep('form'); }}
                              className={cn(
                                'h-10 rounded-lg text-sm font-medium border transition-all duration-150',
                                selectedSlot?.start === slot.start
                                  ? 'bg-primary text-background border-primary shadow-md shadow-primary/20'
                                  : 'bg-white/4 border-white/8 text-foreground/70 hover:bg-primary/10 hover:border-primary/40 hover:text-primary',
                              )}>
                              {slot.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {/* ?????? Step 3: Form ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? */}
                {step === 'form' && (
                  <motion.div key="form" variants={panelVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.22 }}>
                    <button onClick={() => setStep('time')}
                      className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground/70 mb-4 transition-colors">
                      <ChevronLeft size={13} /> Back to time slots
                    </button>

                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-foreground/60 bg-white/5 border border-white/8 rounded-full px-3 py-1">
                        <CalendarDays size={11} className="text-primary" /> {selectedDateStr}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-foreground/60 bg-white/5 border border-white/8 rounded-full px-3 py-1">
                        <Clock size={11} className="text-primary" /> {selectedSlot?.label}
                      </span>
                    </div>

                    {errorMsg && (
                      <div className="flex items-start gap-2 mb-4 px-3 py-2.5 rounded-lg bg-danger/10 border border-danger/20 text-danger text-xs">
                        <AlertCircle size={13} className="mt-0.5 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-foreground/60 mb-1.5">
                          Full name <span className="text-danger">*</span>
                        </label>
                        <div className="relative">
                          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" />
                          <input required value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            placeholder="Jane Smith"
                            className="w-full pl-9 pr-4 py-2.5 bg-white/4 border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-foreground/60 mb-1.5">
                          Email address <span className="text-danger">*</span>
                        </label>
                        <div className="relative">
                          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" />
                          <input required type="email" value={form.email}
                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                            placeholder="jane@company.com"
                            className="w-full pl-9 pr-4 py-2.5 bg-white/4 border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors" />
                        </div>
                        <p className="mt-1 text-[11px] text-foreground/30">A calendar invite will be sent to this address.</p>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-foreground/60 mb-1.5">
                          Company <span className="text-foreground/30">(optional)</span>
                        </label>
                        <div className="relative">
                          <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" />
                          <input value={form.company}
                            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                            placeholder="Acme Corp"
                            className="w-full pl-9 pr-4 py-2.5 bg-white/4 border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-foreground/60 mb-1.5">
                          What would you like to discuss? <span className="text-foreground/30">(optional)</span>
                        </label>
                        <div className="relative">
                          <MessageSquare size={14} className="absolute left-3 top-3 text-foreground/30" />
                          <textarea rows={3} value={form.message}
                            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                            placeholder="I'd love to see how LaroGuard handles prompt injection in our RAG pipeline…"
                            className="w-full pl-9 pr-4 py-2.5 bg-white/4 border border-white/10 rounded-lg text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors resize-none" />
                        </div>
                      </div>

                      <button type="submit"
                        disabled={submitting || !form.name.trim() || !form.email.trim()}
                        className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-primary text-background text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                        {submitting
                          ? <><Loader2 size={16} className="animate-spin" /> Booking…</>
                          : <><CalendarDays size={16} /> Confirm Appointment</>
                        }
                      </button>

                      <p className="text-[11px] text-foreground/25 text-center leading-relaxed">
                        By booking you agree to receive a Google Calendar invite at the email above.
                      </p>
                    </form>
                  </motion.div>
                )}

                {/* ?????? Step 4: Success ??????????????????????????????????????????????????????????????????????????????????????????????????????????????? */}
                {step === 'success' && (
                  <motion.div key="success" variants={panelVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.25 }}
                    className="flex flex-col items-center text-center py-8 gap-5">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
                      className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/15 border border-primary/30">
                      <CheckCircle2 size={40} className="text-primary" />
                    </motion.div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
                      <p className="text-sm text-foreground/55 max-w-sm leading-relaxed">
                        Your demo is on the calendar. A confirmation invite has been sent to{' '}
                        <span className="text-foreground/80 font-medium">{form.email}</span>.
                      </p>
                    </div>

                    <div className="w-full bg-white/4 border border-white/8 rounded-xl p-4 text-left space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays size={13} className="text-primary shrink-0" />
                        <span className="text-foreground/70">{selectedDateStr}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={13} className="text-primary shrink-0" />
                        <span className="text-foreground/70">{selectedSlot?.label} · 30 min</span>
                      </div>
                      {successData?.summary && (
                        <div className="flex items-center gap-2 text-sm">
                          <Shield size={13} className="text-primary shrink-0" />
                          <span className="text-foreground/70">{successData.summary}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      {successData?.htmlLink && (
                        <a href={successData.htmlLink} target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg bg-primary/15 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/25 transition-colors">
                          <ExternalLink size={14} /> View in Google Calendar
                        </a>
                      )}
                      <button onClick={onClose}
                        className="flex-1 flex items-center justify-center h-10 rounded-lg bg-white/6 border border-white/10 text-foreground/70 text-sm font-medium hover:bg-white/10 hover:text-foreground transition-colors">
                        Close
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ?????? Error fallback ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????? */}
                {step === 'error' && (
                  <motion.div key="error" variants={panelVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.22 }}
                    className="flex flex-col items-center text-center py-10 gap-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-danger/10 border border-danger/20">
                      <AlertCircle size={32} className="text-danger" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Something went wrong</h3>
                    <p className="text-sm text-foreground/50">{errorMsg ?? 'An unexpected error occurred.'}</p>
                    <div className="flex gap-3">
                      <button onClick={() => setStep('form')}
                        className="h-9 px-5 rounded-lg bg-primary text-background text-sm font-medium hover:bg-primary-dark transition-colors">
                        Try again
                      </button>
                      <button onClick={onClose}
                        className="h-9 px-5 rounded-lg bg-white/6 border border-white/10 text-foreground/70 text-sm hover:bg-white/10 transition-colors">
                        Close
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Trust bar */}
            {step !== 'success' && step !== 'error' && (
              <div className="border-t border-white/6 px-6 py-3 flex items-center justify-center gap-4">
                <span className="flex items-center gap-1.5 text-[11px] text-foreground/25">
                  <Lock size={10} /> Encrypted
                </span>
                <span className="w-px h-3 bg-white/10" />
                <span className="flex items-center gap-1.5 text-[11px] text-foreground/25">
                  <Shield size={10} /> Powered by Google Calendar
                </span>
                <span className="w-px h-3 bg-white/10" />
                <span className="text-[11px] text-foreground/25">No spam, ever</span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
