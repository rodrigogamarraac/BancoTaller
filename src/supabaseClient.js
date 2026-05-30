
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://qvjllnlockwwvbfdpcgl.supabase.co"
const supabaseKey = "sb_publishable_GzjmWQ3T5w2Sfm8Ytiu4Og_bOkOooEb"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase