import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar.component';
import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogadoStore } from '../store/contaLogado.store';

@Component({
  selector: 'app-login',
  imports: [RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  cpf: string = '';
  senha: string = '';
  flag: boolean = false;

  constructor(private router: Router, private LogadoStore:LogadoStore) {}

  login() {//ação de logar
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log
    const value = localStorage.getItem(key!);
    const cpf = localStorage.key(i);
    console.log('Valor do localStorage:', key); //chave
    console.log('outro valor :', value);//dados
    if (cpf) {
      if(cpf === this.cpf){
        const conta = JSON.parse(value!);
        if (conta.cpf === this.cpf && conta.senha === this.senha) {
          localStorage.setItem(`logado`,this.cpf);
          this.LogadoStore.setLogado(conta.cpf);
          this.router.navigate(['/dados-conta']);
          flag: true;
          return;
        }
      }
    }
  }
  alert('CPF ou senha incorretos');
/*   console.log('Login falhou' , this.cpf, this.senha); */

  }
}

