import { environment } from '../../../environments/environment.development';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
   }
}
