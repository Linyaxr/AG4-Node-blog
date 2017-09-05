import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
//ui库
import { NglModule } from 'ng-lightning/ng-lightning';
import { QuillModule } from 'ngx-quill';

//services
import { HttpServicesService } from '../services/http-services.service';

import { CompontModule } from '../component/compont.module';

import { LinIndexComponent } from './lin-index/lin-index.component';
import { LinNoFountComponent } from './lin-no-fount/lin-no-fount.component';
import { LinArticleComponent } from './lin-article/lin-article.component';
import { LinAboutComponent } from './lin-about/lin-about.component';
import { LinArticleListComponent } from './lin-article-list/lin-article-list.component';
import { LinLoginComponent } from './lin-login/lin-login.component';
import { LinRegisterComponent } from './lin-register/lin-register.component';
import { LinEditComponent } from './lin-edit/lin-edit.component';
import { LinChangeComponent } from './lin-change/lin-change.component';
import { LinCaehComponent } from './lin-caeh/lin-caeh.component';

@NgModule({
    imports: [
        CommonModule,
        CompontModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpModule,
        QuillModule,
        NglModule.forRoot({
            svgPath: '/my/path',
        })
    ],
    providers: [
        HttpServicesService
    ],
    declarations: [
        LinIndexComponent,
        LinNoFountComponent,
        LinArticleComponent,
        LinAboutComponent,
        LinArticleListComponent,
        LinLoginComponent,
        LinRegisterComponent,
        LinEditComponent,
        LinChangeComponent,
        LinCaehComponent,
    ]
})
export class PagesModule { }
