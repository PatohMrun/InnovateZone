import { createClient } from "@supabase/supabase-js";
//  const supabase = createClient(process.env.REACT_APP_SUPABASE_URL,process.env.REACT_APP_SUPABASE_KEY)
const supabase = createClient(
  "https://rkgaeoujgtdvfwgpqljz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrZ2Flb3VqZ3RkdmZ3Z3BxbGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0NjQzODMsImV4cCI6MTk5MjA0MDM4M30.v2by8Dvg4Cc3MNQ0kSzBIik8j9J_MI2HBF8eBplI2WI"
);

export default supabase;
