var CLUILayer = cc.Layer.extend({
    discountText: null,
    ctor: function () {
        this._super();
        // 加载左上角按钮
        this.loadTopLeftButtons();
        // 加载中间促销按钮
        this.loadDiscountButton();
        // 加载右上角生命星
        this.loadTopRightLifeStar();
    },
    loadTopLeftButtons: function () {
        var leftPanel = new ccui.ImageView(res.cl_stagemap_toolbar_leftbg_png);
        this.addChild(leftPanel);
        leftPanel.setAnchorPoint(0, 1);
        leftPanel.setPosition(0, cc.winSize.height);

        // 加载首页按钮
        this.loadHomeButton(leftPanel);
        // 加载商店按钮
        this.loadShopButton(leftPanel);
        // 加载排行榜按钮
        this.loadRankButton(leftPanel);
    },
    loadHomeButton: function (parent) {
        var node = new ccui.Button();
        parent.addChild(node);
        var textures = res.cl_stagemap_toolbar_home_png;
        node.loadTextures(textures, textures, "");
        node.setPressedActionEnabled(true);
        node.setZoomScale(0.2);
        node.setAnchorPoint(0, 0);
        node.setPosition(10, 10);
        node.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
                    cc.director.runScene(new MainMenuScene());
                    break;
            }
        }, this);
    },
    loadShopButton: function (parent) {
        var node = new ccui.Button();
        parent.addChild(node);
        var textures = res.cl_stagemap_toolbar_shop_png;
        node.loadTextures(textures, textures, "");
        node.setPressedActionEnabled(true);
        node.setZoomScale(0.2);
        node.setAnchorPoint(0, 0);
        node.setPosition(node.width + 12, 10);
        node.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
                    cc.log("点击商店按钮");
                    break;
            }
        }, this);
    },
    loadRankButton: function (parent) {
        var node = new ccui.Button();
        parent.addChild(node);
        var textures = res.cl_stagemap_toolbar_leaderboard_png;
        node.loadTextures(textures, textures, "");
        node.setPressedActionEnabled(true);
        node.setZoomScale(0.2);
        node.setAnchorPoint(0, 0);
        node.setPosition(node.width * 2 + 12, 10);
        node.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
                    cc.log("点击排行榜按钮");
                    break;
            }
        }, this);
    },
    loadDiscountButton: function () {
        var button = new ccui.Button();
        this.addChild(button);
        var resourceStr = res.cl_discount_tag_stone_png;
        button.loadTextures(resourceStr, resourceStr, "");
        button.setAnchorPoint(0.5, 1);
        button.setPosition(cc.winSize.width / 2, cc.winSize.height);
        button.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.log("点击促销按钮");
                    break;
            }
        }, this);

        // 折扣显示
        var text = new ccui.TextBMFont("8", res.cl_fn_discount_fnt);
        this.discountText = text;
        button.addChild(text);
        text.setAnchorPoint(0, 0);
        text.setPosition(145, 60);
    },
    loadTopRightLifeStar: function () {
        var button = new ccui.Button();
        this.addChild(button);
        var resourceStr = res.cl_stagemap_toolbar_rightbg_png;
        button.loadTextures(resourceStr, resourceStr, "");
        button.setAnchorPoint(1, 1);
        button.setPosition(cc.winSize.width, cc.winSize.height);
        button.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.log("点击生命星按钮");
                    break;
            }
        }, this);

        // 生命星的图片背景
        var starImage = new ccui.ImageView(res.cl_overten_png);
        this.addChild(starImage);
        starImage.setAnchorPoint(1, 1);
        starImage.setPosition(cc.winSize.width, cc.winSize.height);

        // 生命星数量
        var text = new ccui.Text("010", "", 24);
        starImage.addChild(text);
        text.setAnchorPoint(0,0);
        text.setPosition(190,66);
    }
});