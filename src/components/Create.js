import React from "react";
import { useState } from "react";
//import Web3Modal from 'web3modal';
import { BigNumber, ethers } from "ethers";

import Amative from '../artifacts/contracts/Amative.sol/Amative.json';

import {pinFileToIPFS, pinJSONToIPFS, userPinList} from './pinata';

import axios from "axios";
import { formatEther } from "ethers/lib/utils";
import {BiImageAdd} from 'react-icons/bi';
import './Create.css';

const amativecontractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const {ethereum} = window;

export default function CreateItem(){
    const[CID, setCID] = useState('');
    const[fileImage, setImage] = useState(null);
    const[input, setInput] = useState({name: '', description:'', price:''});
    const[view, setView] = useState(false);

    async function convertImage(e){
        const file = e.target.files[0];
        const response = await pinFileToIPFS(file);
        console.log(response);
        setCID(`https://gateway.pinata.cloud/ipfs/${response}`);
        setView(true);
        //let img = await axios.get(`https://gateway.pinata.cloud/ipfs/${response}`);
        //setImage(img);
    }

    async function pinDataReturn(){
        const metadata = new Object();
        metadata.image = CID;
        metadata.name = input.name;
        metadata.description = input.description;
    
        const pinataResponse = await pinJSONToIPFS(metadata);
        const tokenURI = pinataResponse.url;
        console.log(tokenURI);
        return tokenURI
    }

    async function createNFT(){
        try{
            const cid = await pinDataReturn();
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            console.log(signer.getAddress());

            //const price = ethers.utils.parseUnits(input.price, 'ether');
            let contract = new ethers.Contract(amativecontractAddress, Amative.abi, signer);


            /*let listingPrice = await contract.getListingPrice();
            listingPrice = ethers.utils.formatEther(listingPrice);
            listingPrice = listingPrice.toString();
            console.log(listingPrice);

            const value = {value : ethers.utils.parseEther(listingPrice)};*/

            let tx = await contract.create(cid);
            await tx.wait()
            .then(() => {
                return(
                    <div class='flex flex-col justify-center place-items-center'>
                        <h1>
                            Successfully Created
                        </h1>
                        <button><a href='/Dashboard/*'>Check on it in Your Dashboard</a></button>
                    </div>
                )
            })
        } catch(error){
            console.log(error);
        }
    }

    return(
        <div>
            <div class='flex flex-col justify-center place-items-center'>
                <p class='text-black text-6xl pb-5 font-bold pt-10 tracking-tighter'>Create New Item</p>
                <span class='text-black font-bold'>Image, Video, Audio, or 3D Model</span>
                <span>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF</span>
                {CID && <img class='object-fit max-h-96 bg-blend-lighten border-2 border-white rounded-2xl' src={CID} alt=''/>}
                <label class='justify-center border-2 border-black w-2/5 cursor-pointer rounded-2xl shadow-black shadow-inner hover:shadow-2xl bg-white' style={{display : view ? 'none' : 'visible'}}>
                    <BiImageAdd class='z-40 mt-32 mb-32 align-middle m-auto justify-center' size={'100px'}/>
                    <input class='z-0 relative cursor-pointer py-0 px-44 opacity-0 justify-center border-transparent w-full md:place-items-center' type='file' name='Asset' accept="image/*,audio/*,video/*" onChange={convertImage} style={{display : view ? 'none' : 'visible'}}>
                    </input>
                </label>
                <input class='name py-2 px-3 mt-5 font-bold w-80 border-black rounded-lg placeholder-slate-800 outline-red-500 cursor' placeholder="Name" onChange={(e) => setInput({...input, name : e.target.value})}/>
                <textarea class='description mt-5 px-3 py-2 font-bold w-80 border-black rounded-lg placeholder-slate-800 outline-red-500' placeholder='Description' onChange={(e) => setInput({...input, description : e.target.value})}></textarea>
                <button class='submit hover:shadow-inner font-bold justify-center text-center w-[10%] mt-10 mb-20 bg-white cursor-pointer py-2 px-2 outline-none border-0 border-black' onClick={createNFT}>Mint and Create</button>
            </div>
        </div>
    )
}