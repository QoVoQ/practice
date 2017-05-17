function genPromise() {
	return Promise.resolve().then(res => console.dir('promise finished.'))
}

function setTimeoutAsy() {
	setTimeout(() => console.dir('setTimeout finished'), 0)
}

// function nextTickAsy() {
// 	process.nextTick(() => console.dir('nextTick finished'))
// }

function syn() {
	console.log('normal finished')
}

function main() {
	genPromise()
	setTimeoutAsy()
	// nextTickAsy()
	syn()
}

main()