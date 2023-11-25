import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {expectedRole: 'ADMIN'},
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
    path: 'guess',
    loadChildren: () => import('./pages/guest/guest.module').then(m => m.GuestModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: '**',
    redirectTo: 'account'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
