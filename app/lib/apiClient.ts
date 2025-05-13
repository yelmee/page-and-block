import {
    createClient,
} from "@supabase/supabase-js";
import type {
    Database
} from "../../database.types";
// import {
//     useEffect,
//     useState
// } from "react";


//  const [supabase, setState]= useState<SupabaseClient | null>(null);
//
// useEffect(() => {
//     const instance  =  createClient<Database>(
//         import.meta.env.VITE_SUPABASE_URL,
//         import.meta.env.VITE_SUPABASE_ANON_KEY,
//     );
//     setState(instance)
// }, []);

export const supabase  =  createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
);;