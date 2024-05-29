const fsPromise = require("fs").promises;
// import * as fsPromise from 'node:fs/promises'

const path = require("path");

process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught exception: ${err} `);
  process.exit(1);
});


const filesOps = async() => {
  try {
    const data = await fsPromise.readFile(path.join(__dirname, 'files','lorem.txt'), {encoding: 'utf8'})
    const writtenData = await fsPromise.writeFile(path.join(__dirname, 'files', 'lorem.txt'), 'This is what I wrote 😁✔' )
    const appendData = await fsPromise.appendFile(path.join(__dirname, 'files', 'lorem.txt' ), "\n Iam the appended text 👌")
    const renameData = await fsPromise.rename(path.join(__dirname, 'files', 'lorem.txt' ), path.join(__dirname, 'files', 'loremRenamed.txt'));
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
filesOps()

