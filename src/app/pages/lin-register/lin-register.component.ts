import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { HttpServicesService } from '../../services/http-services.service';

@Component({
    selector: 'app-lin-register',
    templateUrl: './lin-register.component.html',
    styleUrls: ['./lin-register.component.css']
})
export class LinRegisterComponent implements OnInit {
    registName: any;
    registPass: any;
    constructor(
        private location: Location,
        private router: Router,
        private http: HttpServicesService
    ) { }

    //注册
    RegisterForm() {
        var self = this;


        if (this.registName == null || this.registPass == null) {
            this.http.showWarning("请输入账号&密码！");
        } else {
            var name = this.http.mdChinese(this.registName);
            var pass = this.http.mdPass(this.registPass);
            if (!name) {
                this.http.showWarning("账号只能输入中文");
            } else {
                this.http.postMethod('/api/regist', { name: self.registName, password: pass }).subscribe(res => {
                    if (res.status == 2) {
                        self.http.showSuccess('注册成功');
                        this.router.navigate(['/linya']);
                    } else if (res.status == 1) {
                        self.http.showWarning('您已经注册过了！');
                    } else {
                        self.http.showError('注册失败');
                    }
                })
            }


        }

    }
    returnBack() {
        this.location.back();
    }
    linkLogin() {
        this.router.navigate(['/login']);
    }
    ngOnInit() {
    }

}
