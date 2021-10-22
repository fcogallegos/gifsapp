
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'GXvcJfEFXeFGBm4Uvj8by9bMwDpDGb8F';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {

    if( localStorage.getItem('history')) {
      this._history = JSON.parse(localStorage.getItem('history')! )
    }

    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs( query: string ) {
    
    query = query.trim().toLowerCase();

    if( !this._history.includes(query) ) {
      this._history.unshift(query);
      this._history = this._history.splice(0,10);

      localStorage.setItem('history', JSON.stringify( this._history ));
    }

    const params = new HttpParams()
          .set('api_key',this.apiKey)
          .set('limit', '10')
          .set('q', query);

          console.log(params.toString());

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe( (resp) => {
        console.log(resp.data);
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify( this.results ));
      });
    
  }
}
