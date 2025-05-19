import { EmprestimoStore } from './../../store/emprestimo.store';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar.component";
import { HttpClientModule,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dados-emprestimo',
  imports: [CommonModule, NavbarComponent,HttpClientModule],
  templateUrl: './dados-emprestimo.component.html',
  styleUrl: './dados-emprestimo.component.css'
})
export class DadosEmprestimoComponent {
/* conta = Contas; */

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

  ngOnInit() {
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

  get emprestimo$(){
    return this.emprestimoStore.emprestimo$;
  }

  buscarEmprestimosDaApi() {
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
