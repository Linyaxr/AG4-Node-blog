import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LinArticleListComponent } from '../../pages/lin-article-list/lin-article-list.component';
import { HttpServicesService } from '../../services/http-services.service';

@Component({
    selector: 'app-lin-content',
    templateUrl: './lin-content.component.html',
    styleUrls: ['./lin-content.component.css']
})
export class LinContentComponent implements OnInit {

    ArticleArrs: any = [];

    constructor(
        private router: Router,
        private http: HttpServicesService
    ) {

    }
    ngOnInit() {
        var self = this;
        this.http.getMethod('/api/article').subscribe(res => {
            self.ArticleArrs = res;
        })
    }
    //跳转文章详情
    linkDetail(art) {
        this.router.navigate(['/article',art._id]);
    }

    

}
