import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _supabaseClient = inject(SupabaseService).supabaseClient;


  signUp(credentials: SignUpWithPasswordCredentials) {
    return this._supabaseClient.auth.signUp(credentials);
  }

  signIn(credentials: SignInWithPasswordCredentials) {
    return this._supabaseClient.auth.signInWithPassword(credentials);
  }

  session() {
    return this._supabaseClient.auth.getSession();
  }

  logOut() {
    return this._supabaseClient.auth.signOut();
  }

  // Nuevo método para obtener el ID del usuario
  async getUserId(): Promise<string> {
    const { data: { session } } = await this.session();
    if (!session?.user.id) {
      throw new Error('No hay usuario autenticado');
    }
    return session.user.id;
  }
}
