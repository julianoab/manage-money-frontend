import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  categoriasUrl = '/api/categorias';

  listar(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    return this.http.get(`${this.categoriasUrl}`, { headers }).toPromise().then(categorias => {
      return categorias;
    })
  }


}
