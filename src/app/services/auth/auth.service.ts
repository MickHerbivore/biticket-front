import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { User } from '../../interfaces/user.interface';
import { AuthRequest, AuthResponse } from '../../interfaces/auth.interface';

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

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}${environment.loginPath}`, credentials).pipe(
      tap((response: AuthResponse) => {
        const token = response.token;
        const user = this.decodeToken(token);
        localStorage.setItem('token', token);
        this.currentUser.set(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
  }

  private decodeToken(token: string): User | null {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.exp * 1000 > Date.now()) {
        return {
          id: decodedToken.id,
          first_name: decodedToken.first_name,
          last_name: decodedToken.last_name,
          email: decodedToken.email,
          password: ''
        };
      }
      
      localStorage.removeItem('token');
      return null;
      
    } catch (e) {
      localStorage.removeItem('token');
      return null;
    }
  }

}
