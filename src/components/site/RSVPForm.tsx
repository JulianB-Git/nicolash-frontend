"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { FormEvent, useState } from "react";

type AttendingValue = "" | "yes" | "no";

interface RsvpFormState {
  names: string;
  email: string;
  attending: AttendingValue;
  dietaryNotes: string;
  songRequest: string;
}

const initialFormState: RsvpFormState = {
  names: "",
  email: "",
  attending: "",
  dietaryNotes: "",
  songRequest: "",
};

export default function RSVPForm() {
  const [form, setForm] = useState<RsvpFormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className='paper-card p-6 md:p-8'>
      <form onSubmit={onSubmit} className='grid gap-5 md:grid-cols-2'>
        <div className='md:col-span-2'>
          <label className='label-elegant' htmlFor='names'>
            Name(s)
          </label>
          <input
            id='names'
            name='names'
            autoComplete='name'
            required
            className='input-elegant'
            placeholder='Nicole Carew and Lashca Pieterse'
            value={form.names}
            onChange={(event) =>
              setForm((current) => ({ ...current, names: event.target.value }))
            }
          />
        </div>

        <div className='md:col-span-2'>
          <label className='label-elegant' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            name='email'
            autoComplete='email'
            type='email'
            required
            className='input-elegant'
            placeholder='you@email.com'
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
          />
        </div>

        <div className='md:col-span-2'>
          <label className='label-elegant' htmlFor='attending'>
            Attending
          </label>
          <select
            id='attending'
            name='attending'
            required
            className='input-elegant'
            value={form.attending}
            onChange={(event) => {
              const attending = event.target.value as AttendingValue;
              setForm((current) => ({ ...current, attending }));
            }}
          >
            <option value=''>Select one</option>
            <option value='yes'>Yes, with pleasure</option>
            <option value='no'>Regretfully no</option>
          </select>
        </div>

        <div className='md:col-span-2'>
          <label className='label-elegant' htmlFor='dietaryNotes'>
            Dietary notes
          </label>
          <textarea
            id='dietaryNotes'
            name='dietaryNotes'
            rows={3}
            className='input-elegant resize-none'
            placeholder='Vegetarian, allergies, or other notes.'
            value={form.dietaryNotes}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                dietaryNotes: event.target.value,
              }))
            }
          />
        </div>

        <div className='md:col-span-2'>
          <label className='label-elegant' htmlFor='songRequest'>
            Song request
          </label>
          <input
            id='songRequest'
            name='songRequest'
            className='input-elegant'
            placeholder='One track that should make the dance floor.'
            value={form.songRequest}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                songRequest: event.target.value,
              }))
            }
          />
        </div>

        <div className='md:col-span-2 flex flex-col gap-4 pt-1'>
          <motion.button
            type='submit'
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className='btn-pill-primary w-fit gap-2'
          >
            <Send className='h-3.5 w-3.5' aria-hidden='true' />
            Submit RSVP
          </motion.button>

          <AnimatePresence>
            {submitted ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className='inline-flex items-center gap-2 rounded-2xl border border-sage/25 bg-cream/85 px-4 py-2 text-sm text-ink/85'
                role='status'
                aria-live='polite'
              >
                <CheckCircle2 className='h-4 w-4 text-olive' aria-hidden='true' />
                Thanks. This is a frontend-only RSVP preview.
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
