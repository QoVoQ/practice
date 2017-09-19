let depId = 0;
const depAll = [];

function Dep(exp) { // Dep 是存放、管理watcher的容器
	this.subs = []; // save watchers
	this.exp = exp;
	this.id = depId++;
	depAll.push(this);
}

Dep.prototype = Object.assign(
	Dep.prototype, {
		add(watcher) { //	添加 wathcer
				// console.log('dep.length --- ', this.subs.length);
				if (this.subs.find(item => item.id === watcher.id)) {
					return;
				}
				this.subs.push(watcher);
			},
			notify() { //	触发 watcher
				this.subs.forEach(sub => sub.update());
			},
			/* ----------computed--------- */
			depend() {
				if (Dep.target) {
					Dep.target.addDep(this);
				}
			}
			/* ----------computed--------- */
	}
);

/* ----------computed--------- */
Dep.target = null;
const targetStack = [];

function pushTarget(_target) {
	if (Dep.target) {
		targetStack.push(Dep.target);
	}
	Dep.target = _target;
}

function popTarget() {
	Dep.target = targetStack.pop();
}

function noop() {}
/* ----------computed--------- */
