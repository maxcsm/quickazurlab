import { Component } from '@angular/core';
import { LocalService } from 'src/providers/local.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    role: any;
    constructor
    (  
      private localStore: LocalService,
) {
       
    }




  async ionViewWillEnter() {
    this.role = this.localStore.getItem('role');
  }
 
}
