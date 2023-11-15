import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  
  pessoas: [];
  
  constructor(private pessoaService: PessoaService) {}  
  
  ngOnInit(): void {
    this.pessoaService.listar().then(resultado => {
      this.pessoas = resultado;
    })
  }
  
}
