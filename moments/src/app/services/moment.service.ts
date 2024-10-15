import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../Moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private readonly baseUrl = environment.baseApiUrl;
  private readonly momentsUrl = `${this.baseUrl}api/moments`;

  constructor(private http: HttpClient) { }

  createMoment(formData: FormData): Observable<FormData> {
    console.log(this.momentsUrl)
    return this.http.post<FormData>(this.momentsUrl, formData);
  }
}
