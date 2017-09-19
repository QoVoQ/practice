let wcId = 0;

function Watcher(vm, exp, cb) {
	this.id = wcId++; // watcher unique id
	this.vm = vm; //	selfVue实例
	this.exp = exp; //	属性的key
	this.cb = cb; //	watcher要执行的回调，一般执行视图更新工作
	//	用于保存对应的属性值，用于传给this.cb
	//	PS: this.get() 很重要
	//		-	将Dep.target指向自己
	//		-	设置this.value初始值
	//		-	同时调用了对应属性的getter,
	//				对应属性的dep实例就添加了当前watcher
	//				属性的变化和当前watcher形成了订阅关系
	this.value = this.get(); // dependency collection
}

Watcher.prototype = Object.assign(
	Watcher.prototype, {
		run() { //	执行watcher的回调，更新视图
				var oldVal = this.value;
				var newVal = this.vm.data[this.exp];
				if (oldVal !== newVal) {
					this.value = newVal;
					this.cb.call(this.vm, newVal, oldVal);
				}
			},
			// added
			update() {
				queueWatcher(this);
			},
			get() {
				// first step of dependency collection
				Dep.target = this;
				// this.vm.data[this.exp] will trigger getter created in observer.js
				var value = this.vm.data[this.exp];
				Dep.target = null;
				return value;
			}
	}
);
