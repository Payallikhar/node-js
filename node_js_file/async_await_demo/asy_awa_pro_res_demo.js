const fs = require('fs')
const superagent = require('superagent')

// TO DISABLE CERTIFICATE VALIDATION CHECK
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const readFileProm = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err,data) =>{
            if(err) reject('I could not find that file');
            resolve(data);
        });
    });
};

const writeFileProm = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data , (err) => {
            if(err) reject("Could not write file");
            resolve("success");
        });
    });
};


console.log('top level_1')

const getDogPics = async() => {
    console.log('inside async function');

    try{
    // following execution will wait at await to get the data
    const data = await readFileProm('./dog.txt')
    console.log(`Breed is ${data}`);

    console.log('inside level_2')

    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    console.log('inside level_3')

    await writeFileProm('./dog-img.txt', res.body.message);
    console.log('Text file written');

    } catch(err){
        throw err;
    }

    // async function need to return promise, always
    return 'image ready'
}

console.log('top level_4')

// following piece of code calls above async method which return promise
// and now promise will be in resolved state
getDogPics().
    then((x) => {
            console.log(x)
            console.log('inside level_5')
    }).catch((err) =>{
        console.log('in catch block', err);
    });

    console.log('top level_6')    