import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
inquirer
  .prompt([{ message: "Type your url", name: "URL" }])
  .then((answers) => {
    const url = answers.URL;
    var qr_image = qr.image(url);
    qr_image.pipe(fs.createWriteStream("image.png"));
    fs.writeFile("user-input.txt",url,(err)=>{
        if(err) throw err;
        console.log("the file has been saved!")
    });

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
