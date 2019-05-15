import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrabResource } from '../models/GrabResource';
import { ConsumedResource } from '../models/ConsumedResource';

@Injectable({
  providedIn: 'root'
})
export class ResoCompServiceService {
  apiUrl: string = 'https://rsurcmgmgtwapi2.azurewebsites.net/api';
  //apiUrlLocal : string = 'http://localhost:9349/api';
  constructor(private _httpClient: HttpClient) { }

  GetDataToTakeResources(): Observable<GrabResource> {
    return this._httpClient.get<GrabResource>(`${this.apiUrl}/ConsRes/AvlbRes`);
  }

  SaveConsumedResources(consumedResources: ConsumedResource[]): Observable<void> {
    return this._httpClient.post<void>(`${this.apiUrl}/ConsumedResource`, consumedResources, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  GetConsumedResources(resourceId: string, consumerId: string, withNoDropOfDate: Boolean): Observable<ConsumedResource[]> {
    return this._httpClient.get<ConsumedResource[]>(`${this.apiUrl}/ConsumedResource?resourceId=${resourceId}&consumerId=${consumerId}&withNoDropOfDate=${withNoDropOfDate}`);
  }
}
