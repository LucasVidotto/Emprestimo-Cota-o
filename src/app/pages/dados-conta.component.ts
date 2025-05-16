import { ContaStore } from './../store/conta.store';
import { Component } from '@angular/core';
import { ContaMock } from '../Data/Dados'; // Caminho conforme seu projeto
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dados-conta',
  imports: [CommonModule],
  templateUrl: './dados-conta.component.html',
  styleUrl: './dados-conta.component.css'
})
export class DadosContaComponent {
  /* conta = Contas; */

  constructor(private contaStore: ContaStore){}

  ngOnInit() {
  const dados = localStorage.getItem('contaUsuario');
  if (dados) {
    const conta = JSON.parse(dados);
    console.log('Conta recuperada:', conta);
    // Ex: this.nome = conta.nome;
  }
}

  get conta$(){
    return this.contaStore.conta$;
  }



}
