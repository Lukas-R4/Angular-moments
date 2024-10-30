import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Comment } from '../Comment';
import { environment } from 'src/environments/environment';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) {}

  public createComment(comment: Comment): Observable<Response<Comment>> {
    const url = `${this.apiUrl}/${comment.id}/comments`;
    return this.http.post<Response<Comment>>(url, comment);
  }
}
