import { ContaStore } from './../store/conta.store';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../components/navbar.component";

@Component({
  selector: 'app-dados-conta',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dados-conta.component.html',
  styleUrl: './dados-conta.component.css'
})
export class DadosContaComponent {
  /* conta = Contas; */

  constructor(private contaStore: ContaStore){}

  ngOnInit() {
  const cpfLogado = localStorage.getItem('logado');
  if(cpfLogado){
    for(let i = 0; i < localStorage.length; i++){
      const key = localStorage.key(i);
      const value = localStorage.getItem(key!);
      if (key === cpfLogado) {
        const conta = JSON.parse(value!);
        console.log('Conta logada:', conta);
        this.contaStore.setConta(conta);
        // Ex: this.nome = conta.nome;
        break; // Para evitar continuar o loop após encontrar a conta
      }
    }
  }
  const dados = localStorage.getItem('contaUsuario');
  if (dados) {
    const conta = JSON.parse(dados);
    console.log('Conta recuperada:', conta);
    this.contaStore.setConta(conta);
    // Ex: this.nome = conta.nome;
  }
}

  get conta$(){
    return this.contaStore.conta$;
  }



}
