import { spy,observe,observable, action, computed, toJS } from "mobx"

// spy(event=>{
//     console.log("事件",event)
// })
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
    disposers = [];
    constructor(){
        observe(this.lists,change=>{//observe会返回一个disposer函数，执行这个函数，observe停止监视
            this.disposers.forEach(disposer=>disposer())//解除监视
            this.disposers = [];//清空
            for(let list of change.object){//监控成员
                let disposer =  observe(list,changeX=> {
                    //console.log("子",changeX)
                    this.save()
                });
                this.disposers.push(disposer)
            }
            this.save()
            // console.log("仓库",change)
        })
    }
    save(){
        // console.log(this.lists)
        // console.log(toJS(this.lists))
        localStorage.setItem('lists',JSON.stringify(toJS(this.lists)))
    }
    @action.bound removeList(list) {//构建一个删除
        this.lists.remove(list)   //remove 是mobx observable提供的，非原生js
    }
    @computed get unFinish() {//未完成的数量 .依赖可观察的变量，需要computed
        return this.lists.filter(_ => !_.finished).length
    }
}
export default new Store();

