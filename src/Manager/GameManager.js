// 游戏管理对象
var GameManager = {
    level: 0,           //关卡
    levelData: [],      // 关卡数据
    themeID: 0,         // 主题
    monsterGroup: [],   // 怪物数据池
    group: 0,           // 组别
    maxGroup: 0,        // 组别最大值
    _groupIndex: 0,     // 组别索引，仅在遍历时使用
    carrotBlood: 0,     // 萝卜血量
    gold: 0,            // 金币
    enemyInterval: 0,   //刷怪时间间隔
    groupInterval: 0,   //组数时间间隔
    levelName: 0,        // 关卡名字

    // 获取下一个怪物数据 相关属性
    _teamIndex: 0,       // 队伍游标
    _teamCount: 0,       // 队伍总数
    _teamMonsterCount: 0,    // 当前队伍怪物总数
    _teamMonsterIndex: 0,    // 当前队伍怪物游标
    isMonsterGetFinish: false,//所有怪物是否获取完毕

    // 弹出下一组怪物数据 相关属性
    _monsterDataArray: [],   // 怪物数据二维数组

    currMonsterDataPool: [], // 当前怪物数据池
    currMonsterPool: [],      // 当前怪物节点池
    currBulletPool: [],      // 当前子弹节点池

    isWin: false,            // 是否赢了

    // 加载关卡数据
    loadLevelData: function (level) {
        this.level = level;
        this.levelData = LevelData[level];
        this.themeID = this.levelData.themeID;
        this.monsterGroup = this.levelData.monsterGroup;
        this.group = 0;
        this.maxGroup = this.monsterGroup.length - 1;
        this._groupIndex = 0;
        this.carrotBlood = this.levelData.blood;
        this.gold = this.levelData.gold;
        this.enemyInterval = this.levelData.enemyInterval;
        this.groupInterval = this.levelData.groupInterval;
        this.levelName = this.levelData.levelName;

        this._teamIndex = 0;
        this._teamCount = this.monsterGroup[0].team.length - 1;
        this._teamMonsterIndex = 0;
        this._teamMonsterCount = this.monsterGroup[0].team[0].count - 1;
        this.isMonsterGetFinish = false;

        this._monsterDataArray = [];
        this.currMonsterDataPool = [];
        this.currMonsterPool = [];
        this.currBulletPool = [];

        this.isWin = false;

        // 加载怪物数据
        this._loadMonsterData();
    },
    _loadMonsterData: function () {
        var group;  // 组
        var team;   // 对
        var unit;   // 只
        var data = {};
        this._monsterDataArray = [];
        for (group = 0; group < this.monsterGroup.length; group++) {
            this._monsterDataArray[group] = [];
            for (team = 0; team < this.monsterGroup[group].team.length; team++) {
                for (unit = 0; unit < this.monsterGroup[group].team[team].count; unit++) {
                    data = this._getNextMonsterData();
                    this._monsterDataArray[group].push(data);
                }
            }
        }


    },
    _getNextMonsterData: function () {
        if (this.isMonsterGetFinish === true) {
            cc.warn("GameManager._getNextMonsterData()：所有怪物数据已经获取完毕！");
            return;
        }

        var teamData = this.monsterGroup[this._groupIndex].team[this._teamIndex];
        var monsterData = {};
        monsterData.group = this._groupIndex;
        monsterData.name = teamData.name;
        monsterData.blood = teamData.blood;
        monsterData.speed = teamData.speed;
        monsterData.index = this._teamMonsterIndex;
        this._teamMonsterIndex++;
        // 是否进入到下一队
        if (this._teamMonsterIndex > this._teamMonsterCount) {
            this._enterNextTeam();
        }

        return monsterData;

    },
    _enterNextTeam: function () {
        this._teamMonsterIndex = 0;
        this._teamIndex++;
        // 进入下一组
        if (this._teamIndex > this._teamCount) {
            this._enterNextGroup();
        } else {
            // 进入下一队
            this._teamMonsterCount = this.monsterGroup[this._groupIndex].team[this._teamIndex].count - 1;
        }

    },
    _enterNextGroup: function () {
        this._groupIndex++;
        // 添加完毕
        if (this._groupIndex > this.maxGroup) {
            this.isMonsterGetFinish = true;
            return;
        }
        this._teamIndex = 0;
        this._teamCount = this.monsterGroup[this._groupIndex].team.length - 1;
        this._teamMonsterIndex = 0;
        this._teamMonsterCount = this.monsterGroup[this._groupIndex].team[this._teamIndex].count - 1;
    },
    // 弹出下一组怪物数据
    popNextMonsterGroupData: function () {
        var groupData = [];
        if (this.group <= this.maxGroup) {
            this.group++;
            groupData = this._monsterDataArray[0];
            this._monsterDataArray.splice(0, 1);

            // 抛出事件，组别更新
            var event = new cc.EventCustom(jf.EventName.GP_UPDATE_GROUP);
            event.setUserData({
                group: this.group
            });
            cc.eventManager.dispatchEvent(event);
        } else {
            groupData = [];
        }
        return groupData;
    },
    // 获取怪物总数量
    getCurrGroupMonsterSum: function () {
        var monsterCount = 0;
        var team = this.monsterGroup[this.group - 1].team;
        for (var i = 0; i < team.length; i++) {
            monsterCount += team[i].count;
        }
        return monsterCount;
    },
    subtractCarrotBlood: function () {
        this.carrotBlood = this.carrotBlood <= 0 ? 0 : this.carrotBlood - 1;
        // 抛出血量更新事件
        var event = new cc.EventCustom(jf.EventName.GP_UPDATE_CARROT_BLOOD);
        event.setUserData({
            blood:this.carrotBlood
        });
        cc.eventManager.dispatchEvent(event);

        // 抛出游戏结束事件
        if (this.carrotBlood === 0){
            var gameOverEvent = new cc.EventCustom(jf.EventName.GP_GAME_OVER);
            gameOverEvent.setUserData({
                isWin:false
            });
            cc.eventManager.dispatchEvent(gameOverEvent);
        }
    },


    // getter & setter
    getLevel: function () {
        return this.level;
    },
    setLevel: function (level) {
        this.level = level;
    },
    getLevelData: function () {
        return this.levelData;
    },
    getThemeID: function () {
        return this.themeID;
    },
    getMonsterGroup: function () {
        return this.monsterGroup;
    },
    getGroup: function () {
        return this.group;
    },
    getMaxGroup: function () {
        return this.maxGroup;
    },
    getGold: function () {
        return this.gold;
    },
    getEnemyInterval: function () {
        return this.enemyInterval;
    },
    getGroupInterval: function () {
        return this.groupInterval;
    },
    getLevelName: function () {
        return this.levelName;
    },
    getCarrotBlood: function () {
        return this.carrotBlood;
    },
    setCarrotBlood: function (blood) {
        this.carrotBlood = blood;
    },
    getCurrMonsterDataPool: function () {
        return this.currMonsterDataPool;
    },
    getCurrMonsterPool: function () {
        return this.currMonsterPool;
    },
    getCurrBulletPool: function () {
        return this.currBulletPool;
    },
    getIsWin: function () {
        return this.isWin;
    },
    setIsWin: function (isWin) {
        this.isWin = isWin;
    }
};