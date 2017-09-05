import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServicesService } from '../../services/http-services.service';
@Component({
    selector: 'app-lin-header',
    templateUrl: './lin-header.component.html',
    styleUrls: ['./lin-header.component.scss']
})
export class LinHeaderComponent implements OnInit {
    hideState: any = true;
    showState: any = false;
    panelState: any = false;
    userName: any;

    constructor(
        private router: Router,
        private http: HttpServicesService
    ) { }

    linkIndex() {
        this.router.navigate(['/linya']);
    }
    linkArticle() {
        this.router.navigate(['/article'])
    }
    linkAbout() {
        this.router.navigate(['/about']);
    }

    linkLogin() {
        this.router.navigate(['/login']);
    }

    linkRegister() {
        this.router.navigate(['/register']);
    }



    showPanel() {
        if (this.panelState == false) {
            this.panelState = true;
        } else {
            this.panelState = false;
        }
    }
    loginOut() {
        this.http.getMethod('/api/logOut').subscribe(res => {
            if (res.status == 1) { this.http.showSuccess("登出成功，跳转中！"); this.http.reloadPage(); }
        })
    }
    ngOnInit() {
        var self = this;
        this.http.getMethod('/api/index').subscribe(res => {
            console.log(res);
            if (res.name) {
                console.log("成功");
                self.showState = true;
                self.hideState = false;
                self.userName = res.name;
            } else {
                self.hideState = true;
                self.showState = false;
            }
        })
    }

}
