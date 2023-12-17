import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})

export class LancamentosPesquisaComponent implements OnInit {
  
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos : [];
  @ViewChild('tabela') grid: any;

  constructor(private lancamentoService: LancamentoService, 
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private title: Title) {}
  
  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro).then(resultado => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
    });
  }
  // LazyLoadEvent
  aoMudarPagina(event: any) {
    console.log('valor event: ', event);
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }
        this.messageService.add( { severity: 'success', detail: 'Lançamento excluído com sucesso!' } );
    });
  }
 

}
