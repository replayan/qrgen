import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Enter your URL",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url, { type: "png" });
    qr_svg.pipe(fs.createWriteStream("something.png"));

    fs.writeFile("something.txt", url, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered.");
    } else {
      console.error("An error occurred:", error);
    }
  });
