import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { User } from './../../models/User';
import { AuthResponse } from './../../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  public currentUser = signal<User | null>(null);
  public isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    const userFromStorage = localStorage.getItem('currentUser');
    this.currentUser.set(userFromStorage ? JSON.parse(userFromStorage) : null);
  }


  register(user: any): Observable<any> {
    const payload = {
      first_name: user.nombres,
      last_name: user.apellidos,
      email: user.correo,
      password: user.password
    };

    return this.http.post(`${environment.apiUrl}${environment.singupPath}`, payload);
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}${environment.loginPath}`, credentials).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUser.set(response.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
  }
}
