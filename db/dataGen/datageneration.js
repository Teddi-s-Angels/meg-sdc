var faker = require('faker');
const fs = require('fs');

const write = () => {
    
    let i = 10;
    let id = 1; 
    
    //question record 
    while (i > 0) {
        var question = {
            product_id: id,
            question_body: faker.lorem.sentence(),
            question_date: faker.date.recent(),
          asker_name: faker.name.findName(),
          helpfulness: faker.random.number({
              'min': 0,
              'max': 12
            }),
            reported: false,
        };
        
        const jsonString = JSON.stringify(question);
        fs.appendFile('./fakedata.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
        //console.log(jsonString)
        i--;
        id++;    
    }
}

write();


//answer record

// var answer = {
//     question_id: id,
//     answer_body: faker.lorem.sentence(),
//     answer_date: faker.date.recent(),
//     answerer_name: faker.name.findName(),
//     helpfulness: faker.random.number({
//         'min': 0,
//         'max': 12
//       }),
//     reported: false
// }
// function writeTenMillionUsers(writer, encoding, callback) {
//     let i = 10000000;
//     let id = 0;
//     function write() {
//       let ok = true;
//       do {
//         i -= 1;
//         id += 1;
//         const username = faker.internet.userName();
//         const avatar = faker.image.avatar();
//         const data = `${id},${username},${avatar}\n`;
//         if (i === 0) {
//           writer.write(data, encoding, callback);
//         } else {
//   // see if we should continue, or wait
//   // don't pass the callback, because we're not done yet.
//           ok = writer.write(data, encoding);
//         }
//       } while (i > 0 && ok);
//       if (i > 0) {
//   // had to stop early!
//   // write some more once it drains
//         writer.once('drain', write);
//       }
//     }
//   write()
//   }
