var GPUILayer = cc.Layer.extend({
    topBar: null,
    bottomBar: null,
    goldText: null,
    groupText: null,
    onEnter: function () {
        this._super();
        // 加载顶部菜单栏
        this.loadTopBar();
        // 加载金币
        this.loadGoldText();
        // 加载组信息
        this.loadGroupInfo();
        // 加载顶部按钮
        this.loadTopButtons();
        // 加载底部菜单栏
        this.loadBottomBar();
        // 加载任务背景
        this.loadMissionBg()
        // 加载底部按钮
        this.loadBottomButtons();
        // 注册事件
        this.registerEvent();
    },
    registerEvent: function () {
        var onUpdateGroupListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target: this,
            eventName: jf.EventName.GP_UPDATE_GROUP,
            callback: this.onUpdateGroup
        });
        cc.eventManager.addListener(onUpdateGroupListener, this);
    },
    onUpdateGroup: function (event) {
        var self = event.getCurrentTarget();
        var group = event.getUserData().group;
        self.groupText.setString(group + "");
    },
    // 加载顶部菜单
    loadTopBar: function () {
        var node = new ccui.ImageView();
        this.addChild(node);
        this.topBar = node;
        node.loadTexture("top_bg.png",ccui.Widget.PLIST_TEXTURE);
        node.setAnchorPoint(0.5, 1);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height);

        var centerNode = new ccui.ImageView();
        node.addChild(centerNode);
        centerNode.loadTexture("waves_bg.png",ccui.Widget.PLIST_TEXTURE);
        centerNode.setPosition(node.width / 2, node.height / 2);

        var groupInfo = new ccui.ImageView();
        centerNode.addChild(groupInfo);
        groupInfo.loadTexture("group_info.png",ccui.Widget.PLIST_TEXTURE);
        groupInfo.setPosition(centerNode.width / 2, centerNode.height / 2);
    },
    // 加载金币文本
    loadGoldText: function () {
        var goldStr = GameManager.getGold();
        var node = new ccui.Text(goldStr, "", 32);
        this.topBar.addChild(node);
        this.goldText = node;
        node.setAnchorPoint(0, 0.5);
        node.setPosition(100, 50);
    },
    // 加载组信息
    loadGroupInfo: function () {
        // 索引从0开始，应该加1
        var node = new ccui.Text("1", "", 32);
        this.topBar.addChild(node);
        this.groupText = node;
        node.x = this.topBar.width / 2 - 65;
        node.y = this.goldText.y;

        var maxGroup = GameManager.getMaxGroup() + 1;
        var maxNode = new ccui.Text(maxGroup + "", "", 32);
        this.topBar.addChild(maxNode);
        maxNode.x = node.x + 60;
        maxNode.y = node.y;
    },
    // 加载顶部按钮
    loadTopButtons: function () {
        this.loadSpeedButton();
        this.loadPauseButton();
        this.loadMenuButton();
    },
    // 加载 变速按钮
    loadSpeedButton: function () {
        var node = new ccui.Button();
        this.topBar.addChild(node);
        var textures = "speed_0.png";
        node.loadTextures(textures, textures, "",ccui.Widget.PLIST_TEXTURE);
        node.x = 700;
        node.y = this.topBar.height / 2;
    },
    // 加载暂停按钮
    loadPauseButton: function () {
        var node = new ccui.Button();
        this.topBar.addChild(node);
        var textures = "pause_0.png";
        node.loadTextures(textures, textures, "",ccui.Widget.PLIST_TEXTURE);
        node.setPressedActionEnabled(true);
        node.setZoomScale(0.2);
        node.setPosition(800, this.topBar.height / 2);
    },
    // 加载菜单按钮
    loadMenuButton: function () {
        var node = new ccui.Button();
        this.topBar.addChild(node);
        var textures = "menu.png";
        node.loadTextures(textures, textures, "",ccui.Widget.PLIST_TEXTURE);
        node.setPressedActionEnabled(true);
        node.setZoomScale(0.2);
        node.setPosition(870, this.topBar.height / 2);

        node.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
                    cc.log("点击菜单按钮");
                    var event = new cc.EventCustom(jf.EventName.GP_CREATE_MENU_LAYER);
                    cc.eventManager.dispatchEvent(event);
                    break;
            }
        }.bind(this));
    },
    // 加载底部菜单栏
    loadBottomBar: function () {
        var node = new ccui.ImageView();
        this.addChild(node);
        this.bottomBar = node;
        node.loadTexture("bottom_bg.png",ccui.Widget.PLIST_TEXTURE);
        node.setAnchorPoint(0.5, 0);
        node.setPosition(cc.winSize.width / 2, 0);
    },
    // 加载任务背景
    loadMissionBg: function () {
        var node = new ccui.ImageView();
        this.bottomBar.addChild(node);
        node.loadTexture("adv_mission_bg.png",ccui.Widget.PLIST_TEXTURE);
        node.setPosition(105, 25);
    },
    // 加载底部按钮
    loadBottomButtons: function () {
        var buttonRes = [
            "bar_bomb_02.png",
            "bar_blood_02.png",
            "bar_speed_02.png",
            "bar_ice_02.png",
            "bar_slow_02.png"
        ];
        var nextPosX = 420;
        var offsetX = 10;
        var button = null;
        for (var i = 0; i < 5; i++) {
            var image = new ccui.ImageView();
            this.bottomBar.addChild(image);
            image.loadTexture("bar_blank.png",ccui.Widget.PLIST_TEXTURE);
            image.setAnchorPoint(0.5, 0);
            image.setPosition(nextPosX, 0);

            button = new ccui.Button();
            image.addChild(button);
            button.setName(buttonRes[i]);
            var textures = buttonRes[i];
            button.loadTextures(textures, textures, "",ccui.Widget.PLIST_TEXTURE);
            button.setPressedActionEnabled(true);
            button.setZoomScale(0.2);
            button.setPosition(image.width / 2, image.height / 2);

            nextPosX += button.width + offsetX;
        }
    }
});