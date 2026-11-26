import { createClient } from "@supabase/supabase-js";

// Cliente público (anon key): solo para lecturas permitidas por RLS.
// Las escrituras (subir beats, etc.) siguen pasando por el backend.
export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);
