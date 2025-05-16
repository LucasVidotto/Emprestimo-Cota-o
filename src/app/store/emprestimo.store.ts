// src/app/store/conta.store.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Emprestimo {
  nome: string;
  email: string;
  saldo: string;
  conta:string;
  dividaTotal: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmprestimoStore {
  private _emprestimo= new BehaviorSubject<Emprestimo>({
    nome: 'Lucas Vidotto',
    email: 'lucasvidotto@gmail.com',
    saldo: '1000,00',
    conta: '1234-5',
    dividaTotal: 0,
  });

  readonly emprestimo$ = this._emprestimo.asObservable();

  get emprestimo() {
    return this._emprestimo.value;
  }

  setEmprestimo(novoEmprestimo: Emprestimo) {
    this._emprestimo.next(novoEmprestimo);
  }

  atualizarDivida(totalDivida: number) {
    this._emprestimo.next({ ...this._emprestimo.value, dividaTotal: totalDivida });
  }
}
