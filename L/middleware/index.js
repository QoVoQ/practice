const Middleware = require('./middleware');

const m = new Middleware();

m.use(function(next) {
	console.log(1)
	next()
	console.log(12)
})

m.use(function(next) {
	console.log(2)
	next()
	console.log(22)
})

console.dir(m.tasks)

m.run();