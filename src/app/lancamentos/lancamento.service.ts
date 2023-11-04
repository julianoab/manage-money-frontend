import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface LancamentoFiltro {
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(private http: HttpClient) { }

  lancamentosUrl = '/api/lancamentos';

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');
   
    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    } 

    console.log('params', params.get('descricao'));

    return this.http.get(`${this.lancamentosUrl}`, { headers, params }).toPromise()
      .then((response: any) => response['content']);
  }

}
