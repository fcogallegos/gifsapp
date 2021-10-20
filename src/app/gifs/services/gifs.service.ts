
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'GXvcJfEFXeFGBm4Uvj8by9bMwDpDGb8F';
  private _history: string[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {}

  searchGifs( query: string ) {
    
    query = query.trim().toLowerCase();

    if( !this._history.includes(query) ) {
      this._history.unshift(query);
      this._history = this._history.splice(0,10);
    }

    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=GXvcJfEFXeFGBm4Uvj8by9bMwDpDGb8F&q=cars')
      .subscribe( (resp: any) => {
        console.log(resp.data);
      });
    
  }
}
