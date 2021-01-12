if (!window.myPlugins) {
    window.myPlugins = {}
}

window.myPlugins.createWaterFall = function (option) {
    let defaultOpt = {
        minGap: 10
    }
    option = Object.assign({}, defaultOpt, option);
    let imgDoms = [];

    init();

    function init (){
        setParentPostin();
        createImgDom();
        let a = 'asdas'
        window.onresize = _debounce(setImgPosition, 100);
    }

    /**
     * 设置父元素的定位

    /**
     *设置图片的位置
     */
    function setImgPosition() {
        let info = getHorizontalInfo();

        let arr = new Array(info.num);
        arr.fill(0);

        imgDoms.forEach((img) => {
            let mintop = Math.min.apply(null, arr);
            img.style.top = mintop + 'px';
            let index = arr.indexOf(mintop);
            arr[index] += img.clientHeight + info.cap;
            img.style.left = index * option.imgWidth + index * info.cap * 0.9 + 'px';
            img.transition = '0.5s liner'
        })
        let maxTop = Math.max.apply(null, arr);
        option.container.style.height = maxTop + 'px'

    }

    /**
     * 得到图片水平上的信息
     */
    function getHorizontalInfo() {
        let obj = {};
        obj.containerWid = option.container.clientWidth;
        obj.num = Math.floor((option.container.clientWidth + option.minGap) / (option.imgWidth + option.minGap))
        obj.cap = (option.container.clientWidth - obj.num * option.imgWidth) / (obj.num - 1)
        return obj
    }


    /**
     * 防抖函数
     */
    function _debounce(func, wait) {
        let timer;
        return function (...args) {
            let _this = this;
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                func.apply(null, args)
                timer = null
            }, wait)
        }
    }
}