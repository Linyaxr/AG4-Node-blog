import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServicesService } from '../../services/http-services.service';
@Component({
    selector: 'app-lin-sider',
    templateUrl: './lin-sider.component.html',
    styleUrls: ['./lin-sider.component.css']
})
export class LinSiderComponent implements OnInit {

    FolderArr: any = [];
    ExcellentArr: any = [];

    constructor(
        private http: HttpServicesService,
        private router: Router
    ) { }

    ngOnInit() {
        var self = this;
        //获取点赞最多的文章
        this.http.getMethod('/api/excellentArt').subscribe(res => {
            console.log(res);
            self.ExcellentArr = res;
        })

        //获取所有文集
        this.http.getMethod('/api/findFolder').subscribe(res => {
            console.log(res);
            self.FolderArr = res;
        })
    }

    linkArticle(arr) {
        console.log(arr);
        this.router.navigate(['/article', arr._id]);

    }

}
