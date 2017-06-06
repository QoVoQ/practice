function Watcher(vm, exp, cb) {
	this.vm = vm;
	this.exp = exp;
	this.cb = cb;
	this.value = this.get();
}

Watcher.prototype = Object.assign(
	Watcher.prototype,
	{
		run() {
			var oldVal = this.value;
			var newVal = this.vm.data[this.exp];
			if (oldVal !== newVal) {
				this.value = newVal;
				this.cb.call(this.vm, newVal, oldVal);
			}
		},
		get() {
			Dep.target = this;
			var value = this.vm.data[this.exp];
			Dep.target = null;
			return value;
		}
	}
);