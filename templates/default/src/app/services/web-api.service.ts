import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '@app/models/item';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class WebApiService extends BaseService {
  private _apiBaseUrl: string = '/catalog/v1';

  constructor(http: HttpClient) {
    super(http);
  }

  get apiBaseUrl() {
    return this._apiBaseUrl;
  }

  getAllItems(): Observable<Item[]> {
    return this.request('GET', '/items').pipe(
      switchMap((resp) => this.handleRespBody<Item[]>(resp, []))
    );
  }

  getItem(id: string): Observable<Item> {
    return this.request('GET', `/items/${id}`).pipe(
      switchMap((resp) => this.handleRespBody<Item>(resp))
    );
  }

  createItem(item: Item): Observable<Item> {
    return this.request('POST', '/items', item).pipe(
      switchMap((resp) => this.handleRespBody<Item>(resp))
    );
  }

  deleteItem(id:string): Observable<any>{
    return this.request('DELETE', `/items/${id}`).pipe(
      switchMap((resp) => this.handleRespBody<any>(resp))
    );
  }

  putItem(item:Item): Observable<Item>{
    return this.request('PUT', '/items',item).pipe(
      switchMap((resp) => this.handleRespBody<Item>(resp))
    );
  }
}
