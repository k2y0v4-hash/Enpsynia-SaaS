// Warstwa danych check-inów w Supabase (tylko dla zalogowanego użytkownika).
// Anonimowy użytkownik NIE przechodzi tędy — jego dane zapisuje useLocalStorage.
//
// RLS po stronie bazy gwarantuje, że użytkownik widzi i dodaje wyłącznie własne rekordy.
// Funkcje rzucają błąd przy niepowodzeniu — UI ma pokazać czytelny komunikat,
// a nie fałszywy sukces (decyzja właściciela / plan sekcja 7, pkt 16-17).

import { supabase } from '@/lib/supabaseClient'
import { toCheckinRow, toHistoryEntry } from '@/lib/checkinMapping'

function requireClient() {
  if (!supabase) {
    throw new Error('Supabase nie jest skonfigurowany (brak VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY).')
  }
}

// Zapis pojedynczego check-inu zalogowanego użytkownika.
export async function insertCheckIn(userId, answers, result) {
  requireClient()
  const { error } = await supabase
    .from('check_ins')
    .insert(toCheckinRow(userId, answers, result))
  if (error) throw error
}

// Pobranie własnej historii (od najnowszej), zmapowanej do kształtu HistoryScreen.
export async function fetchMyCheckIns() {
  requireClient()
  const { data, error } = await supabase
    .from('check_ins')
    .select('id, energy, overload, paralysis, movement, social, agency, day_type, microaction_title, created_at')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(toHistoryEntry)
}
