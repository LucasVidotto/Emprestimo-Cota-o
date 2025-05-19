import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cadastro-usuario',
    pathMatch: 'full',
  },
  {
    path: 'cadastro-usuario',
    loadComponent: () =>
      import('./pages/cadastro-usuario.component').then(m => m.CadastroUsuarioComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'cotacoes',
    loadComponent: () =>
      import('./pages/cotacoes.component').then(m => m.CotacoesComponent),
  },
  {
    path: 'emprestimo',
    loadComponent: () =>
      import('./pages/emprestimo.component').then(m => m.EmprestimoComponent),
  },
  {
    path:'dados-conta',
    loadComponent: () =>
      import('./pages/dados-conta.component').then(m=> m.DadosContaComponent)
  },
  {
    path:'dados-emprestimo',
    loadComponent: () =>
      import('./pages/informacoes/dados-emprestimo.component').then(m=> m.DadosEmprestimoComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound.component').then(m => m.NotfoundComponent)
  },

];
