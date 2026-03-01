// Supabase Configuration
const SUPABASE_URL = "https://yjlcafwzjaphobetmvjn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqbGNhZnd6amFwaG9iZXRtdmpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODYyMTMsImV4cCI6MjA4Nzk2MjIxM30.3J6JmJHucGtLRdaIjDMy5C3VUXpm2reLEWwxNXlFpOs";

// Initialize Supabase Client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
