import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificar',
  imports: [CommonModule],
  templateUrl: './notificar.component.html',
  styleUrl: './notificar.component.css'
})
export class NotificarComponent {
  @Input() valor!: number;
  @Input() parcelas!: number;
  @Input() dataEmprestimo!: Date;

  /* ngOnInit() {//converter as data e validar para pegar a proxima data de pagamento
    var now = new Date;
    this.dataEmprestimo = new Date(this.dataEmprestimo);
    this.proxData = new Date(this.dataEmprestimo.getFullYear(), this.dataEmprestimo.getMonth(), this.dataEmprestimo.getDate());
    if(this.dataEmprestimo && this.parcelas) {

      this.ultima_data = this.dataEmprestimo.getMonth() + this.parcelas;
      this.dia_pagamento = this.dataEmprestimo.getDate();
      console.log('Ultima data: ', this.ultima_data);
      console.log('Dia de pagamento: ', this.dia_pagamento);
      console.log('Data do empréstimo: ', this.dataEmprestimo);
      if(now.getMonth() <= this.ultima_data) {
        this.proxData = new Date(this.dataEmprestimo.getFullYear(), now.getMonth(), this.dia_pagamento);
      }
    }
  } */

  @Output () fecharNotificacao = new EventEmitter<boolean>();


  fechar() {
    console.log('Fechar notificação');
    this.fecharNotificacao.emit(false);
  }
}
