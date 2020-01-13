// would prefer not to need these eslint-disable. Refactoring advice welcome
/* eslint-disable no-multi-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */

// An RFC 4180-compliant CSV parser
// based on: https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data#answer-41563966

function parseCSV (text) {
  let previousLetter = ''
  let line = ['']
  const result = [line]
  let letterIndex = 0
  let lineIndex = 0
  let isInsideQuotes = !0

  for (let letter of text) {
    // letter is a quote
    if (letter === '"') {
      if (letter === previousLetter && isInsideQuotes) {
        line[letterIndex] += letter
      }
      isInsideQuotes = !isInsideQuotes
    }

    // letter is a comma
    else if (letter === ',' && isInsideQuotes) {
      letter = ''
      line[++letterIndex] = ''
    }

    // letter is a newline character
    else if (letter === '\n' && isInsideQuotes) {
      if (previousLetter === '\r') {
        // if previous character was '\r', remove it
        line[letterIndex] = line[letterIndex].slice(0, -1)
      }
      // advance to the next line and reset indexes
      line = result[++lineIndex] = [letter = '']
      letterIndex = 0
    }

    // letter has no parsing significance
    else {
      line[letterIndex] += letter
    }
    previousLetter = letter
  }

  return result
}

export default parseCSV
