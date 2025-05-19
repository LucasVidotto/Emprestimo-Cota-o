// src/app/store/conta.store.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Emprestimo {
  cpf: string;
  valor: number;
  parcelas: number;
  dataEmprestimo: Date;
  tipoMoeda: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmprestimoStore {
  private _emprestimo= new BehaviorSubject<Emprestimo>({
    cpf: '00000000',
    valor: 0,
    parcelas:4,
    dataEmprestimo: new Date,
    tipoMoeda: 'EUA',
  });

  readonly emprestimo$ = this._emprestimo.asObservable();

  get emprestimo() {
    return this._emprestimo.value;
  }

  setEmprestimo(novoEmprestimo: Emprestimo) {
    this._emprestimo.next(novoEmprestimo);
  }

  atualizarDivida(valor: number) {
    this._emprestimo.next({ ...this._emprestimo.value, valor: valor });
  }
}
