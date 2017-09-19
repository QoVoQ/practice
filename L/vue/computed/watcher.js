let watcherId = 0;
const watcherAll = [];

function Watcher(vm, exp, cb, opt = {}) {
	this.vm = vm; //	selfVue实例
	this.exp = exp; //	属性的key
	this.cb = cb || noop; //	watcher要执行的回调，一般执行视图更新工作
	//	用于保存对应的属性值，用于传给this.cb
	//	PS: this.get() 很重要
	//		-	将Dep.target指向自己
	//		-	设置this.value初始值
	//		-	同时调用了对应属性的getter,
	//				对应属性的dep实例就添加了当前watcher
	//				属性的变化和当前watcher形成了订阅关系

	/* ----------computed--------- */
	this.id = watcherId++;
	this.lazy = opt.lazy;
	this.dirty = this.lazy;
	this.deps = [];
	watcherAll.push(this);
	/* ----------computed--------- */
	this.value = this.get();
}

Watcher.prototype = Object.assign(
	Watcher.prototype, {
		run() { //	执行watcher的回调，更新视图
				var oldVal = this.value;
				// var newVal = this.vm.data[this.exp];

				/* ----------computed--------- */
				var newVal = this.get();
				/* ----------computed--------- */

				if (oldVal !== newVal) {
					this.value = newVal;
					this.cb.call(this.vm, newVal, oldVal);
				}
			},
			get() {
				// Dep.target = this;
				/* ----------computed--------- */
				pushTarget(this);
				/* ----------computed--------- */
				// debugger;
				var value = typeof this.exp === 'function' ? this.exp.call(this.vm) : this
					.vm.data[this.exp];

				// Dep.target = null;
				/* ----------computed--------- */
				popTarget();
				/* ----------computed--------- */
				return value;
			},
			/* ----------computed--------- */
			/**
			 * Subscriber interface.
			 * Will be called when a dependency changes.
			 */
			update() {
				/* istanbul ignore else */
				if (this.lazy) {
					this.dirty = true;
				} else {}
				this.run();
			},
			/**
			 * Evaluate the value of the watcher.
			 * This only gets called for lazy watchers.
			 */
			evaluate() {
				// console.log('computed attr changed');
				this.value = this.get();
				this.dirty = false;
			},
			/**
			 * Depend on all deps collected by this watcher.
			 */
			depend() {
				let i = this.deps.length
				while (i--) {
					this.deps[i].depend()
				}
			},
			/**
			 * Add a dependency to this directive.
			 */
			addDep(dep) {
				dep.add(this);
			}
			/* ----------computed--------- */
	}
);
