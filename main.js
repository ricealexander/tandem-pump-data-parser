import axios from 'axios'

const CSV_FILES_PATH = '/data'

async function parseTandemData (url) {
  const { data, headers } = await axios.get(`${CSV_FILES_PATH}/${url}`)
  const isCSV = headers['content-type'].includes('text/csv')

  if (!isCSV) {
    throw new Error('Could not resolve provided data file as CSV')
  }

  // Tandem tables are delimeted with empty lines
  const sections = data
    .replace(/\r\n|\r/, '\n') // normalize line-endings
    .split(/\n(\s+)?\n/)      // split on empty lines
    .filter(section => {      // remove empty lines from array
      // empty lines may include invisible characters
      // section has content if it contains word characters or commas
      const hasContent = string => /[\w,]/.test(string)
      return hasContent(section)
    })

  const [metaData, ...CSVTables] = sections
  return {metaData, CSVTables}
}

parseTandemData('Tandem Data 20191113-20200106.csv')
  .then(data => console.log(data))
