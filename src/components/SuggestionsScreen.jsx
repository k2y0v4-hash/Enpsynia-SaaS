import { useState } from 'react'
import { Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'

const RATING_OPTIONS = [
  { id: 'yes',     label: 'Tak' },
  { id: 'partial', label: 'Częściowo' },
  { id: 'no',      label: 'Nie' },
]

export function SuggestionsScreen({ onMenu, onSubmit }) {
  const [comment, setComment] = useState('')
  const [rating, setRating]   = useState(null)
  const [email, setEmail]     = useState('')
  const [commentFocused, setCommentFocused] = useState(false)
  const [emailFocused, setEmailFocused]     = useState(false)

  function handleSubmit() {
    onSubmit({ comment, rating, email })
  }

  return (
    <div className="relative min-h-svh bg-[#F7F4EF] flex flex-col">

      <div className="absolute left-[22px] top-[18px]">
        <Hamburger onClick={onMenu} />
      </div>

      <h1 className="text-[25px] font-bold text-[#1F2523] text-center leading-[31px] mt-[54px]">
        Sugestie dla autora
      </h1>
      <p className="text-[13px] text-[#66716C] text-center leading-[16px] mt-2">
        Napisz, co było niejasne albo czego zabrakło.
      </p>

      {/* Komentarz */}
      <div className="mx-6 mt-[41px] bg-[#FFFCF7] border border-[#D9D0C5] rounded-[24px] px-6 py-5">
        <p className="text-[15px] font-semibold text-[#1F2523] leading-[19px]">
          Co warto poprawić?
        </p>
        <p className="text-[13px] text-[#66716C] leading-[17px] mt-2">
          Np. opis suwaka, nazwa stanu albo brakująca propozycja mikro-akcji.
        </p>
        <div className="h-px bg-[#D9D0C5] my-3" />
        {/* Placeholder znika po kliknięciu (focus) — nie tylko przy pisaniu */}
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          onFocus={() => setCommentFocused(true)}
          onBlur={() => setCommentFocused(false)}
          placeholder={commentFocused ? '' : 'Wpisz komentarz…'}
          rows={2}
          className="w-full text-[13px] text-[#1F2523] placeholder:text-[#66716C] bg-transparent outline-none resize-none"
        />
      </div>

      {/* Ocena */}
      <p className="text-[15px] font-semibold text-[#1F2523] text-center leading-[19px] mt-7">
        Czy aplikacja jest pomocna?
      </p>
      <div className="flex justify-between px-[42px] mt-4">
        {RATING_OPTIONS.map(opt => {
          const active = rating === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => setRating(opt.id)}
              className={`w-[113px] h-[46px] rounded-[17px] text-[12px] font-semibold ${
                active
                  ? 'bg-[#1D6B5F] text-white'
                  : 'bg-[#FFFCF7] border border-[#D9D0C5] text-[#1D6B5F]'
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Email */}
      <div className="mx-6 mt-5">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          placeholder={emailFocused ? '' : 'E-mail opcjonalnie'}
          className="w-full bg-[#FFFCF7] border border-[#D9D0C5] rounded-[18px] h-[54px] px-6 text-[14px] text-[#1F2523] placeholder:text-[#66716C] outline-none"
        />
      </div>

      <div className="flex justify-center mt-[58px] mb-0">
        <ActionButton variant="primary" size="wide" onClick={handleSubmit}>
          Wyślij sugestię
        </ActionButton>
      </div>

      <div className="flex-1 min-h-[32px]" />
      <ScreenFooter />
    </div>
  )
}
