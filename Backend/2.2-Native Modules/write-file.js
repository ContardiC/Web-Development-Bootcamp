const fs = require("fs");

fs.writeFile("messagetxt","Hello from NodeJS",(err)=>{
    if(err) throw err;
    console.log("the file has been saved!")
});