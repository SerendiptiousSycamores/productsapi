const fs = require('fs');
const { pipeline } = require('stream')
const csv = require('csv');

const readStream = fs.createReadStream('features.csv')
readStream.setEncoding('utf8')
const writeStream = fs.createWriteStream('cleanFeatures.csv')

const csvStream = csv.parse();

csvStream.on("data", function(row) {
  if(row.value === null || row.value === 'null') {
    delete row.value;
  }

  if(row.value === 'striaght') {
    row.value = 'straight';
  }

  writeStream.write(JSON.stringify(row));
})
.on("end", function(){
    console.log("done");
})
.on("error", function(error){
    console.log(error)
});
//pipe takes writeable and adds it to the readstream, transform_transform is a tool to edit streams, the only way
// takes data splits it in a chunks and sends it in random order. Computers have the same problem where they read faster than they can write, hence a pipe, it slows down the process. But the pipe is actually taking a readstream intp a writestream but the function takes a writeable as an input. Daniel does transform in between reading and writing, its private, its like transforming a read only chunk into a subclass that is our own transform function, as s ubclass it can be hoooked up to streams (tey dont want us to use transform we could break it but we eplicate it). Our subclass makes changes and pipe takes it and adds it to writestream. class replaces writeable below, 
readStream.pipe(csvStream)