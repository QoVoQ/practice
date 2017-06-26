function observe(target) {
	var keys = Object.keys(target);
	keys.forEach(key => {
		if (Array.isArray(target[key]) || typeof target[key] === 'object') {
			//	如果不是基本类型，递归遍历
			observe(target[key]);	
		}

	defineReactivity(target, key, target[key]);
	});
}

function defineReactivity(target, key, val) {
	var dep = new Dep();	//	为当前属性创建一个watcher容器
	Object.defineProperty(target, key, {
		enumerable: true,
		configurable: true,
		get() {
			if (Dep.target) {	
			//	如果Dep.target存在， Dep.target即为需要监听当前属性的watcher
			//	添加watcher容器中，方便以后wathcer的触发
				dep.add(Dep.target);
			}

			return val;
		},
		set(newVal) {	// 一旦属性发生变化，触发watcher
			if (newVal === val) { return; }

			val = newVal;
			dep.notify();	//	触发watcher，更新视图
		}
	})
}