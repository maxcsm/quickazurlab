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
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule),

  },
  {
    path: 'techs',
    loadChildren: () => import('./techs/techs.module').then( m => m.TechsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account/:id',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'invoices',
    loadChildren: () => import('./invoices/invoices.module').then( m => m.InvoicesPageModule),

  },
  {
    path: 'quotes',
    loadChildren: () => import('./quotes/quotes.module').then( m => m.QuotesPageModule),

  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule),

  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'form1/:id',
    loadChildren: () => import('./form1/form1.module').then( m => m.Form1PageModule),
  },
  {
    path: 'invoice/:id',
    loadChildren: () => import('./invoice/invoice.module').then( m => m.InvoicePageModule),

  },
  {
    path: 'appointements',
    loadChildren: () => import('./appointements/appointements.module').then( m => m.AppointementsPageModule),

  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'form2/:id/:idclient',
    loadChildren: () => import('./form2/form2.module').then( m => m.Form2PageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },

  {
    path: 'quote/:id',
    loadChildren: () => import('./quote/quote.module').then( m => m.QuotePageModule)
  },
  {
    path: 'modal-signature',
    loadChildren: () => import('./modal-signature/modal-signature.module').then( m => m.ModalSignaturePageModule)
  },
  {
    path: 'form3/:id/:idclient',
    loadChildren: () => import('./form3/form3.module').then( m => m.Form3PageModule)
  },
  {
    path: 'emails',
    loadChildren: () => import('./emails/emails.module').then( m => m.EmailsPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule),

  },
  {
    path: 'product/:id',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule),
  },
  {
    path: 'return',
    loadChildren: () => import('./return/return.module').then( m => m.ReturnPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },
  {
    path: 'appointement/:id',
    loadChildren: () => import('./appointement/appointement.module').then( m => m.AppointementPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register-pro',
    loadChildren: () => import('./register-pro/register-pro.module').then( m => m.RegisterProPageModule)
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
    path: 'my-company',
    loadChildren: () => import('./my-company/my-company.module').then( m => m.MyCompanyPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-social',
    loadChildren: () => import('./my-social/my-social.module').then( m => m.MySocialPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-hours',
    loadChildren: () => import('./my-hours/my-hours.module').then( m => m.MyHoursPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'legal',
    loadChildren: () => import('./legal/legal.module').then( m => m.LegalPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'filter-location',
    loadChildren: () => import('./filter-location/filter-location.module').then( m => m.FilterLocationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'locations',
    loadChildren: () => import('./locations/locations.module').then( m => m.LocationsPageModule),
  },
  {
    path: 'location/:id',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user:/id',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'new-annonce',
    loadChildren: () => import('./new-annonce/new-annonce.module').then( m => m.NewAnnoncePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-files',
    loadChildren: () => import('./my-files/my-files.module').then( m => m.MyFilesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'file:/id',
    loadChildren: () => import('./file/file.module').then( m => m.FilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'message/:id',
    loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'messagenew/:id/:firstname/:lastname',
    loadChildren: () => import('./messagenew/messagenew.module').then( m => m.MessagenewPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'favoris',
    loadChildren: () => import('./favoris/favoris.module').then( m => m.FavorisPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'parrainez',
    loadChildren: () => import('./parrainez/parrainez.module').then( m => m.ParrainezPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'file-new',
    loadChildren: () => import('./file-new/file-new.module').then( m => m.FileNewPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'file-detail/:id',
    loadChildren: () => import('./file-detail/file-detail.module').then( m => m.FileDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'modal-note',
    loadChildren: () => import('./modal-note/modal-note.module').then( m => m.ModalNotePageModule)
  },
  {
    path: 'location-new',
    loadChildren: () => import('./location-new/location-new.module').then( m => m.LocationNewPageModule)
  },
  {
    path: 'filter-annonce',
    loadChildren: () => import('./filter-annonce/filter-annonce.module').then( m => m.FilterAnnoncePageModule)
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
    path: 'my-pictures',
    loadChildren: () => import('./my-pictures/my-pictures.module').then( m => m.MyPicturesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'picture-new',
    loadChildren: () => import('./picture-new/picture-new.module').then( m => m.PictureNewPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register-pro2',
    loadChildren: () => import('./register-pro2/register-pro2.module').then( m => m.RegisterPro2PageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
