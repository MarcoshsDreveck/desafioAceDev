const rp = require('request-promise');
const fs = require('fs');
const sha1 = require('sha1');

const download = "https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=eb76c4693e64db332bc098e9bc9f6217150ffcf2";
const send = "https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=eb76c4693e64db332bc098e9bc9f6217150ffcf2";

async function getOrigin () {
    try {
      return await rp({ uri: download, json: true });
    } catch (err) {
      console.log(err);
    }
};

function write (answer){
    fs.writeFileSync('answer.json', JSON.stringify(answer));
}

function decrypMessage (message){

}

async function teste () {
    answer = await getOrigin();
    write(answer);
}

teste();