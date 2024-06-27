import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api'; // Adjust if your backend is on a different port

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.apiUrl}/data`);
  }
}