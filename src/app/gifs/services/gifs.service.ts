
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'GXvcJfEFXeFGBm4Uvj8by9bMwDpDGb8F';
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

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=GXvcJfEFXeFGBm4Uvj8by9bMwDpDGb8F&q=${query}`)
      .subscribe( (resp) => {
        console.log(resp.data);
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify( this.results ));
      });
    
  }
}
