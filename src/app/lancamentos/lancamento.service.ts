import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  lancamentosUrl = '/api/lancamentos';

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    let params = new HttpParams();
    
    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    } 
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!)
    }
    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!)
    }

    return this.http.get(`${this.lancamentosUrl}`, { headers, params }).toPromise()
      .then((response: any) => {
        const responseJson = response;
        const lancamentos = responseJson.content;

        const resultado = {
          lancamentos,
          total: responseJson.totalElements
        };

        return resultado;
        
      });
  }

  excluir(codigo: Number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  atualizar(lancamento: Lancamento): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=')
                                     .append('Content-Type', 'application/json');

    return this.http.put(this.lancamentosUrl, JSON.stringify(lancamento), { headers }).toPromise();
  }

  buscarPorCodigo(codigo: Number): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    
    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers }).toPromise().then((response: any) => {
      this.converterStringsParaDatas([response]);
      return response;
    }) 
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      let offSet = new Date().getTimezoneOffset() * 60000;
      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento).getTime() + offSet);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offSet);
      }
    }

  }

}
