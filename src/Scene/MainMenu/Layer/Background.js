var MMBackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        // 加载背景
        this.loadBackground();
        return true;
    },
    loadBackground: function () {
        var bgNode = new cc.Sprite(res.mm_front_bg_png);
        this.addChild(bgNode);
        bgNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    }
});