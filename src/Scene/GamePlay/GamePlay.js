var GamePlayScene = cc.Scene.extend({
    menuLayer:null,
    ctor:function () {
        this._super();
        cc.audioEngine.playMusic(res.sd_BGMusic01_mp3,true);
        this.registerEvent();
    },
    onEnter:function () {
        this._super();
        // 加载资源
        this.loadResource();
        // 加载背景层
        this.loadBackgroundLayer();
        // 加载主层
        this.loadMainLayer();
        // 加载UI层
        this.loadUILayer();
    },
    loadResource:function () {
        cc.spriteFrameCache.addSpriteFrames("res/GamePlay/UI/gp_ui.plist","res/GamePlay/UI/gp_ui.png");
        cc.spriteFrameCache.addSpriteFrames("res/GamePlay/Carrot/Carrot1/hlb1.plist", "res/GamePlay/Carrot/Carrot1/hlb1.png");
        cc.spriteFrameCache.addSpriteFrames("res/GamePlay/Tower/Bottle.plist", "res/GamePlay/Tower/Bottle.png");

        var themeId = GameManager.getThemeID();
        cc.spriteFrameCache.addSpriteFrames("res/GamePlay/Object/Theme" + themeId + "/Monster/theme_" + themeId + ".plist",
            "res/GamePlay/Object/Theme" + themeId + "/Monster/theme_" + themeId + ".png");
    },
    loadBackgroundLayer:function () {
        var backgroundLayer = new GPBackgroundLayer();
        this.addChild(backgroundLayer);
    },
    loadMainLayer:function () {
        var mainLayer = new GPMainLayer();
        this.addChild(mainLayer);
    },
    loadUILayer:function () {
        var uiLayer = new GPUILayer();
        this.addChild(uiLayer);
    },
    loadMenuLayer:function () {
        var menuLayer = new GPMenuLayer();
        this.addChild(menuLayer);
        this.menuLayer = menuLayer;
    },
    registerEvent:function () {
        // 事件监听器，创建菜单层
        var onCreateMenuLayerListener = cc.EventListener.create({
            event:cc.EventListener.CUSTOM,
            target:this,
            eventName:jf.EventName.GP_CREATE_MENU_LAYER,
            callback:this.onCreateMenuLayer
        });
        cc.eventManager.addListener(onCreateMenuLayerListener,this);

        // 事件监听器，移除菜单层
        var onRemoveMenuLayerListener = cc.EventListener.create({
            event:cc.EventListener.CUSTOM,
            target:this,
            eventName:jf.EventName.GP_REMOVE_MENU_LAYER,
            callback:this.onRemoveMenuLayer
        });
        cc.eventManager.addListener(onRemoveMenuLayerListener,this);
    },
    onCreateMenuLayer:function (event) {
        var self = event.getCurrentTarget();
        self.loadMenuLayer();
    },
    onRemoveMenuLayer:function (event) {
        var self = event.getCurrentTarget();
        self.removeChild(self.menuLayer);
    }
});