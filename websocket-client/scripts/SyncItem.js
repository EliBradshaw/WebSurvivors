export default class SyncItem {
    constructor(name, initFun, tickFun, removeFun = i => i.remove(), idFun = i => i.id) {
        this.name = name;
        this.initFun = initFun;
        this.tickFun = tickFun;
        this.removeFun = removeFun;
        this.idFun = idFun;
        this.data = [];
        this.dataMap = {};
    }

    consider(newData) {
        let nDataMap = {};
        for (let item of this.data)
            this.dataMap[this.idFun(item)] = item;
        for (let item of newData) {
            nDataMap[this.idFun(item)] = item;
            if (this.dataMap[this.idFun(item)]) {
                let oItem = this.dataMap[this.idFun(item)];
                this.tickFun(oItem, item);
                continue;
            }
            this.data.push(this.initFun(item));
        }
        for (let i = 0; i < this.data.length; i++) {
            let oItem = this.data[i];
            if (!nDataMap[this.idFun(oItem)]) {
                let unrem = [];
                for (let im of this.data)
                    if (oItem != im)
                        unrem.push(im);
                    
                this.data = unrem;
                this.removeFun(oItem);
            }
        }
    }
}
