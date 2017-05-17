const fs = require('fs');
const data = require('./buildingCompanies.json');
// const data = require('./data.json');

fs.writeFile(
	'buildingInfo.txt', 
	data.reduce(
			(acc, item) => {
				return acc + stringifyItem(item)
			},
			''
		), 
	err => {
		if (err) throw err;
		console.log('complete!')
	})

function stringifyItem(data) {
	const staticStr = data._id.$oid + nl() +
		data.buildingName + nl() +
		data.province + tab() + data.city + tab() + data.district + tab() + data.street + nl(2);

	const DynamicStr = data.floorInfos.reduce(
			(acc, val) => {
				return acc + 'floor: ' + val.floor  + nl() 
					+ flattenCompAddrs(val.compAddrs)
			},
			''
		);

	function flattenCompAddrs(data) {
		return data.reduce(
				(acc, val) => {
					return acc + val.companyName + nl() + val.address + nl(2);
				},
				''
			);
	}

	return staticStr + DynamicStr + nl() + del() + nl();
}

function tab(num = 1) {
	const td = '  ';
	return td.repeat(num);
}

function nl(num = 1) {
	const td = '\n\r';
	return td.repeat(num);
}

function del(num = 1) {
	const td = '--------------------------------------------------------------' + nl();
	return td.repeat(num);
}