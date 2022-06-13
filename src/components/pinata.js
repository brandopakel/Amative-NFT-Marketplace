import axios from "axios";
import FormData from "form-data";
//require('dotenv').config();
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET_KEY;

export const pinJSONToIPFS = (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret
            }
        })
        .then((response) => {
            return{ 
                data : response.data.IpfsHash,
                url : "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
            }
        })
        .catch(function (error) {
             console.log(error);
             return error.message
        });
}


export const pinFileToIPFS = (file) => {
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

    const data = new FormData();
    data.append('file', file);

    return axios.post(url, data, {
        maxBodyLength : 'Infinity',
        headers : {
            'Content-Type' : `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: key,
            pinata_secret_api_key: secret
        }
    })
    .then((response) => {
        //console.log(response.data.IpfsHash);
        return response.data.IpfsHash
    })
    .catch((error) => {
        console.log(error)
    })
}

export const userPinList = (queryParams) => {
    let queryString = '?';
    if(queryParams.hashContains){
        queryString = queryString + `hashContains=${queryParams.hashContains}&`;
    }
    const url = `https://api.pinata.cloud/data/pinList${queryString}`;
    return axios.get(url, {
        headers : {
            pinata_api_key: key,
            pinata_secret_api_key: secret
        }
    })
    .then((response) => {
        return response.rows[0].metadata;
    })
    .catch((error) => {
        console.log(error);
    })
}