var GameResultScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        this.loadBackgroundLayer();
        this.loadMainLayer();

    },
    // 加载背景层
    loadBackgroundLayer:function () {
        var backgroundLayer = new GRBackgroundLayer();
        this.addChild(backgroundLayer);
    },
    // 加载主层
    loadMainLayer:function () {
        var mainLayer = new GRMainLayer();
        this.addChild(mainLayer);
    }
});