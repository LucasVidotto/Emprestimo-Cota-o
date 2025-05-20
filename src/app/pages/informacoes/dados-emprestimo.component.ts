import { EmprestimoStore } from './../../store/emprestimo.store';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar.component";
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { NotificarComponent } from "../../components/aviso/notificar.component";

@Component({
  selector: 'app-dados-emprestimo',
  imports: [CommonModule, NavbarComponent, HttpClientModule, NotificarComponent],
  templateUrl: './dados-emprestimo.component.html',
  styleUrl: './dados-emprestimo.component.css'
})
export class DadosEmprestimoComponent {
/* conta = Contas; */

  notificarFechado = true;
  constructor(
    private emprestimoStore: EmprestimoStore,
    private http: HttpClient // injeta o HttpClient
  ) {}

  emprestimos = {
      valor: 0,
      parcelas: 0,
      cpf: '1111',
      dataEmprestimo: new Date(),
      tipoMoeda: 'Real',
    }

  ngOnInit() { //puxa os dados do LocalStore e verifica se existe dados naquele cpf do emprestimo
  const cpfLogado = localStorage.getItem('logado');
  const cpfEmprestimo = localStorage.getItem(`emprestimoUsuário${cpfLogado}`);
  if (cpfLogado && cpfEmprestimo) {
    this.emprestimos = JSON.parse(cpfEmprestimo);
    console.log('aqui : ', this.emprestimos);
  }
  if ( this.emprestimos) {
    const emprestimo = this.emprestimos;
    console.log('Conta recuperada:', emprestimo);
    this.emprestimoStore.setEmprestimo(emprestimo);
  }
}

  get emprestimo$(){//recebe dados do emprestimo do Store
    return this.emprestimoStore.emprestimo$;
  }

  onNotificacaoFechada(valor:boolean) {//para fechar o aviso
    this.notificarFechado = valor;
  }

  buscarEmprestimosDaApi() {//api
    const url = 'http://localhost:8080/emprestimos';
    this.http.get(url).subscribe({
      next: (res) => {
        console.log('Dados de empréstimos da API:', res);
        // Aqui você poderia fazer algo com os dados
      },
      error: (err) => {
        console.error('Erro ao buscar empréstimos:', err);
      },
    });
  }

}
