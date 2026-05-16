import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from './api.config';
import type {
  ContactResponse,
  PublicCar,
  VisitorThread,
} from './api.types';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  getPublicCar(carId: string): Promise<PublicCar> {
    return firstValueFrom(
      this.http.get<PublicCar>(`${API_BASE_URL}/public/cars/${carId}`),
    );
  }

  sendContact(
    carId: string,
    body: { text: string; visitorToken?: string; displayName?: string },
  ): Promise<ContactResponse> {
    return firstValueFrom(
      this.http.post<ContactResponse>(
        `${API_BASE_URL}/public/cars/${carId}/contact`,
        body,
      ),
    );
  }

  getVisitorThread(carId: string, visitorToken: string): Promise<VisitorThread> {
    const params = new HttpParams().set('visitorToken', visitorToken);
    return firstValueFrom(
      this.http.get<VisitorThread>(
        `${API_BASE_URL}/public/cars/${carId}/thread`,
        { params },
      ),
    );
  }
}
