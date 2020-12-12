const fs = require('fs')
const faker = require('faker')
const argv = require('yargs').argv

const lines = argv.lines || 1000000
const filename = argv.output || './my10.csv'
const stream = fs.createWriteStream(filename)

var id = 9000001;
const createPost = () => {
    const q_id = id;
    const temp_id = id;
    const text = faker.lorem.sentence();
    const date = faker.date.recent();
    const name = faker.name.findName();
    const help = faker.random.number({
        'min': 0,
        'max': 12
    });
    const report = false;
    id++;
    return `${q_id},${temp_id},${text},${date},${name},${help},${report}\n`
}


  const startWriting = (writeStream, encoding, done) => {
    let i = lines
    function writing(){
      let canWrite = true
      do {
        i--
        let post = createPost()
        //check if i === 0 so we would write and call `done`
        if(i === 0){
          // we are done so fire callback
          writeStream.write(post, encoding, done)
        }else{
          // we are not done so don't fire callback
          writeStream.write(post, encoding)
        }
        //else call write and continue looping
      } while(i > 0 && canWrite)
      if(i > 0 && !canWrite){
        //our buffer for stream filled and need to wait for drain
        // Write some more once it drains.
        writeStream.once('drain', writing);
      }
    }
    writing()
  }

  //write our `header` line before we invoke the loop
// stream.write(`question_id,product_id,question_body,question_date,asker_name,helpfulness,reported\n`, 'utf-8')
//invoke startWriting and pass callback
startWriting(stream, 'utf-8', () => {
  stream.end()
})