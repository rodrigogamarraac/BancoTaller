
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://giutujnkwdtnpvksgrni.supabase.co"
const supabaseKey = "sb_publishable_GzpdvC5aEduVeH6O0HQo4A_AxKlknu_"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase