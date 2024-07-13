import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderResponse, PaymentResponse } from '../../interfaces/payment.interface';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  public order = signal<OrderResponse | null>(null);

  createOrder(): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${environment.apiUrl}${environment.orderPath}`, { userId: this.authService.currentUser()?.id! })
    .pipe(
      tap((order) => this.order.set(order))
    );
  }

  createPayment(): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${environment.apiUrl}${environment.paymentPath}`, { orderId: this.order()!._id });
  }

  getOrder(orderId: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${environment.apiUrl}${environment.orderPath}${orderId}`)
    .pipe(
      tap((order) => this.order.set(order))
    );
  }

}
