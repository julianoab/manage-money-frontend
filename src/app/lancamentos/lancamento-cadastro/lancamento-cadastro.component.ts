import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lancamento } from 'src/app/core/model';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { Form, FormControl, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {
  
  lancamento = new Lancamento();
 
  constructor(private lancamentoService: LancamentoService,
              private categoriaService: CategoriaService, 
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private title: Title ) {}
 
  ngOnInit(): void {
    this.title.setTitle('Novo lançamento');
    this.carregarCategorias();
    const codigoLancamento = Number(this.activatedRoute.snapshot.paramMap.get('codigo'));
    if (codigoLancamento) {
      this.buscarPorCodigo(codigoLancamento);
    }
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }

  adicionar(form: NgForm): void {
    //form.reset();
    //this.lancamento = new Lancamento();
    this.router.navigate(['/lancamentos', this.lancamento.codigo]);  
  }

  atualizar(form: NgForm): void {
    this.lancamentoService.atualizar(this.lancamento).then(lancamento => {
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    })
    .catch((erro) => console.log('Erro ao atualizar lançamento: ', erro));
  }

  buscarPorCodigo(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo).then(lancamento => {
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    })
    .catch(error => console.log(error));
  };

  get editando() {
    return Boolean(this.lancamento.codigo);
  }
  
  categorias: any[] = [];

  carregarCategorias() {
    this.categoriaService.listar().then(categorias => {
      this.categorias = categorias.map((c: any) => ({ label: c.nome, value: c.codigo }));
    })
    .catch(erro => console.log('Erro ao retornar as categorias: ', erro));
  }

  novo(form: NgForm) {
    form.reset();

    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);

    this.router.navigate(['/lancamentos/novo'])
  }

  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ];

  pessoas = [
    { label: 'João da Silva', value: 4 },
    { label: 'Sebastião Souza', value: 9 },
    { label: 'Maria Abadia', value: 3 }
  ];

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
