function SelfVue(opt) {
	var self = this;
	self.data = opt.data;
	self.el = opt.el;

	Object.keys(self.data).forEach(key => self._proxyKey(self, key));

	observe(self.data);

	new Compiler(self.el, self);
}

SelfVue.prototype = Object.assign(
	SelfVue.prototype, {
		_proxyKey(vm, key) {
			Object.defineProperty(vm, key, {
				enumerable: false,
				configurable: true,
				get() {
					return vm.data[key];
				},
				set(val) {
					vm.data[key] = val;
				}
			});
		}
	}
);
