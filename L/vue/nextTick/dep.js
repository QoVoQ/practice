function Dep() { // Dep 是存放、管理watcher的容器
	this.subs = []; // save watchers
}

Dep.prototype = Object.assign(
	Dep.prototype, {
		add(watcher) { //	添加 wathcer
				this.subs.push(watcher);
			},
			notify() { //	触发 watcher
				// this.subs.forEach(sub => sub.run());
				// console.log('dep notified');
				this.subs.forEach(sub => sub.update());
			}
	}
);
