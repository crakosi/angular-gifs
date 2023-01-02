import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'wfsA4nh1A9q7yg3eIWczMFHDOYnMy6E1';
  private servicioURl: string = 'https://api.giphy.com/v1/gifs'
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial() {   
    return [...this._historial];
  }


  constructor( private http: HttpClient ){ 
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];
    // if ( localStorage.getItem('historial')){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // } 
  }

  buscarGifs(query: string) {

    if( !this._historial.includes( query)){
      this._historial.unshift(query.toUpperCase());
      this._historial = this._historial.splice(0,5);
      localStorage.setItem( 'historial' , JSON.stringify( this._historial ) );
      
      //this.buscarApi(query);
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit','10')
    .set('q',query);
    console.log(params.toString());
    

   
   this.http.get<SearchGifsResponse>(`${ this.servicioURl }/search`,{ params })
    .subscribe( (resp ) => {
      console.log( resp.data );
      this.resultados = resp.data;
      localStorage.setItem( 'resultados', JSON.stringify( this.resultados ) );
    })


  //   fetch('https://api.giphy.com/v1/gifs/search?api_key=wfsA4nh1A9q7yg3eIWczMFHDOYnMy6E1&q=dragon ball z&limit=10').then(resp => {
  //   resp.json().then(data => { console.log(data)})
  // })


  }

  async buscarApi(query: string) {
    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=wfsA4nh1A9q7yg3eIWczMFHDOYnMy6E1&q=dragon ball z&limit=10');
    const data = await resp.json();
    console.log(data);
    
  }

  

}
