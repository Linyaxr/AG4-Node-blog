import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { HttpServicesService } from '../../services/http-services.service';
@Component({
    selector: 'app-lin-login',
    templateUrl: './lin-login.component.html',
    styleUrls: ['./lin-login.component.scss']
})
export class LinLoginComponent implements OnInit {
    loginName: any;
    loginPass: any;

    constructor(
        private router: Router,
        private location: Location,
        private http: HttpServicesService
    ) { }

    loginForm() {
        var self = this;
        if (this.loginName == null || this.loginPass == null) {
            this.http.showWarning("请输入账号&密码！");
        } else {
            var name = this.http.mdChinese(this.loginName);
            var pass = this.http.mdPass(this.loginPass);
            console.log(name);
            if (name) {
                this.http.postMethod('/api/login', { name: self.loginName, password: pass }).subscribe(res => {
                    console.log(res);
                    if (res.status == 3) {
                        self.http.showSuccess("欢迎你管理员！");
                        this.router.navigate(['/linya']);
                    }
                    else if (res.status == 2) {
                        self.http.showError("账号或密码出错！");
                    }
                    else {
                        self.http.showSuccess("登录成功");
                        this.router.navigate(['/linya']);
                    }
                })
            } else {
                this.http.showWarning("账号或密码出错");
            }
        }
        
        

    }
    returnBack() {
        this.location.back();
    }
    linkRegister() {
        this.router.navigate(['/register'])
    }
    ngOnInit() {
    }

}
