import { Injectable, inject } from '@angular/core';
import { Observable, tap} from 'rxjs';
import { APP_CONSTANT } from '../utils/constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  positionEndpoint = 'position';

  private readonly _http = inject(HttpClient);

  getPositions(status = ''): Observable<any[]> {
    return this._http.get<any>(`${APP_CONSTANT.apiRootUrl}/${this.positionEndpoint}`);
  }

  createPosition(name: string, description: string): Observable<any[]> {
    return this._http.post<any>(
      `${APP_CONSTANT.apiRootUrl}/${this.positionEndpoint}`, {
        name,
        description
      })
  }

  updatePosition(name: string, description: string, identifier: string) {
    return this._http.put(`${APP_CONSTANT.apiRootUrl}/${this.positionEndpoint}?identifier=${identifier}`, {
      name,
      description
    })
  }

  deletePosition(identifier: string) {
    return this._http.delete(`${APP_CONSTANT.apiRootUrl}/${this.positionEndpoint}?identifier=${identifier}`)
  }

}
