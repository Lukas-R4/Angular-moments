import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../Moment';
import { environment } from 'src/environments/environment';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private readonly baseUrl = environment.baseApiUrl;
  private readonly momentsUrl = `${this.baseUrl}api/moments`;

  constructor(private http: HttpClient) {}

  getAllMoments(): Observable<Response<Array<Moment>>> {
    return this.http.get<Response<Array<Moment>>>(this.momentsUrl);
  }

  getMoment(id: number): Observable<Response<Moment>> {
    const url = `${this.momentsUrl}/${id}`;
    return this.http.get<Response<Moment>>(url);
  }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.momentsUrl, formData);
  }

  removeMoment(id: number) {
    const url = `${this.momentsUrl}/${id}`;
    return this.http.delete(url);
  }

  updateMoment(id: number, formData: FormData): Observable<FormData> {
    const url = `${this.momentsUrl}/${id}`;
    return this.http.put<FormData>(url, formData);
  }
}
