// 猜拳场景管理器
import loadAllResource from './LoadResource'
import MorraGame from './MorraGame'

class SceneManager {
    constructor(canvas, ctx, socket) {
        this.canvas = canvas,
            this.ctx = ctx;
        this.loadedRes = null;
        this.socket = socket;
        this.init()
        this.bindEvent();
    }

    // 初始化
    init(){
        this.sceneNumber = 1;
        this.myChoose = "";
        this.temp = "";
        this.othChoose = "";
        this.text = "";
    }

    update(req) {
        switch (this.sceneNumber) {
            case 2:
                if(req==="my"){
                    this.myChoose = this.temp;
                }
                if(req==="oth"){
                    this.othChoose = "back"
                }
                break;
            case 3:
               this.init();
                break;
            default:
                break;
        }
        this.render();
    }

    render() {
        switch (this.sceneNumber) {
            case 1:
                // this.morraGame.renderSelects();
                this.morraGame = new MorraGame(this.canvas, this.ctx, this.loadedRes);
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                // 渲染背景
                this.morraGame.renderBgImg();
                break;
            case 2:
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.morraGame.renderBgImg();
                // 在左边渲染三张图片
                this.morraGame.renderSelects();
                // 渲染选择的展示
                this.morraGame.renderChoose(this.myChoose, this.othChoose);
                break;
            case 3:
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.morraGame.renderBgImg();
                this.morraGame.renderSelects();
                this.morraGame.renderChoose(this.myChoose, this.othChoose);
                this.morraGame.renderText(this.text); // 结果
                this.morraGame.renderRestart(); // 重新开始按钮
                break;
            default:
                break;
        }
    }

    enter(req) {
        switch (this.sceneNumber) {
            case 1:
                loadAllResource(this.canvas, this.ctx, this);
                break;
            case 2:
                this.morraGame.setSelects(); // 设置三个选项
                break;
            case 3:
                this.myChoose = this.temp;
                this.othChoose = req.name;
                this.text = req.res;
                break;
            default:
                break;
        }
        this.render();
    }

    bindEvent() {
        this.canvas.onclick = event => {
            const mousex = event.layerX;
            const mousey = event.layerY;
            switch (this.sceneNumber) {
                case 2:
                    this.morraGame.selects.map(item => {
                        window.console.log(item)
                        if (mousex >= 50 && mousex <= 50 + item.w
                            && mousey >= item.y && mousey <= item.y + item.h
                            &&this.myChoose === "") {
                                item.onClick(this.socket);
                                this.temp = item.name;
                        }
                    });
                    break;
                case 3:
                    if(mousex>=this.canvas.width/2-this.morraGame.imgW/2&&mousex<=this.canvas.width/2+this.morraGame.imgW/2
                        && mousey>=this.canvas.height/2-this.morraGame.imgH/2&&mousey<=this.canvas.height/2+this.morraGame.imgH/2){
                            this.update();
                        }
                    break;
                default:
                    break;
            }
        }
    }

}

export default SceneManager;