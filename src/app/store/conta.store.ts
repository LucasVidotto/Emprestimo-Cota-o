// src/app/store/conta.store.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Conta {
  nome: string;
  email: string;
  saldo: string;
  conta:string;
}

@Injectable({
  providedIn: 'root',
})
export class ContaStore {
  private _conta = new BehaviorSubject<Conta>({
    nome: 'Lucas Vidotto',
    email: 'lucasvidotto@gmail.com',
    saldo: '7000,00',
    conta: '1234-5',
  });

  readonly conta$ = this._conta.asObservable();

  get conta() {
    return this._conta.value;
  }

  setConta(novaConta: Conta) {
    this._conta.next(novaConta);
  }

  atualizarSaldo(novoSaldo: string) {
    this._conta.next({ ...this._conta.value, saldo: novoSaldo });
  }
}
