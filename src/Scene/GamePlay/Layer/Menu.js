var GPMenuLayer = ccui.Layout.extend({
    panel: null,
    onEnter: function () {
        this._super();
        cc.director.pause();    //  游戏暂停

        // 加载基础配置
        this.loadConfig();
        // 加载背景面板
        this.loadPanel();
        // 加载关卡标签
        this.loadLevelLabel();
        // 加载继续游戏按钮
        this.loadGameContinueButton();
        // 加载再来一次按钮
        this.loadGameRestartButton();
        // 加载返回主页按钮
        this.loadHomeButton();
        // 加载微博按钮
        this.loadWeiboButton();
    },
    onExit: function () {
        this._super();
        cc.director.resume();   // 游戏恢复
    },
    // 加载配置
    loadConfig: function () {
        this.setTouchEnabled(true); // 设置触摸可用
        this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.setContentSize(cc.winSize);
        this.setBackGroundColor(cc.color(0, 0, 0));
        this.setBackGroundColorOpacity(128);
    },
    // 加载背景面板
    loadPanel: function () {
        var node = new ccui.ImageView();
        this.addChild(node);
        this.panel = node;
        node.loadTexture("adv_menu_bg.png", ccui.Widget.PLIST_TEXTURE);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height - node.height / 2);
    },
    // 加载关卡标签
    loadLevelLabel: function () {
        var levelStr = GameManager.getLevel() < 10 ? "0" + (GameManager.getLevel() + 1): (GameManager.getLevel() + 1 )+ "";
        var node = new ccui.Text(levelStr, "", 32);
        this.panel.addChild(node);
        node.setPosition(this.panel.width / 2, this.panel.height - 130);
    },
    // 加载继续游戏按钮
    loadGameContinueButton: function () {
        var node = new ccui.Button();
        this.panel.addChild(node);
        node.loadTextures(res.ui_btn_green_b_png, res.ui_btn_green_b_pressed_png, "");
        node.setPosition(this.panel.width / 2, this.panel.height / 2 + 85);
        node.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    // 事件抛出，隐藏菜单层
                    cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
                    var event = new cc.EventCustom(jf.EventName.GP_REMOVE_MENU_LAYER);
                    cc.eventManager.dispatchEvent(event);
                    break;
            }
        }.bind(this));

        var info = new ccui.ImageView();
        node.addChild(info);
        info.loadTexture("adv_menu_continue.png", ccui.Widget.PLIST_TEXTURE);
        info.setPosition(node.width / 2, node.height / 2);
    },
    // 加载再来一次按钮
    loadGameRestartButton: function () {
        var node = new ccui.Button();
        this.panel.addChild(node);
        node.loadTextures(res.ui_btn_blue_b_png, res.ui_btn_blue_b_pressed_png, "");
        node.setPosition(this.panel.width / 2, this.panel.height / 2 - 25);
        node.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
                    GameManager.loadLevelData(GameManager.getLevel());
                    cc.director.runScene(new GamePlayScene());
                    break;
            }
        }.bind(this));

        var info = new ccui.ImageView();
        node.addChild(info);
        info.loadTexture("adv_menu_restart.png", ccui.Widget.PLIST_TEXTURE);
        info.setPosition(node.width / 2, node.height / 2);
    },
    // 加载返回主页按钮
    loadHomeButton: function () {
        var node = new ccui.Button();
        this.panel.addChild(node);
        node.loadTextures(res.ui_btn_blue_l_png, res.ui_btn_blue_l_pressed_png, "");
        node.setPosition(this.panel.width / 2 - 83, this.panel.height / 2 - 138);
        node.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
                    cc.director.runScene(new ChooseLevelScene());
                    break;
            }
        }.bind(this));

        var info = new ccui.ImageView();
        node.addChild(info);
        info.loadTexture("adv_menu_home.png", ccui.Widget.PLIST_TEXTURE);
        info.setPosition(node.width / 2, node.height / 2);
    },
    // 加载微博按钮
    loadWeiboButton: function () {
        var node = new ccui.Button();
        this.panel.addChild(node);
        node.loadTextures(res.ui_btn_blue_l_png, res.ui_btn_blue_l_pressed_png, "");
        node.setPosition(this.panel.width / 2 + 83, this.panel.height / 2 - 138);

        var info = new ccui.ImageView();
        node.addChild(info);
        info.loadTexture("adv_menu_weibo.png", ccui.Widget.PLIST_TEXTURE);
        info.setPosition(node.width / 2, node.height / 2);
    }
});