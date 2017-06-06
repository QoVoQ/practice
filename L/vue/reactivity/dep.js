function Dep () {
	this.subs = [];
}

Dep.prototype = Object.assign(
	Dep.prototype,
	{
		add(watcher) {
			this.subs.push(watcher);
		},
		notify() {
			this.subs.forEach(sub => sub.run());
		}
	}
);
