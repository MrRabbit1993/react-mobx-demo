import { observable, action, computed } from "mobx"


class List {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
    @action.bound toggle() {
        this.finished = !this.finished
    }
    constructor(title) {
        this.title = title
    }
}

class Store {
    @observable lists = [];//可变数据，都需要用observable修饰
    @action.bound createList(title) {//构建一个增加函数
        this.lists.unshift(new List(title))
    }
    @action.bound removeList(list) {//构建一个删除
        console.log("删除")
        this.lists.remove(list)   //remove 是mobx observable提供的，非原生js
    }
    @computed get unFinish() {//未完成的数量 .依赖可观察的变量，需要computed
        return this.lists.filter(_ => !_.finished).length
    }
}
export default new Store();

