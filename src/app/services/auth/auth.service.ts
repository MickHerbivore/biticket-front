import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from './../../models/auth-response.model';
import { User } from './../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const userFromStorage = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(userFromStorage ? JSON.parse(userFromStorage) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: any): Observable<any> {
    const payload = {
      first_name: user.nombres,
      last_name: user.apellidos,
      email: user.correo,
      password: user.password
    };

    return this.http.post(`${this.apiUrl}/api/auth/signup`, payload);
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/login`, credentials).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
