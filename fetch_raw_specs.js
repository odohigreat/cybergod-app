require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);
async function run() {
  const { data, error } = await supabase.from('phones').select('raw_specs').not('raw_specs', 'is', null).limit(1);
  if (error) console.error(error);
  else console.log(JSON.stringify(data[0].raw_specs, null, 2));
}
run();
