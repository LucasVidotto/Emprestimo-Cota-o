import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-emprestimo',
  imports: [CommonModule, FormsModule],
  templateUrl:'./emprestimo.component.html',
  styleUrl: './emprestimo.component.css'
})
export class EmprestimoComponent {
  valor = 0;
  moeda = 'BRL';
  parcelas = 1;
  resultado: { total: number; parcela: number } | null = null;

  simular() {
    const taxa = this.moeda === 'USD' ? 1.05 : this.moeda === 'EUR' ? 1.08 : this.moeda === 'AUD' ? 1.03 : 1.02;
    const total = this.valor * taxa;
    this.resultado = {
      total: Number(total.toFixed(2)),
      parcela: Number((total / this.parcelas).toFixed(2)),
    };
  }
}
