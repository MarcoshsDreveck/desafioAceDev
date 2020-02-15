const rp = require('request-promise');
const fs = require('fs');
const sha1 = require('sha1');
const { DOWNLOAD_URL, SEND_URL } = require('./token');

async function getDesafio () {
    try {
      return await rp({ uri: DOWNLOAD_URL, json: true });
    } catch (err) {
      console.log(err);
    }
};

function write (answer) {
    fs.writeFileSync('answer.json', JSON.stringify(answer));
}

function decryptMessage (message, numCasas) {
    var decrypted = "";

    var codigo = {
        a: 97,
        z: 122
    };

    for (let i = 0; i < message.length; i++) {
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
    return decrypted;
}

function encriptSHA1 (message) {
    return sha1(message);
}

async function sendDesafio () {
    return await rp({
        uri: SEND_URL,
        method: 'POST',
        formData: {
        answer: {
            value: fs.createReadStream('answer.json'),
            options: {
            filename: 'answer.json',
            contentType: 'multipart/form-data'
            }
        }
        }
    }).then(function (response){
        console.log(response);
    })
    .catch(function (response){
        console.log(response);
    });
}

async function desafio () {
    answer = await getDesafio();
    write(answer);
    answer.decifrado = decryptMessage(answer.cifrado.toLowerCase(), answer.numero_casas);
    write(answer);
    answer.resumo_criptografico = encriptSHA1(answer.decifrado);
    write(answer);
    var response = sendDesafio();
    console.log(response);
}

desafio();
