import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LinHeaderComponent } from './lin-header/lin-header.component';
import { LinFooterComponent } from './lin-footer/lin-footer.component';
import { LinSiderComponent } from './lin-sider/lin-sider.component';
import { LinContentComponent } from './lin-content/lin-content.component';
import { LinModalComponent } from './lin-modal/lin-modal.component';

import { HttpServicesService } from '../services/http-services.service';
import { NglModule } from 'ng-lightning/ng-lightning';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NglModule,
    ],
    declarations: [
        LinHeaderComponent,
        LinFooterComponent,
        LinSiderComponent,
        LinContentComponent,
        LinModalComponent,
    ],
    exports: [
        LinHeaderComponent,
        LinFooterComponent,
        LinSiderComponent,
        LinContentComponent,
        LinModalComponent,
    ],
    providers: [
        HttpServicesService
    ]
})
export class CompontModule { }
