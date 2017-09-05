import { Component, OnInit } from '@angular/core';
import { HttpServicesService } from '../../services/http-services.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-lin-edit',
    templateUrl: './lin-edit.component.html',
    styleUrls: ['./lin-edit.component.scss']
})
export class LinEditComponent implements OnInit {


    //状态集
    createState: any = false;
    filShow: any = false;
    filHide: any = false;
    zsState: any = false;

    createStates: any = false;
    editContStates: any = false;

    fileSte: any = false;
    fileEts: any = true;
    contState: any = true;
    editStates: any = false;

    //文集名
    folderName: any;

    //文集列表
    folderArr: any = [];
    //当前选中ID
    selectId: any;

    //选中赋值状态
    ste: any = 0;

    //添加文章
    articleArrs: any = [];

    //编辑文章字段
    ArticleId: any;
    ArticleTitle: any;
    ArticleDesctibe: any;
    editContents: any;
    createTime: any;
    ArticleNum: any;

    constructor(
        private http: HttpServicesService,
        private router: Router
    ) { }

    ngOnInit() {
        var self = this;

        //获取所有文集
        this.http.getMethod('/api/findFolder').subscribe(res => {
            if (res.length == 0) {
                self.filShow = true;
                self.filHide = false;
                self.createStates = false;
            } else {
                self.filShow = false;
                self.filHide = true;
                self.createStates = true;
                for (var i = 0; i < res.length; i++) {
                    self.folderArr.push({
                        name: res[i].name,
                        _id: res[i]._id
                    });
                }
            }
        })

        //默认获取排序第一的文集内部文件
        this.http.getMethod('/api/getFileOne').subscribe(res => {
            if (res.status == 2) {
                console.log("还没有创建文集");
            } else {
                self.selectId = res._id;
                if (res.folders.length == 0) {
                    console.log("文集里没有文件");
                    self.fileSte = true;
                    self.fileEts = false;
                } else {
                    for (var i = 0; i < res.folders.length; i++) {
                        self.http.postMethod('/api/getArticle', { _id: res.folders[i][0] }).subscribe(res => {
                            console.log(res[0]);
                            self.articleArrs.push(res[0]);
                        })
                    }
                }
            }
        })
    }



    //显示创建文集
    addFolder() { this.createState = !this.createState; }
    //隐藏创建文集
    cancelFolder() { this.createState = false; }
    //返回首页
    backIndex() { this.router.navigate(['/linya']) };

    //创建文集
    createFolder() {
        var self = this;
        this.http.postMethod('/api/addFolder', { name: self.folderName, folders: [] }).subscribe(res => {
            if (res.status == 1) {
                self.filShow = false;
                self.createStates = true;
                self.filHide = true;
                self.selectId = res.data.ops[0]._id;
                self.folderArr.push({
                    name: res.data.ops[0].name,
                    _id: res.data.ops[0]._id
                })
            } else {
                console.log("创建失败");
            }
        })
    }
    //选择文集
    selectFolder(fol, id) {
        this.articleArrs.splice(0);
        var self = this;
        this.ste = id;
        this.selectId = fol._id;
        this.http.postMethod('/api/getFile', { _id: fol._id }).subscribe(res => {
            if (res.status == 1) {
                if (res.data[0].folders.length == 0) {
                    console.log("文集里面没有文章");
                    self.fileSte = true;
                    self.fileEts = false;
                    self.editContStates = false;
                } else {
                    self.fileSte = false;
                    self.fileEts = true;
                    for (var i = 0; i < res.data[0].folders.length; i++) {
                        self.http.postMethod('/api/getArticle', { _id: res.data[0].folders[i][0] }).subscribe(res => {
                            self.articleArrs.push(res[0]);
                        })
                    }
                }
            }
        })
    }
    //创建文章
    createArticle() {
        var self = this;
        this.contState = false;
        this.editStates = true;

        this.http.postMethod('/api/addArticle', {
            author: '林涯',
            title: '无标题文章',
            describe: '',
            content: ''
        }).subscribe(res => {
            this.http.postMethod('/api/uploadFolder', {
                _id: self.selectId,
                folders: res.ops[0]._id
            }).subscribe(result => {
                if (result.status == 1) {
                    self.fileSte = false;
                    self.fileEts = true;
                    self.articleArrs.push({
                        _id: res.ops[0]._id,
                        title: res.ops[0].title,
                        content: res.ops[0].content,
                        author: res.ops[0].author,
                        describe: res.ops[0].describe
                    })
                } else {
                    console.log("创建文章失败");
                }
            })

        })
    }


    //保存文章
    saveArticle() {
        var self = this;
        console.log(self.ArticleTitle.length);
        if (self.ArticleTitle.length == 0 || self.ArticleDesctibe.length == 0 || self.editContents.length == 0) {
            this.http.showWarning("请输入标题&描述&内容");
        } else {
            self.http.showSuccess("保存成功");
            self.http.postMethod('/api/updatePost', {
                _id: self.ArticleId,
                data: {
                    title: self.ArticleTitle,
                    content: self.editContents,
                    describe: self.ArticleDesctibe,
                    zs: self.ArticleNum

                }
            }).subscribe(res => {
                console.log(res);
            })
        }


    }
    //发布文章
    releaseArticle() {
        var self = this;
        console.log(this.ArticleTitle);
        if (this.ArticleTitle == null) {
            this.http.showWarning("请输入标题");
        } else if (this.ArticleDesctibe == null) {
            this.http.showWarning("请输入描述信息");
        } else if (this.editContents == null) {
            this.http.showWarning("文章内容不能为空");
        } else {
            self.http.postMethod('/api/updatePost', {
                _id: self.ArticleId,
                data: {
                    title: self.ArticleTitle,
                    content: self.editContents,
                    describe: self.ArticleDesctibe,
                    zs: self.ArticleNum,
                }
            }).subscribe(res => {
                console.log(res);
            });

            self.http.postMethod('/api/findArticle', {
                reloadId: self.ArticleId
            }).subscribe(res => {
                console.log(res);
                if (res.status == 1) {

                    self.http.postMethod('/api/releArticle', {
                        author: '林涯',
                        title: self.ArticleTitle,
                        content: self.editContents,
                        describe: self.ArticleDesctibe,
                        reloadId: self.ArticleId,
                        zs: self.ArticleNum,
                        dz: 0,
                        pl: 0
                    }).subscribe(res => {
                        console.log(res);
                        self.http.showSuccess("发布成功");
                        self.router.navigate(['/article', res.data[0]._id]);
                    })
                } else {
                    self.http.postMethod('/api/updateArticle', {
                        id: self.ArticleId,
                        data: {
                            title: self.ArticleTitle,
                            content: self.editContents,
                            describe: self.ArticleDesctibe,
                            zs: self.ArticleNum,  
                        }
                    }).subscribe(res => {
                        console.log(res);
                        self.http.showSuccess("发布成功");
                        self.router.navigate(['/article', res.data[0]._id]);
                    })
                }
            })
        }



    }

    writeArt(art) {
        console.log(art);
        this.editContStates = true;
        this.zsState = true;
        this.ArticleId = art._id;
        this.ArticleTitle = art.title;
        this.ArticleDesctibe = art.describe;
        this.editContents = art.content;
        this.createTime = art.created_at;

    }
    //编辑器实例
    setFocus(ev) {
        console.log(ev);
        ev.focus()
    }

    //内容实例
    textNow(ev) {
        console.log(ev);
        console.log(this.articleArrs);
        this.ArticleNum = ev.text.length - 1;
    }

    //选中实例
    selecText(ev) {
        console.log(ev);
    }
}
