function Counter () {
	this.c = 0
}

Object.assign(Counter.prototype, {
	mark() {
		this.c++
		return true
	},
	get() {
		return this.c
	}
})

module.exports = Counter