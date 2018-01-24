var GRMainLayer = cc.Layer.extend({
    onEnter: function () {
        this._super();

        this.loadTitle();
        this.loadTitleIcon();
        this.loadAdvance();
        this.loadTipPanel();
        this.loadMenu();
    },
    // 加载标题
    loadTitle: function () {
        var fileName = GameManager.getIsWin() ? res.gs_win_title_whb_png : res.gs_lose_title_whb_png;
        var node = new ccui.ImageView(fileName);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height - node.height);
    },
    // 加载标题图标
    loadTitleIcon: function () {
        var fileName = GameManager.getIsWin() ? res.gs_cup_gold_png : res.gs_lose_rip_png;
        var node = new ccui.ImageView(fileName);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height - node.height / 2 - 30);
    },
    loadAdvance: function () {
        var fileName = GameManager.getIsWin() ? res.gs_win_getstone_png : res.gs_lose_adv_png;
        var node = new ccui.ImageView(fileName);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 + 60);

        if (GameManager.getIsWin()) {
            // 赢了
            var stoneText = new ccui.Text("04", "", 38);
            node.addChild(stoneText);
            stoneText.setPosition(node.width - 140, node.height / 2);
        } else {
            var currGroup = new ccui.Text(GameManager.getGroup(), "", 38);
            node.addChild(currGroup);
            currGroup.setPosition(node.width / 2 - 15, node.height / 2 + 10);

            var maxGroup = new ccui.Text(GameManager.getMaxGroup() + 1, "", 38);
            node.addChild(maxGroup);
            maxGroup.setPosition(node.width / 2 + 60, node.height / 2 + 10);
        }
    },
    loadTipPanel: function () {
        var fileName = GameManager.getIsWin() ? res.gs_winlose_winover_png : res.gs_winlose_loseover_png;
        var node = new ccui.ImageView(fileName);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 - 10);

        if (GameManager.getIsWin()) {
            // 赢了
            var mission = null;
            var icon = null;
            var count = null;
            var nextPosX = 310;
            var iconName = ["micon_b5", "micon_b5", "micon_b4"];

            for (var i = 0; i < 3; i++) {
                mission = new ccui.ImageView("res/GameResult/Win/mission1_" + (i + 1) + ".png");
                this.addChild(mission);
                mission.setPosition(nextPosX, 240);

                icon = new ccui.ImageView("res/GameResult/Win/" + iconName[i] + ".png");
                this.addChild(icon);
                icon.setPosition(nextPosX - 120, 240);

                nextPosX += 300;
            }

        } else {
            var randomIndex = 1 + Math.floor(Math.random() * 10);
            var tip = new ccui.ImageView("res/GameResult/Lose/lose_tip_" + randomIndex + ".png");
            node.addChild(tip);
            tip.setPosition(node.width / 2, node.height / 2 - 75);
        }

        if (GameManager.getIsWin()) {
            var level = new ccui.Text("3", "", 32);
            node.addChild(level);
            level.setPosition(node.width / 2, node.height / 2 + 13);
        }
    },
    loadMenu: function () {
        var posY = 90;
        var offsetX = 260;

        // 返回主页
        var homeNormal = new cc.Sprite("res/UI/btn_blue_s.png");
        var homePress = new cc.Sprite("res/UI/btn_blue_s_pressed.png");
        var homeDisabled = new cc.Sprite("res/UI/btn_blue_s.png");
        var home = new cc.MenuItemSprite(
            homeNormal,
            homePress,
            homeDisabled,
            function () {
                cc.audioEngine.stopMusic();
                cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
                cc.director.runScene(new ChooseLevelScene());
            }.bind(this)
        );
        home.setPosition(cc.winSize.width / 2 - offsetX, posY);

        var homeIcon = new ccui.ImageView(res.gs_winlose_home_png);
        home.addChild(homeIcon);
        homeIcon.setPosition(home.width / 2, home.height / 2);

        // 继续游戏
        var playNormal = new cc.Sprite("res/UI/btn_green_b.png");
        var playPress = new cc.Sprite("res/UI/btn_green_b_pressed.png");
        var playDisabled = new cc.Sprite("res/UI/btn_green_b.png");
        var play = new cc.MenuItemSprite(
            playNormal,
            playPress,
            playDisabled,
            function () {
                cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
                GameManager.loadLevelData(GameManager.getLevel());
                cc.director.runScene(new GamePlayScene());
            }.bind(this)
        );
        play.setPosition(cc.winSize.width / 2, posY);

        var playIcon = null;
        if (GameManager.getIsWin()) {
            playIcon = new ccui.ImageView(res.gs_win_continue_png);
        } else {
            playIcon = new ccui.ImageView(res.gs_lose_retry_png);
        }
        play.addChild(playIcon);
        playIcon.setPosition(play.width / 2, play.height / 2);

        // 微博
        var weiboNormal = new cc.Sprite("res/UI/btn_blue_s.png");
        var weiboPress = new cc.Sprite("res/UI/btn_blue_s_pressed.png");
        var weiboDisabled = new cc.Sprite("res/UI/btn_blue_s.png");
        var weibo = new cc.MenuItemSprite(
            weiboNormal,
            weiboPress, weiboDisabled,
            function () {
                cc.audioEngine.playEffect(res.sd_mm_Select_mp3);
                cc.log("点击微博按钮");
            }.bind(this)
        );
        weibo.setPosition(cc.winSize.width / 2 + offsetX, posY);
        var weiboIcon = new ccui.ImageView(res.gs_win_weibo_png);
        weibo.addChild(weiboIcon);
        weiboIcon.setPosition(weibo.width / 2, weibo.height / 2);

        // 菜单
        var menu = new cc.Menu(home,play,weibo);
        this.addChild(menu);
        menu.setPosition(0,0);
    }
});