import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../components/navbar.component";
import { ContaStore } from '../store/conta.store';
import { LogadoStore } from '../store/contaLogado.store';
@Component({
  standalone: true,
  selector: 'app-emprestimo',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl:'./emprestimo.component.html',
  styleUrl: './emprestimo.component.css'
})
export class EmprestimoComponent {

constructor(private contaStore: ContaStore, private logadoStore:LogadoStore){}
cpf: string= '';
cpfLogado : string = '';
ngOnInit(){//puxa dados do usuario/emprestimo e logado e verifica se existe dados no localStorage
    const dados = localStorage.getItem('contaUsuario');

    if(localStorage.getItem('logado')){
      this.cpfLogado = localStorage.getItem('logado')!;
      console.log('cpf logado',this.cpfLogado)
    }else{
      return;
    }
    console.log('aqui')
    if(dados){
      const conta = JSON.parse(dados);
      console.log('dados conta',conta)
      this.cpf = conta.cpf;
    }
}
  valor = 0;
  moeda = 'BRL';
  parcelas = 1;
  resultado: { total: number; parcela: number } | null = null;
  erro: string = '';

private formatarData(data: Date): string {//formata a data para o padrão DD/MM/AAAA
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`; // ou `${ano}-${mes}-${dia}` se preferir padrão ISO
}

  simular() {//apenas simunlação de emprestimo
    const taxa = this.moeda === 'USD' ? 1.05 : this.moeda === 'EUR' ? 1.08 : this.moeda === 'AUD' ? 1.03 : 1.02;
    const total = this.valor * taxa;
    this.resultado = {
      total: Number(total.toFixed(2)),
      parcela: Number((total / this.parcelas).toFixed(2)),
    };
  }

   pegarEmprestimo() {//cria a função de pegar emprestimo com algumas validações
    //validação simples
    if(!this.moeda || !this.parcelas || !this.valor ){
      this.erro = 'Por favor, preencha todos os campos obrigatórios'
      return;
    }else if(this.valor <= 0){
      this.erro = 'Informe um valor'
      console.log('valor : ',this.valor)
      return;
    }else if(localStorage.getItem(`emprestimoUsuário${this.cpf}`)){
      this.erro = 'Você já possui um empréstimo ativo'
      return;
    }

    this.erro = "";

    const emprestimo = {
    valor: this.valor,
    parcelas: this.parcelas,
    cpf:this.cpfLogado,
    dataEmprestimo: this.formatarData(new Date()),
    tipoMoeda: this.moeda,

   };

    localStorage.setItem(`emprestimoUsuário${emprestimo.cpf}`, JSON.stringify(emprestimo));
    console.log(this.cpfLogado)
    /* this.contaStore.setConta(conta); */
    console.log('Conta salva localmente:', emprestimo);
  }
}
