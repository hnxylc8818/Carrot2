var ChooseLevelScene = cc.Scene.extend({
    ctor:function () {
        this._super();
        cc.audioEngine.playMusic(res.sd_mm_BGMusic_mp3, true);
    },
    onEnter:function () {
        this._super();
        // 加载资源
        this.loadResource();
        // 加载背景层
        this.loadBackgroundLayer();
        // 加载UI层
        this.loadMainLayer();
    },
    loadResource:function () {
        cc.spriteFrameCache.addSpriteFrames(res.cl_route_plist,res.cl_route_png);
    },
    loadBackgroundLayer:function () {
        var backgroundLayer = new CLBackgroundLayer();
        this.addChild(backgroundLayer);
    },
    loadMainLayer:function () {
        var uiLayer = new CLUILayer();
        this.addChild(uiLayer);
    }
});