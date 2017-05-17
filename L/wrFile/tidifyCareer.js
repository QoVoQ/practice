
// console.dir(source.length);
const fs = require('fs');

const product = function (source, counter) {
	if (!counter) throw new Error('neea a counter')
	return source.filter(
			item => {
				return item.cn.length < 13 && item.en.length < 30 && counter.mark()
			}
		)
}

function write(fileName, source, counter) {
	return new Promise((resolve, reject) => {
			fs.writeFile(
			fileName,
			JSON.stringify(product(source, counter), null, 2),
			err => {
				if (err) { reject(err) }
				console.dir('tidify completed!')
				console.log('%d filtered through from %d items', counter.get(), source.length)
				resolve()	
			}
		)
		})
}

module.exports = write