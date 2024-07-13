import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  createOrder() {
    return this.http.post(`${environment.apiUrl}${environment.orderPath}`, { userId: this.authService.currentUser()?.id! });
  }

}
