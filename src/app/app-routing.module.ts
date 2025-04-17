import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/providers/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register-perso',
    loadChildren: () => import('./register-perso/register-perso.module').then( m => m.RegisterPersoPageModule)
  },
  {
    path: 'my-address',
    loadChildren: () => import('./my-address/my-address.module').then( m => m.MyAddressPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'location/:id',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'location-new',
    loadChildren: () => import('./location-new/location-new.module').then( m => m.LocationNewPageModule)
  },
  {
    path: 'location-detail/:id',
    loadChildren: () => import('./location-detail/location-detail.module').then( m => m.LocationDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'locations-my',
    loadChildren: () => import('./locations-my/locations-my.module').then( m => m.LocationsMyPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'record/:id',
    loadChildren: () => import('./record/record.module').then( m => m.RecordPageModule)
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then( m => m.PostsPageModule)
  },
  {
    path: 'taylor/:id',
    loadChildren: () => import('./taylor/taylor.module').then( m => m.TaylorPageModule)
  },
  {
    path: 'sel/:id',
    loadChildren: () => import('./sel/sel.module').then( m => m.SelPageModule)
  },
  {
    path: 'observations/:id',
    loadChildren: () => import('./observations/observations.module').then( m => m.ObservationsPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
