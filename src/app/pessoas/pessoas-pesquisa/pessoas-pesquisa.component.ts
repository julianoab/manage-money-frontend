import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  pessoas = [
              {nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', ativo: true },
              {nome: 'Carlos Silva', cidade: 'Apucarana', estado: 'PR', ativo: false },
              {nome: 'Luís Pereira', cidade: 'Florianópolis', estado: 'SC', ativo: true }
            ];

}
