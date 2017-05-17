const fileFilter = require('./tidifyCareer.js')
const untidyInput = require('./career.js')
const tidyOutputFileName = 'tidy.json'

const addPinyin = require('./c-addPinyin.js')
const withPinyinOutputFileName = 'c-withPinyin.json'

const Counter = require('./counter.js')

function main() {
  const counter = new Counter();
  // fileFilter(tidyOutputFileName, untidyInput, counter) 
    addPinyin(withPinyinOutputFileName, require('./tidy.json'))
}

main()