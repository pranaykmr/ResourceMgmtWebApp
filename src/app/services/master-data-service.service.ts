import { Injectable } from '@angular/core';
import { Resource } from '../models/Resource';
import { Consumer } from '../models/consumer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class MasterDataServiceService {

  apiUrl: string = 'https://rsurcmgmgtwapi2.azurewebsites.net/api';
  //apiUrl : string = 'http://localhost:9349/api';
  constructor(private _httpClient: HttpClient, private _securityService: SecurityService) { }

  GetResources(): Observable<Resource[]> {
    return this._httpClient.get<Resource[]>(`${this.apiUrl}/resource?token=` + this._securityService.GetUserToken(), {
      headers: new HttpHeaders({
        'Authorization': 'its a token sdsd'
      })
    });
  }

  InsertResource(res: Resource): Observable<void> {
    return this._httpClient.post<void>(`${this.apiUrl}/resource`, res, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'its a token'
      })
    });
  }

  UpdateResource(res: Resource): Observable<void> {
    return this._httpClient.put<void>(`${this.apiUrl}/resource`, res, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  DeleteResource(id: string): Observable<void> {
    return this._httpClient.delete<void>(`${this.apiUrl}/resource?resourceId=${id}`);
  }



  GetConsumers(): Observable<Consumer[]> {
    return this._httpClient.get<Consumer[]>(`${this.apiUrl}/consumer?token=` + this._securityService.GetUserToken(), {
      headers: new HttpHeaders({
        'Authorization': 'AuthTOKEN'
      })
    });
  }

  InsertConsumer(cons: Consumer): Observable<void> {
    return this._httpClient.post<void>(`${this.apiUrl}/consumer`, cons, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  UpdateConsumer(cons: Consumer): Observable<void> {
    return this._httpClient.put<void>(`${this.apiUrl}/consumer`, cons, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  DeleteConsumer(id: string): Observable<void> {
    return this._httpClient.delete<void>(`${this.apiUrl}/consumer?consumerId=${id}`);
  }

}
