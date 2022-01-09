import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'curateur',
    loadChildren: () => import('./curateur/curateur.module').then(m => m.CurateurModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'kanban',
    loadChildren: () =>
      import('./kanban/kanban.module').then(m => m.KanbanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then(m => m.CustomersModule),
  },
  {
    path: 'communication',
    loadChildren: () =>
      import('./communication/communication.module').then(m => m.CommunicationModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'cartagene',
    loadChildren: () =>
      import('./cartagene/cartagene.module').then(m => m.CartageneModule)
  },
  {
    path: 'catalogue',
    loadChildren: () =>
      import('./catalogue/catalogue.module').then(m => m.CatalogueModule)
  },
  {
    path: 'form',
    loadChildren: () =>
      import('./forms_example/forms_example.module').then(m => m.FormsExampleModule)
  }


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
