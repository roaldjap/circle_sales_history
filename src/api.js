import * as dotenv from 'dotenv'
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
const router = express.Router();
const supabaseUrl = 'https://bdivylzuoyjsbxdaclam.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET api/
router.get("/", (req, res) => {
  const fetchSales = async () => {
    const { data, error } = await supabase
      .from('sales_history')
      .select()
      .limit(10);
    if (error) {
      res.json(error);
      return false
    }
    res.json(data);
  }

  fetchSales();
});

// GET api/monthly
router.get("/monthly", (req, res) => {
  res.json({
    "success": "This route works"
  });
});

app.use('/.netlify/functions/api', router);

exports.handler = serverless(app);
