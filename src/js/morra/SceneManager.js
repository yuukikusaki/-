// 猜拳场景管理器
import loadAllResource from './LoadResource'
import MorraGame from './MorraGame'

class SceneManager {
    constructor(canvas, ctx, socket) {
        this.canvas = canvas,
            this.ctx = ctx;
        this.sceneNumber = 1;
        this.loadedRes = null;
        this.socket = socket;
        this.bindEvent();
    }

    update() { 
        switch (this.sceneNumber) {
            case 2:
                // 我的选择
                // 改变对手的图片
                break;
        
            default:
                break;
        }
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
                // 在右边渲染别人的选择
                break;
            default:
                break;
        }
    }

    enter() {
        switch (this.sceneNumber) {
            case 1:
                loadAllResource(this.canvas, this.ctx, this);
                break;
            case 2:
                this.morraGame.setSelects(); // 设置三个选项
                this.render();
                break;
            default:
                break;
        }
    }

    bindEvent() { 
        this.canvas.onclick = event =>{
            const mousex = event.layerX;
            // const mousey = event.layerY;
            switch (this.sceneNumber) {
                case 2:
                    if(mousex>=50&&mousex<=50+this.morraGame.imgW){
// 
                        }
                    break;
            
                default:
                    break;
            }
        }
    }

}

export default SceneManager;