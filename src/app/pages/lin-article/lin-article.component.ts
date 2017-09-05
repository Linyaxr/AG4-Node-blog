import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpServicesService } from '../../services/http-services.service';


@Component({
    selector: 'app-lin-article',
    templateUrl: './lin-article.component.html',
    styleUrls: ['./lin-article.component.scss']
})
export class LinArticleComponent implements OnInit {

    plState: any = false;
    cmState: any = true;
    //用户对象
    UserId: any;
    UserName: any;

    //文章对象
    ArticleId: any;
    ArticleTitle: any;
    ArticleAuthor: any;
    ArticleContent: any;
    ArticleDescribe: any;
    ArticleDz: any;
    ArticlePl: any;

    //留言对象
    CommentArr: any = [];
    CommentCount: any = 0;
    UserComment: any;


    constructor(
        private acRouter: ActivatedRoute,
        private router: Router,
        private http: HttpServicesService
    ) {
        var self = this;
        this.acRouter.params.subscribe(data => { self.ArticleId = data.id });
        //获取文章内容
        this.http.postMethod('/api/findArticle', { _id: self.ArticleId }).subscribe(res => {
            self.ArticleTitle = res.data[0].title;
            self.ArticleAuthor = res.data[0].author;
            self.ArticleContent = res.data[0].content;
            self.ArticleDz = res.data[0].dz;
            self.ArticlePl = res.data[0].pl;
            self.ArticleDescribe = res.data[0].describe;
            if (res.LINID == null) {
                self.plState = true;
                self.cmState = false;
            }

            self.UserId = res.LINID;
            self.UserName = res.LINNAME;


        })

        //获取所有留言
        this.http.postMethod('/api/findComment', { id: self.ArticleId }).subscribe(res => {
            console.log(res);
            if (res.length == 0) {
            } else {
                self.CommentCount = res.length;
                self.CommentArr = res;

            }
        })


    }

    ngOnInit() {

    }
    //点赞
    addDz() {
        var self = this;
        self.http.postMethod('/api/dzArticle', {
            id: self.ArticleId,
        }).subscribe(res => {
            console.log(res);
            if (res.status == 2) {
                self.http.showWarning("未登录不可点赞！");
                this.router.navigate(['/login']);
            } else {
                if (res.status == 1) {
                    self.http.showInfo("您已经点赞过了！");
                } else {
                    self.http.showSuccess("点赞成功！");
                    self.ArticleDz += 1;
                }
            }
        })
    }

    //添加留言
    addPl() {
        var self = this;
        self.http.postMethod('/api/createComment', {
            author: self.UserId,
            name: self.UserName,
            content: self.UserComment,
            postId: self.ArticleId,
            createTime: ''
        }).subscribe(res => {
            console.log(res);
            self.CommentCount += 1;
            self.CommentArr.push({
                author: res.ops[0].author,
                content: res.ops[0].content,
                name: res.ops[0].name,
                postId: res.ops[0].postId,
                createTime: res.ops[0].createTime,
                _id: res.ops[0]._id,
            });

        })
    }

}
