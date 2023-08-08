import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONSTANT } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private readonly _http = inject(HttpClient);

  getCandidates(position = ''): Observable<any[]> {
    const queryParams = position ? `&position=${position}` : '';
    return this._http.get<any>(`${APP_CONSTANT.apiRootUrl}/get-candidate${queryParams}`);
  }

  updateStatus(candidateData: any) {
    const { name, status } = candidateData;
    return this._http.post<any>(`${APP_CONSTANT.apiRootUrl}/update-status`, {
      name,
      status
    })
  }

  updateMessage(candidateData: any) {
    const { name, message, status } = candidateData;
    return this._http.post<any>(`${APP_CONSTANT.apiRootUrl}/update-status`, {
      name,
      message,
      status
    })
  }
}
