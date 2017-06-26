function SelfVue(opt) {
	var self = this;
	self.data = opt.data;

	Object.keys(opt.data).forEach(key => self._proxyKey(self, key));

	observe(opt.data);

	new Compiler(opt.el, self);
}

SelfVue.prototype = Object.assign(
	SelfVue.prototype,
	{
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
