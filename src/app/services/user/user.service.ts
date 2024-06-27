import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    const userFromStorage = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(userFromStorage ? JSON.parse(userFromStorage) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  setUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  clearUser(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}
