import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LinArticleComponent } from './pages/lin-article/lin-article.component';
import { LinIndexComponent } from './pages/lin-index/lin-index.component';
import { LinAboutComponent } from './pages/lin-about/lin-about.component';
import { LinArticleListComponent } from './pages/lin-article-list/lin-article-list.component';
import { LinLoginComponent } from './pages/lin-login/lin-login.component';
import { LinRegisterComponent } from './pages/lin-register/lin-register.component';
import { LinEditComponent } from './pages/lin-edit/lin-edit.component';
import { LinChangeComponent } from './pages/lin-change/lin-change.component';
import { LinCaehComponent } from './pages/lin-caeh/lin-caeh.component';

import { LinNoFountComponent } from './pages/lin-no-fount/lin-no-fount.component';

/**
 * app路由
 */
const appRoutes: Routes = [

    //首页 
    { path: 'linya', component: LinIndexComponent },

    //编辑
    { path: 'edit', component: LinEditComponent },

    //草稿箱
    { path: 'caeh', component: LinCaehComponent },

    //修改
    { path: 'edit/:id', component: LinChangeComponent },

    //文章
    { path: 'article/:id', component: LinArticleComponent },

    //关于
    { path: 'about', component: LinAboutComponent },

    //文章列表
    { path: 'article', component: LinArticleListComponent },

    //登录
    { path: 'login', component: LinLoginComponent },

    //注册
    { path: 'register', component: LinRegisterComponent },

    { path: '', redirectTo: '/linya', pathMatch: 'full' },

    { path: '**', component: LinNoFountComponent }

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }


