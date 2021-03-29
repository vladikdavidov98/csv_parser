
let btn = document.getElementById('btn-upload-csv').addEventListener('click',()=> {
    removeErrorMessage("no_file");
    try {
      Papa.parse(document.getElementById('upload-csv').files[0],{
        download:true,
        header:false,
        complete: function(results){
          main(results.data);
        }
      });
    } catch (e) {
      addErrorMessage("no_file");
    }
});

function main(initialData) {
  removeErrorMessage("error");
  try {
    removeHeader(initialData);
    let finaliData = composeFinaliData(initialData);
    composeCSV(finaliData);
  } catch (e) {
    addErrorMessage("error");
  }
}

function composeCSV(finaliData) {
  let csvContent = "data:text/csv;charset=utf-8," + finaliData.map(e => e.join(",")).join("\n");
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "converted_data.csv");
  document.body.appendChild(link);
  link.click(); 
}

function composeFinaliData(initialData){
  let uniqueNames = getUniqueValues(initialData,0);
  let uniqueDates = getUniqueValues(initialData,1);
  let finalData = [];
  for(let name of uniqueNames){
    let row = [];
    row.push(name);
    for(let date of uniqueDates){
      let index = uniqueDates.findIndex(i => i === date) + 1;
      let hours = getHours(initialData, name, date);
      row.splice(index, 0, hours);
    }
    finalData.push(row);
  }
  addHeader(finalData, uniqueDates);
  return finalData;
}

function addHeader(finalData, uniqueDates) {
  let header = [];
  let convertedDates = getConvertedDates(uniqueDates);
  header = [...convertedDates];
  header.splice(0, 0, "Name / Date");
  finalData.splice(0, 0, header);
}


function getConvertedDates(uniqueDates){
  let convertedDates = [];
  for(let date of uniqueDates) {
      convertedDates.push(new Date(date).toISOString().substring(0,10));
  }
  return convertedDates;
}

function getHours(initialData, name, date) {
  for(let row of initialData) {
    if(row[0] == name && row[1] == date) {
      return row[2];
    }
  }
  return 0;
}

function getUniqueValues (initialData,sequenceNumb){
  let items = [];
  for(let item of initialData){
    items.push(item[sequenceNumb]);
  }
  return ([...new Set(items)]);
}

function removeHeader(initialData){
  initialData.shift();
}

function removeErrorMessage(id) {
  document.getElementById(id).classList.add('hide');
}

function addErrorMessage(id) {
  document.getElementById(id).classList.remove('hide');
}