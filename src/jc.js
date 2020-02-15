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

function decryptMessage (message, numCasas){
    console.log(message)

    var decrypted = "";

    var codigo = {
        a: 97,
        z: 122
    };

    for (let i = 0; i < message.length; i++){
        if(message[i].charCodeAt() >= codigo.a && message[i].charCodeAt() <= codigo.z){
            var charCode = message[i].charCodeAt() - numCasas;
            var newCharCode = charCode;

            if(charCode < codigo.a){
                var aux = codigo.a - charCode;
                newCharCode = codigo.z - aux + 1;
            }
            decrypted += String.fromCharCode(newCharCode);

        } else {
            decrypted += message[i];
        }
    }
    console.log("decriptado: " + decrypted);
    return decrypted;
}


async function teste () {
    answer = await getOrigin();
    write(answer);
    answer.decifrado = decryptMessage(answer.cifrado.toLowerCase(), answer.numero_casas);
    write(answer);
    
    console.log(answer);
}

teste();