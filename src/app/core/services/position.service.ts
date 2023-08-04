import { Injectable, inject } from '@angular/core';
import { Observable} from 'rxjs';
import { APP_CONSTANT } from '../utils/constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private readonly _http = inject(HttpClient);

  getPositions(status = ''): Observable<any[]> {
    return this._http.get<any>(`${APP_CONSTANT.apiRootUrl}/get-positions`);
  }
}
