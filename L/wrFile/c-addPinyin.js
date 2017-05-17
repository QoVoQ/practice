const fs = require('fs');
const pinyin = require('pinyin');


function addPinyin(item) {
	item.phonetic = toPinyin(item.cn)
	return item
}

function mapPinyin(source) {
	return source.map(addPinyin)	
}

function toPinyin(text) {
	const opt = {
		style: pinyin.STYLE_NORMAL
	}
	return pinyin(text, opt).join('')
}

function write(outputFileName, source) {
	const res = mapPinyin(source);
	return new Promise(
		(resolve, reject) => {
			fs.writeFile(
				outputFileName,
				JSON.stringify(res, null, 2),
				err => {
					if (err) { reject(err) }
					console.log('add Pinyin complete.');
					console.log('%d items get pinyin', res.length)
					resolve()
				}
			)
		}
	)

}

module.exports = write

