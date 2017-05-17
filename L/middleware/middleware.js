const Middleware = function Middleware() {
	this.tasks = [];
}

Middleware.prototype = {
	use(fn) {
		this.tasks.push(fn)
	},
	next() {
		console.log('next called')
		const fn = this.tasks.shift()
		typeof fn === 'function' && fn(this.next.bind(this))
	},
	run() {
		this.Middlewarewares = this.tasks.slice()	// make a copy, now run can be called multiple times
		this.next()
	}
}

module.exports = Middleware
