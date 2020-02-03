let imgHttp = "http://localhost:3000/images/fight_the_landlords"
// 创建牌组
class PokerResource {
    constructor() {
        this.resource = {}; // 总资源对象
        this.images = []; //图片
        // 扑克牌图片
        this.colors = ["黑桃", "红桃", "梅花", "方块"];
        this.numbers = [[1, "3"], [2, "4"], [3, "5"], [4, "6"], [5, "7"], [6, "8"], [7, "9"], [8, "10"], [9, "J"], [10, "Q"], [11, "K"], [12, "A"], [13, "2"]];
        this.setPokerImage();
        this.setItemImage();
        this.setPosition();
    }
    // 设置扑克牌图片数据
    setPokerImage() {
        // 添加大小王
        this.images.push({ name: "小王", point: 14 });
        this.images.push({ name: "大王", point: 15 });
        //给对应牌加上花色
        for (let i = 0; i < this.colors.length; i++) {
            for (let j = 0; j < this.numbers.length; j++) {
                let name = this.colors[i] + this.numbers[j][1];
                let point = this.numbers[j][0];
                this.images.push({ name, point });
            }
        }

        // 添加图片链接
        for (let i = 0; i < this.images.length; i++) {
            this.images[i].url = `${imgHttp}/${i + 1}.jpg`;
        }

        // 把图片数据放入资源中
        this.resource.images = this.images;
    }

    // 设定背景和按钮图片数据
    setItemImage() {
        // 添加背景图片
        this.images.push({ name: "bgImage", url: `${imgHttp}/bg1.png` });
        // 开始按钮
        this.images.push({ name: "startBtn", url: `${imgHttp}/kaishi.png` })
        // 点数
        this.images.push({ name: "one", socre: 1, url: `${imgHttp}/yf.png` });
        this.images.push({ name: "two", socre: 2, url: `${imgHttp}/ef.png` });
        this.images.push({ name: "three", socre: 3, url: `${imgHttp}/sf.png` });
        // 牌背面
        this.images.push({ name: "pokerBack", url: `${imgHttp}/pokerback.png` });
        // 按钮
        this.images.push({ name: "pass", url: `${imgHttp}/buchu.png` });
        this.images.push({ name: "tip", url: `${imgHttp}/tishi.png` });
        this.images.push({ name: "play", url: `${imgHttp}/chupai.png` });
    }

    setPosition() {
        for (let i = 0; i < this.images.length; i++) {
            this.images[i].positon = { x: null, y: null }
        }
    }

    // 以 json 格式返回资源
    getResource() {
        return JSON.stringify(this.resource)
    }

}

export const resource = new PokerResource().getResource();
export default PokerResource;
// // 打乱牌组
    // pokerList.sort(() => {
    //     return Math.random() > 0.5 ? -1 : 1;
    // });