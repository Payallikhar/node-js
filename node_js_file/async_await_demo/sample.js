const fs = require('fs')
const superagent = require('superagent')

// TO DISABLE CERTIFICATE VALIDATION CHECK
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;


const readFileProm = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject('File Not Found');
            resolve(data)
        });
    });
}

const writeFileProm = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Can not write to file');
            resolve('success');
        })
    });
}

const getDogPics = async () => {

    try {

        const dog_breed = await readFileProm('./dog.txt');
        console.log(`dog breed ${dog_breed}`);

        const dog_pic = await superagent.get(`https://dog.ceo/api/breed/${dog_breed}/images/random`);

        await writeFileProm('./dog-img.txt', dog_pic);
    } catch (err) {
        console.log(`${err}`);
    };

    return "image generated"

}

(async () => {
    try {
        const x = await getDogPics();
        console.log(x);
    } catch (err) {
        return 'image ready';
    }
})();


