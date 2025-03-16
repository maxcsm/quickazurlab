import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/providers/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule),
      },
      {
        path: 'chat',
        loadChildren: () => import('../messages/messages.module').then(m => m.MessagesPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profil',
        loadChildren: () => import('../profil/profil.module').then(m => m.ProfilPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'favoris',
        loadChildren: () => import('../favoris/favoris.module').then(m => m.FavorisPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'locations',
        loadChildren: () => import('../locations/locations.module').then(m => m.LocationsPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersPageModule)
      },
      {
        path: 'location-new',
        loadChildren: () => import('../location-new/location-new.module').then(m => m.LocationNewPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'locations-my',
        loadChildren: () => import('../locations-my/locations-my.module').then(m => m.LocationsMyPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'map',
        loadChildren: () => import('../map/map.module').then(m => m.MapPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
