
let btn = document.getElementById('btn-upload-csv').addEventListener('click',()=>{
  Papa.parse(document.getElementById('upload-csv').files[0],{
    download:true,
    header:false,
    complete: function(results){
      main(results.data);

    }
  });
});

function main(initialData){
  removeHeader(initialData);
  let finaliData = composeFinaliData(initialData);
  console.log(finaliData);
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
  header = [...uniqueDates];
  header.splice(0, 0, "Name / Date");
  finalData.splice(0, 0, header);
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
  let numbers = [];
  for(let item of initialData){
    numbers.push(item[sequenceNumb]);
    
  }
  return ([...new Set(numbers)]);
}

function removeHeader(initialData){
  initialData.shift();
}
