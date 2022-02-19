import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GifData, GifResponse } from '../interfaces/gifs_response.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _searchUrl = 'https://api.giphy.com/v1/gifs/search'

  private _historial: string[];
  private _apiKey: string = 'uZaQNQsTPWbzXdx0S3ZBiye4z5RSrJ8E';

  public resultados: GifData[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient ){
    this._historial = this._gtLocalHistory();
    this.resultados = this._getLocalResults();
  }

  buscarGifs(busqueda: string) {

    busqueda = busqueda.trim().toLowerCase();

    if (busqueda.length > 0 && !this._historial.includes( busqueda )){
      this._historial.unshift( busqueda );
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
    .set('api_key', this._apiKey)
    .set('limit', 10)
    .set('q', busqueda);

    this.http.get<GifResponse>(`${this._searchUrl}`, { params }).subscribe( resp => {
      console.log(resp);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
  }

  _gtLocalHistory(): string[] {
    let h: string[] = [];
    let hist = localStorage.getItem('historial');

    if (hist) h = JSON.parse(hist); 

    return h;
  }

  _getLocalResults(): GifData[] {
    let r: GifData[] = [];
    let lres = localStorage.getItem('resultados');

    if (lres) r = JSON.parse(lres);

    return r;
  }
}
