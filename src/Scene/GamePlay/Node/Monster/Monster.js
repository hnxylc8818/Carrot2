var Monster = cc.Sprite.extend({
    road: [],                    // 移动路径
    data: {},                    // 数据
    speed: 0,                    // 速度
    index: 0,                    // 索引
    roadIndex: 0,                // 当前移动路径的前缀
    fileNamePrefix: "",          // 帧前缀
    originBlood: 0,               // 原始血量
    blood: 0,                    // 当前血量
    bloodBar: null,              // 血条
    ctor: function (fileName, data, fileNamePrefix) {
        this._super(fileName);

        this.loadProperty(data, fileNamePrefix);
        this.loadBlood();
    },
    // 加载血条
    loadBlood: function () {
        var bloodBar = new ccui.LoadingBar();
        this.addChild(bloodBar);
        this.bloodBar = bloodBar;
        bloodBar.loadTexture(res.cm_monster_blood);
        bloodBar.setDirection(ccui.LoadingBar.TYPE_LEFT);
        bloodBar.setAnchorPoint(0.5, 1);
        bloodBar.setScale(0.6, 1.2);
        bloodBar.setPosition(this.width / 2, this.height + 10);
    },
    // 加载属性
    loadProperty: function (data, fileNamePrefix) {
        cc.assert(data.speed, "Monster.loadProperty()：速度不能为空！");
        cc.assert(data.road, "Monster.loadProperty()：移动路径不能为空！");
        cc.assert(data.index >= 0, "Monster.loadProperty()：索引不能为空！");
        cc.assert(fileNamePrefix, "Monster.loadProperty()：文件名前缀不能为空！");

        this.data = data;
        this.speed = data.speed;
        this.road = data.road;
        this.index = data.index;
        this.blood = data.blood;
        this.originBlood = data.blood;
        this.fileNamePrefix = fileNamePrefix;
    },
    // 扣血
    subtractBlood: function () {
        var isRemove = false;
        this.blood -= 5 * (GameManager.getLevel() +1);
        if (this.blood <= 0) {
            this.blood = 0;
            isRemove = true;
        }
        var percent = this.blood / this.originBlood * 100;
        this.bloodBar.setPercent(percent);
        return isRemove;
    },
    // 跑到下一个标记点
    runNextRoad: function () {
        // 转方向
        if (this.road[this.roadIndex].x <= this.road[this.roadIndex + 1].x) {
            this.setFlippedX(false);
        } else {
            this.setFlippedX(true);
        }

        var distance = cc.pDistance(this.road[this.roadIndex], this.road[this.roadIndex + 1]);
        var time = distance / this.speed;
        var moveTo = new cc.MoveTo(time, this.road[this.roadIndex + 1]);
        var callback = cc.callFunc(function () {
            if (this.roadIndex < this.road.length - 1) {
                this.runNextRoad();
            } else {
                // 吃到萝卜事件抛出
                var event = new cc.EventCustom(jf.EventName.GP_MONSTER_EAT_CARROT);
                event.setUserData({
                    target: this
                });
                cc.eventManager.dispatchEvent(event);
            }
        }.bind(this));

        var seq = new cc.sequence(moveTo, callback);
        this.runAction(seq);
        this.roadIndex++;
    },
    // 播放动画
    playRunAnimation: function () {
        var frames = [];
        for (var i = 1; i < 4; i++) {
            var name = this.fileNamePrefix + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(name);
            frames.push(frame);
        }
        var animation = new cc.Animation(frames, 0.15);
        // 设置动画播放完毕是否恢复到第一帧
        animation.setRestoreOriginalFrame(true);

        // 包装成动作
        var animate = cc.animate(animation);
        this.runAction(animate.repeatForever());
    },
    run: function () {
        this.runNextRoad();
        this.playRunAnimation();
    },
    getRoad: function () {
        return this.road;
    },
    setRoad: function (road) {
        this.road = road;
    },
    getData: function () {
        return this.data;
    },
    getSpeed: function () {
        return this.speed;
    },
    setSpeed: function (speed) {
        this.speed = speed;
    },
    getIndex: function () {
        return this.index;
    },
    setIndex: function (index) {
        this.index = index;
    }
});