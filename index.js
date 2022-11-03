import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const supabaseUrl = 'https://bdivylzuoyjsbxdaclam.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/", (req, res) => {
  const fetchSales = async () => {
    const { data, error } = await supabase
      .from('sales_history')
      .select()
      .limit(10);
    if (error) {
      res.send(error);
      return false
    }
    res.send(data);
  }

  fetchSales();
});

app.listen(9999, () => { console.log("API is running on 9999") });