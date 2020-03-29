// 猜拳场景管理器
class SceneManager {
    constructor(canvas, ctx, socket) {
        this.canvas = canvas,
        this.ctx = ctx;
        this.sceneNumber = 1;
        this.loadedRes = null;
        this.socket = socket;
    }

    update(){}

    render(){}

    enter(){}

    bind(){}

}

export default SceneManager;