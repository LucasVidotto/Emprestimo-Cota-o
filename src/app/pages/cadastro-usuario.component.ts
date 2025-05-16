import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../components/navbar.component";
import { ContaMock } from '../Data/Dados'; // Caminho conforme seu projeto
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cadastro-usuario',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent {
  private http = inject(HttpClient)

  // Usando os dados do mock
  nome = ContaMock.nome;
  email = ContaMock.email;
  cpf = ContaMock.cpf;
  senha = ContaMock.senha;
  tipoConta = ContaMock.tipoConta;
  saldo = ContaMock.saldo;
  erro : string = '';
  private cadastrar() {
    const url = `http://localhost:8080/cadastro`;

    const payload = {
      nome: this.nome,
      email: this.email,
      cpf: this.cpf,
      senha: this.senha,
      tipoConta: this.tipoConta,
      saldo: this.saldo
    };

    this.http.post<any>(url, payload).subscribe({
      next: (response) => {
        console.log('Usuário cadastrado com sucesso', response);
      },
      error: (error) => {
        console.error('Erro ao cadastrar usuário', error);
      }
    });
  }

  abrirConta() {

    //validação simples
    if(!this.nome || !this.cpf || !this.email ||!this.senha){
      this.erro = 'Por favor, preencha todos os campos obrigatórios'
      return;
    }else if(!/^\d+$/.test(this.cpf)){
      this.erro = 'CPF deve conter apenas números'
      return;
    }else if(this.cpf.length != 11){
      this.erro = 'CPF deve contem 11 números'
      return;
    }

    this.erro = "";

    const conta = {
    nome: this.nome,
    email: this.email,
    cpf: this.cpf,
    senha: this.senha,
    tipoConta: this.tipoConta,
    saldo: this.saldo,

  };

  localStorage.setItem('contaUsuario', JSON.stringify(conta));
  console.log('Conta salva localmente:', conta);
}
}
