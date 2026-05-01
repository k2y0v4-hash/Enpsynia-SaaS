import { Hamburger, ScreenFooter, ActionButton } from '@/components/ScreenShell'

export function AboutScreen({ onMenu, onBack }) {
  return (
    <div className="relative min-h-svh bg-[#F7F4EF] flex flex-col">

      <div className="absolute left-[22px] top-[18px]">
        <Hamburger onClick={onMenu} />
      </div>

      <h1 className="text-[25px] font-bold text-[#1F2523] text-center leading-[31px] mt-[54px]">
        O projekcie
      </h1>
      <p className="text-[13px] text-[#66716C] text-center leading-[16px] mt-2">
        Nie wiesz co ze sobą zrobić? Apka może pomóc.
      </p>

      <div className="mx-6 mt-[41px] bg-[#FFFCF7] border border-[#D9D0C5] rounded-[28px] px-6 py-8">
        <h2 className="text-[19px] font-bold text-[#1F2523] text-center leading-[24px]">
          Jak to działa.
        </h2>
        <p className="text-[14px] text-[#66716C] text-center leading-[19px] mt-3 mx-2">
          Przesuwając suwaki możesz szybko rozpoznać swój stan i podjąć jedno małe działanie. Czasem to poprawi nastrój, czasem pozwoli pójść dalej.
        </p>
        <div className="h-px bg-[#D9D0C5] my-7" />
        <h2 className="text-[19px] font-bold text-[#1F2523] text-center leading-[24px]">
          Czego apka nie robi?
        </h2>
        <p className="text-[14px] text-[#66716C] text-center leading-[19px] mt-3 mx-2">
          Nie diagnozuje, nie zastępuje specjalistycznego wsparcia i nie ocenia użytkownika.
        </p>
      </div>

      <div className="flex justify-center mt-[40px] mb-0">
        <ActionButton variant="primary" size="wide" onClick={onBack}>
          Wróć do check-inu
        </ActionButton>
      </div>

      <div className="flex-1 min-h-[32px]" />
      <ScreenFooter />
    </div>
  )
}
