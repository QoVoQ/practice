function watchSth(target, exp) {
	var watcherCb = (newVal, oldVal) => { console.log('got sth change from', oldVal, '---', newVal); }
	observe(target);
	var wathcer = new Watcher(target, exp, watcherCb);
}

var info = {
	data: {
		name: 'Tom',
		age: 123
	}
};

watchSth(info, 'age');

setInterval(() => {
	info.data.age++;
}, 1000);
