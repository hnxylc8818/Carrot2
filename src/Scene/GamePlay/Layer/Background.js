var GPBackgroundLayer = cc.Layer.extend({
    onEnter: function () {
        this._super();
        // 加载背景
        this.loadBackground();
    },
    loadBackground: function () {
        var themeID = GameManager.getThemeID();
        var node = new cc.Sprite("res/GamePlay/Theme/Theme" + themeID + "/BG0/BG" + themeID + ".png");
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2,cc.winSize.height / 2);
    }
});