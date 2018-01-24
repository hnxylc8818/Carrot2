var CLBackgroundLayer = cc.Layer.extend({
    scrollView: null,
    zOrderMap: {},   // 层级枚举
    routeButtonArray: [],// 关卡按钮数据
    onEnter: function () {
        this._super();
        // 加载属性
        this.loadProperty();
        // 加载ScrollView
        this.loadScrollView();
        // 加载瓦片地图
        this.loadTiledMap();
        // 加载关卡
        this.loadLevel(GameManager.getLevel() + 1);
    },
    loadProperty: function () {
        this.zOrderMap.route = 1;     // 层级道路
        this.zOrderMap.routeButtonEffect = 5;   // 层级按钮特效
        this.zOrderMap.levelButton = 10;        // 层级按钮

        this.routeButtonArray = [];     // 清空按钮数组
    },
    loadScrollView: function () {
        var node = new ccui.ScrollView();
        this.addChild(node);
        this.scrollView = node;

        node.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        node.setTouchEnabled(true);
        node.setContentSize(cc.winSize);

        var nextPosX = 0;
        var imageView = null;
        for (var i = 0; i < 14; i++) {
            imageView = new ccui.ImageView("res/ChooseLevel/Map/stage_map_" + i + ".png");
            node.addChild(imageView);
            imageView.setAnchorPoint(cc.p(0, 0.5));
            imageView.setPosition(nextPosX, cc.winSize.height / 2);
            nextPosX += imageView.width - 1;
        }
        node.setInnerContainerSize(cc.size(nextPosX, cc.winSize.height));
    },
    loadTiledMap: function () {
        var node = new cc.TMXTiledMap(res.cl_road_tiledMap_tmx);
        var objectGroup = node.getObjectGroup("point");
        var objs = objectGroup.getObjects();
        for (var i = 0; i < objs.length; i++) {
            var button = new ccui.Button();
            this.scrollView.addChild(button, this.zOrderMap.levelButton, i);
            this.routeButtonArray.push(button);
            // 图片纹理
            var texture = res.cl_stagepoint_adv_png;
            // 编辑器中配置的属性
            if (objs[i].isBoos === "YES") {
                texture = res.cl_stagepoint_gate_png;
            } else if (objs[i].isTime === "YES") {
                texture = res.cl_stagepoint_time_png;
            } else if (objs[i].isChange === "YES") {
                texture = res.cl_stagepoint_chance_png;
            } else {
                texture = res.cl_stagepoint_adv_png;
            }
            button.loadTextures(texture, texture, "");
            button.setPosition(objs[i].x, objs[i].y);
            button.setTag(i);
            button.addTouchEventListener(this.onLevelButtonEvent, this);
        }
    },
    onLevelButtonEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
                var level = sender.getTag();    // 关卡等级
                if (level > GameManager.getLevel()){
                    cc.log("请先通过第" + GameManager.getLevel() + 1 + "关");
                    return;
                }
                cc.audioEngine.stopMusic();
                // TODO:加载关卡数据，进入游戏
                cc.LoaderScene.preload(g_gamePlay_resources,function () {
                    if (level > 2){
                        level = 2;
                    }
                    GameManager.loadLevelData(level);
                    cc.director.runScene(new GamePlayScene());
                },this);
                break;
        }
    },
    loadLevel:function (level) {
        this.loadRoute(level);
        this.loadLevelEffects(level);
    },
    // 加载关卡道路
    loadRoute:function (level) {
        var node = null;
        for (var i = 0;i<level - 1;i++){
            node = new cc.Sprite("#route_" + (i + 1)+".png");
            if (i % 10 === 9){
                node.setAnchorPoint(0,0.5);
            }
            node.x = node.width / 2 + Math.floor(i / 10) * node.width;
            node.y = this.scrollView.getInnerContainerSize().height / 2;
            this.scrollView.addChild(node,this.zOrderMap.route);
        }
    },
    loadLevelEffects:function (level) {
        var index = level - 1;
        var button = this.routeButtonArray[index];

        var node = new RouteButtonEffect();
        this.scrollView.addChild(node, this.zOrderMap.routeButtonEffect);
        node.setPosition(button.getPosition());
    }
});