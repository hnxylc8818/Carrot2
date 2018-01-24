var GRBackgroundLayer = cc.Layer.extend({
    onEnter:function () {
        this._super();

        this.loadWinOrLoseBg();
        this.loadForeground();
    },
    // 加载输/赢背景
    loadWinOrLoseBg:function () {
        var fileName = GameManager.getIsWin()?res.gs_win_bg_png:res.gs_lose_bg_png;
        var node = new ccui.ImageView(fileName);
        this.addChild(node);
        node.setAnchorPoint(0.5,1);
        node.setPosition(cc.winSize.width / 2,cc.winSize.height);
    },
    // 加载前景
    loadForeground:function () {
        var node = new ccui.ImageView(res.gs_winlose_bg_png);
        this.addChild(node);
        node.setAnchorPoint(0.5,0);
        node.setPosition(cc.winSize.width / 2,0);
    }
});