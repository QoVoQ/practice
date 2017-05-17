// ASYN

function l (str) {
	console.log(str)
}

//	macrotask(task): script setTimtout, setInterval, setImmediate(node), I/O, UI rednding, dom event callback
//	microtask: promise, mutation observer, process.nextTick(how vue implements), Object.observe(obsolete) (PS Object.defineProperty is not microtask)
// ----error

	// i)
		// try {
		//     setTimeout(function () {
		//     	console.trace('show stack --- before error')
		//         throw new Error('error!');
		//     }, 300)
		//     console.trace('show stack --- try')
		// } catch (e) {
		// 		console.log('Error caught?')

		// }

		// console.trace('show stack --- main')


	// ii)
		// setTimeout(function () {
		//   try {
		//     throw new Error('error!');
		//   } catch (e) { 
		// 	console.log('Error caught!')
		//   }
		// }, 300)


//	----browser


//	----node

// const timer = setTimeout(
// 		() => console.log('timer started'), 0
// 	)
// const t = setImmediate(
// 		() => clearTimeout(timer), 0
// 	)


console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
//	object.defineProperty
var o = { prop: '' };
Object.defineProperty(o, 'prop', {
  get: function() { l('get called'); return this.value; },
  set: function(newValue) {
    // a certain property is being changed
    l('set called')
    this.value = newValue; 
  }
});

process.nextTick(() => l('nextTick called'))

o.prop = 'Johnson';




//	#references
//		https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
//		https://html.spec.whatwg.org/multipage/webappapis.html#event-loops
//		https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
//		https://promisesaplus.com/
//		http://blog.csdn.net/talking12391239/article/details/21168489
//			ajax is handle by another thread
//		https://github.com/creeperyang/blog/issues/21 
//			platform code
//		https://github.com/ccforward/cc/issues/48
//			event loop description
//		https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/#event-loop
