import MorraResource from './MorraResource'

export default function loadAllResource(canvas,ctx,sceneManager) {
    const R={};
    let alreadyDoneNumber = 0;
    const morraImage = MorraResource.images;
    for (let i = 0; i < morraImage.length; i++) {
        R[morraImage[i].name] = new Image();
        R[morraImage[i].name].src = morraImage[i].url;
        window.console.log(R[morraImage[i].name].onload)
        R[morraImage[i].name].onload = () => {
        alreadyDoneNumber++;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.font = "30px 宋体";
            ctx.fillText(`正在加载第${alreadyDoneNumber}/${morraImage.length}张图片,请稍后`,200,300)
            if (alreadyDoneNumber == morraImage.length) {
                window.console.log('图片加载完毕');
                sceneManager.loadedRes = R;
                sceneManager.render()
            }
        }
    }
}