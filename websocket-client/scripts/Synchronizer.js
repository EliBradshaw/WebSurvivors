import SyncItem from "./SyncItem";

export default class Synchronizer {
    static syncItems = [];
    static syncMap = {};
    static addSyncItem(name, initFun, tickFun) {
        let item = new SyncItem(name, initFun, tickFun);
        Synchronizer.syncItems.push(item);
        Synchronizer.syncMap[name] = item;
    }

    static sync(serInfo) {
        for (let name in serInfo) {
            let sitem = Synchronizer.syncMap[name];
            sitem.consider(serInfo[name]);
        }
    }

    static get(name) {
        return Synchronizer.syncMap[name].data;
    }
}
