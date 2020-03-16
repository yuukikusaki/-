// 初始化资源
import PokerResource from './pokerResource'
import SceneManager from './SceneManager'

function loadedRes(canvas,ctx) {
    const R={};
    let alreadyDoneNumber = 0;
    const pokerImage = PokerResource.images;
    for (let i = 0; i < pokerImage.length; i++) {
        R[pokerImage[i].name] = new Image();
        R[pokerImage[i].name].src = pokerImage[i].url;
        R[pokerImage[i].name].onload = () => {
            alreadyDoneNumber++;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.font = "30px 宋体"
            ctx.fillText(`正在加载第${alreadyDoneNumber}/${pokerImage.length}张图片,请稍后`,200,300)
            if (alreadyDoneNumber == pokerImage.length) {
                window.console.log('图片加载完毕');
                const sceneManager = new SceneManager(canvas,ctx,R);
                sceneManager.render()
            }
        }
    }
}

export default loadedRes;