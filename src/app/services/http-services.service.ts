import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Http } from '@angular/http';
import { Md5 } from "ts-md5/dist/md5";
import { Location } from '@angular/common';
import 'rxjs/add/operator/map'

@Injectable()
export class HttpServicesService {

    constructor(
        private http: Http,
        private location: Location,
        private toastr: ToastrService
    ) { }
    //成功提示
    showSuccess(text) {
        this.toastr.success('', text);
    }
    //失败提示
    showError(text) {
        this.toastr.error('', text);
    }
    //成功提示
    showWarning(text) {
        this.toastr.warning('', text);
    }
    //成功提示
    showInfo(text) {
        this.toastr.info('', text);
    }
    //重新加载
    reloadPage() {
        window.location.reload();
    }
    //md5加密
    mdPass(pass) {return Md5.hashStr(pass);}
    //匹配中文
    mdChinese(name) {
        var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
        return reg.test(name);
    }

    getMethod(url) {
        return this.http.get(url).map(function (res) {
            var data = JSON.parse(res['_body']);
            return data;
        })
    }
    postMethod(url, data) {
        return this.http.post(url, data).map(function (res) {
            var data = JSON.parse(res['_body']);
            return data;
        });
    }
  
}
