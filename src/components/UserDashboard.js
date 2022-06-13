import React from "react";
import { useState, useEffect, useParams } from "react";
//import Web3Modal from 'web3modal';
import { ethers } from "ethers";
import logo from './ethereum-eth-logo.svg';
import Amative from '../artifacts/contracts/Amative.sol/Amative.json';

import axios from "axios";
import { Link, Routes, Route, useNavigate, generatePath} from "react-router-dom";
import './UserDashboard.css';
//import NFTI from "./Details";


const amativecontractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const {ethereum} = window;

function UserDashboard(props){
    const[nfts, setNfts] = useState([]);
    const[account, setAccount] = useState();
    //const[id, setId] = useState();
    //const navigate = useNavigate();

    useEffect(() => {
        getNfts();
        connect();
    }, [])
    
    async function getNfts(){
        try{
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(amativecontractAddress, Amative.abi, signer);
            let data = await contract.getListedItemsByOwner();
            
            const items = await data.map( async i => {
                const tokenUri = await contract.tokenURI(i.tokenId);
                const meta = await axios.get(tokenUri);
                //console.log(meta.data.url);
                //console.log(i.tokenId.toNumber());
                let item = {
                    tokenId : i.tokenId.toNumber(),
                    seller : i.seller,
                    owner : i.owner,
                    image : meta.data.image,
                    tokenUri : tokenUri,
                    price : i.price.toNumber(),
                    sold : i.sold
                }
                return item;
            })

            const result = await Promise.all(items);

            console.log(result);

            setNfts(result);


        }catch(error){
            console.log(error);
        }
    }

    /*render={({match}) => (
        <NFTI
            nft={nfts.find((nft) => String(nft.tokenId) === match.params.tokenId)}
        />
    )}*/

    const connect = async () => {
        let provider = window.ethereum;
    
        if(typeof provider !== 'undefined'){
          provider
            .request({method : 'eth_requestAccounts'})
            .then((accounts) => {
              var selectedAccount = accounts[0];
              setAccount(selectedAccount);
              console.log(`Selected Account is ${selectedAccount}`)
            })
            .catch((err) => {
              console.log(err);
              return;
            });
            window.ethereum.on('accountsChanged', (accounts) => {
              var selectedAccount = accounts[0];
              setAccount(selectedAccount);
              console.log(`Selected Account changed to ${selectedAccount}`)
            });
        }
      }

      if(!nfts.length) 
      return (
        <div class='no_nft_border'>
            <h1 class='no_account_header'>Your Currently Connected Account : {account}</h1>
            <br></br>
            <h2 class='no_nft_status'>No NFTS Created nor Recently Listed</h2>
            <button class='no_nft_create'><a href='/Mint'>Click Here to Create</a></button>
        </div>
      )

    return(
        <div>
            <div>
                <br></br>
                <h2 class='font-bold'>User NFTs</h2>
                <br></br>
                <div class='font-bold'>
                    Current Connected Account : {account}
                </div>
                <br></br>
                <div class='pl-10 grid grid-cols-4 gap-4'>
                    {
                        nfts.map((nft, i) => {
                            return(
                            <div key={i}>
                                <div class='display min-w-72 max-w-72 m-auto'>
                                    <Link to={`/Nft/${nft.tokenId}`} state={{nft}}> 
                                    <img class='m-auto max-h-72 w-auto' src={nft.image} alt=''/> 
                                    <div class='price_display flex flex-row m-auto justify-center '>
                                        <img src={logo} alt='' class='eth_logo'/>
                                        {nft.price}
                                    </div>
                                    </Link>
                                </div>
                            </div>
                        )})
                    }
                </div>
                <br></br>
                <br></br>
            </div>
        </div>
    )
}

export default UserDashboard;