const deleteEmptyParams = (data) => {
  for (let val in data){
    if (!data[val]) {
      delete data[val]
    }
  }
}

const unixHourToHuman = (unixHour) => unixHour? new Date( unixHour*1000).getHours() : ""
const unixDateToHuman = (unixHour) => unixHour? new Date( unixHour*1000).toLocaleDateString() : ""

export {deleteEmptyParams, unixHourToHuman, unixDateToHuman}