let btn = document.getElementById('btn-upload-csv').addEventListener('click',()=>{
  Papa.parse(document.getElementById('upload-csv').files[0],{
    download:true,
    header:false,
    complete: function(results){
      console.log(results);
      let i = 0;
      results.data.map((data,index)=>{
        if(i === 0){
          let table = document.getElementById("tbl-data");
          generateTableHead(table,data);
        }else{
          let table = document.getElementById("tbl-data");
          generateTableHead(table,data);
        }
        i++
      });
    }
  });
});

function generateTableHead(table,data){
  let thead = table.createTHead();
  let row = thead.insertRow();
  for(let key of data){
    let th=document.createElement('th');
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTableRows(table,data){
  let newRow = table.insertRow(-1);
  data.map((row,index)=>{
    let newCell = newRow.insertCell();
    let newText = document.createTextNode(row);
    newCell.appendChild(newText);
  })
}