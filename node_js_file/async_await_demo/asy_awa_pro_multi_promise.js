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


const getDogPics = async() => {
    console.log('inside async function');

    try{
    // following execution will wait at await to get the data
    const data = await readFileProm('./dog.txt')
    console.log(`Breed is ${data}`);


    // say there are multiple calls. Now await will cause each call to wait, till promise is resolved
    // removing await , will return promise in pending state, which can be resolved latter
    // this will make code execution faster
    const prom_1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const prom_2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const prom_3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    // now resolve all promises at once
    const all_prom = await Promise.all([prom_1, prom_2 , prom_3]);

    // store message from each promise into a array

    const images = all_prom.map((e1) => e1.body.message);
    console.log(images.join('\n'));

    // join each element of array with new line character
    await writeFileProm('./dog-img.txt', images.join('\n'));
    console.log('Text file written');

    } catch(err){
        throw err;
    }

    // async function need to return promise, always
    return 'image ready'
}

// following piece of code calls above async method which return promise
// and to resolve promise , call it in async await fashion to avoid then
// but this function is anonymous and got no name
(async() => {
    try{
        const x = await getDogPics();
        console.log(x);
   }catch(err){
        console.log('in catch block', err);
   }
   return 'image ready';
})(); //-> call this function then and there only

