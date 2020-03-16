// 场景管理器
/**
 *  1: 初始屏幕，只有背景和准备按钮
 *  2：进入场景二，首先便是发牌页面
 *  3：结束画面
 */


class SceneManager {
    constructor(canvas,ctx,loadedRes) {
        this.canvas = canvas,
        this.ctx = ctx;
        this.sceneNumber = 1;
        this.loadedRes = loadedRes;
        // this.loadAllResource();
        // this.render()
    }

    // 场景内动作
    update() {

    }

    // 选择渲染的场景
    render() {
        switch (this.sceneNumber) {
            case 1:
                // 1. 加载背景和准备按钮
                this.ctx.drawImage(this.loadedRes["bgImage"], 0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.loadedRes["startBtn"], this.canvas.width / 2 - 65, this.canvas.height*0.618,130,65);
                break;

            default:
                break;
        }
    }

    // 进入场景时的动作
    enter() {
        // 1. 添加按钮事件
    }
}

export default SceneManager;