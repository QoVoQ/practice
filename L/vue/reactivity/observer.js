function observe(target) {
	var keys = Object.keys(target);
	keys.forEach(key => {
		if (Array.isArray(target[key]) || typeof target[key] === 'object') {
			observe(target[key]);
		}

	defineReactivity(target, key, target[key]);
	});
}

function defineReactivity(target, key, val) {
	var dep = new Dep();
	Object.defineProperty(target, key, {
		// enumerable: true,
		// configurable: true,
		get() {
			if (Dep.target) {
				dep.add(Dep.target);
			}

			return val;
		},
		set(newVal) {
			if (newVal === val) { return; }

			val = newVal;
			dep.notify();
		}
	})
}