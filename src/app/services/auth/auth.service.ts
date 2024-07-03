import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../../models/User';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const user = token ? this.decodeToken(token) : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
    this.checkTokenValidity();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
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
      } else {
        localStorage.removeItem('token');
        return null;
      }
    } catch (e) {
      localStorage.removeItem('token');
      return null;
    }
  }

  private checkTokenValidity() {
    const token = localStorage.getItem('token');
    if (token) {
      const user = this.decodeToken(token);
      if (!user) {
        this.logout();
      }
    }
  }

  register(user: { first_name: string, last_name: string, email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:8080/api/auth/register', user).pipe(
      map(response => {
        const token = response.token;
        const newUser = this.decodeToken(token);
        if (newUser) {
          localStorage.setItem('token', token);
          this.currentUserSubject.next(newUser);
        }
        return response;
      })
    );
  }

  login(credentials: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:8080/api/auth/login', credentials).pipe(
      map(response => {
        const token = response.token;
        const user = this.decodeToken(token);
        if (user) {
          localStorage.setItem('token', token);
          this.currentUserSubject.next(user);
        }
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
