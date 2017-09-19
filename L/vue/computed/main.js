function SelfVue(opt) {
	var self = this;
	self.data = opt.data;
	self.computed = opt.computed;
	Object.keys(opt.data).forEach(key => self._proxyKey(self, key));

	observe(opt.data);
	this.init();

	new Compiler(opt.el, self);
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
			},
			init() {
				this.initComputed();
			},
			initComputed() {
				const watchers = this._computedWatchers = Object.create(null);

				for (const key in this.computed) {
					const userDef = this.computed[key];

					// create internal watcher for the computed property.
					watchers[key] = new Watcher(
						this,
						userDef || noop,
						noop, {
							lazy: true
						}
					);


					// component-defined computed properties are already defined on the
					// component prototype. We only need to define computed properties defined
					// at instantiation here.
					defineComputed(this, key, userDef);
				}
			}
	}
);

function defineComputed(vm, key, userDef) {
	Object.defineProperty(vm, key, {
		enumerable: true,
		configurable: true,
		get: createComputedGetter(key)
	});
}

function createComputedGetter(key) {
	return function computedGetter() {
		const watcher = this._computedWatchers && this._computedWatchers[key];
		if (watcher) {
			if (watcher.dirty) {
				watcher.evaluate();
			}
			if (Dep.target) {
				watcher.depend();
			}
			return watcher.value;
		}
	}
}
