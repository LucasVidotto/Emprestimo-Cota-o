// src/app/store/conta.store.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Logado {
  cpf: string,
}

@Injectable({
  providedIn: 'root',
})
export class LogadoStore {
  private _logado = new BehaviorSubject<Logado>({
   cpf: '',
  });

  readonly logado$ = this._logado.asObservable();

  get logado() {
    return this._logado.value;
  }

  setLogado(novaConta: Logado) {
    this._logado.next(novaConta);
  }

  atualizarCpf(cpf: string) {
    this._logado.next({ ...this._logado.value, cpf: cpf });
  }
}
