import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rucwfhprvsvbytijwzya.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1Y3dmaHBydnN2Ynl0aWp3enlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2ODAwNzQsImV4cCI6MjA4MDI1NjA3NH0.opGgTu9Y821hHeroR9sZYAKdEeNaOmUDizSVZDKkGcA'

export const supabase = createClient(supabaseUrl, supabaseKey)