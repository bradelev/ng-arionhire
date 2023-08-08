import { Injectable, inject } from '@angular/core';
import { Observable, of} from 'rxjs';
import { APP_CONSTANT } from '../utils/constant';
import { HttpClient } from '@angular/common/http';
import { CANDIDATES } from 'src/assets/mock-candidates';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private readonly _http = inject(HttpClient);

  getPositions(status = ''): Observable<any[]> {
    return this._http.get<any>(`${APP_CONSTANT.apiRootUrl}/get-positions`);
  }

}
