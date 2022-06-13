import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { BigNumber, ethers } from 'ethers';
import Amative from '../artifacts/contracts/Amative.sol/Amative.json';
import './Details.css';
import logo from './ethereum-eth-logo.svg';
const amativecontractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

const {ethereum} = window;

export default function Details(){
    const[price, setPrice] = useState();
    const[view, setView] = useState(false);
    const[sell, setSell] = useState(false);
    const[buy, setBuy] = useState(false);
    const[interest, setInterest] = useState(false);
    //const[nftPrice, setNftPrice] = useState();
    //const[id, setId] = useState(0);
    const location = useLocation();
    //let {id} = useParams();
    const item = location.state;
    let nft = item.nft;

    //let currentId = nft.tokenId;

    useEffect(() => {
      handleView()
    },[])

    const onClick = async () => {
      setView(!view);
    }

    const onInterest = async() => {
      setInterest(!interest);
    }
    

    const handleView = async () => {
      try{
        const provider = new ethers.providers.Web3Provider(ethereum);
        let accounts = await provider.send("eth_requestAccounts", []);
        let account = accounts[0];
        console.log(accounts[0]);
        console.log(nft.seller);
        //console.log(typeof(accounts[0]));
        var person = nft.seller.toString();
        person = person.toLowerCase();
        //console.log(person);
        //console.log(typeof person);
        console.log(window.ethereum?.selectedAddress)
        console.log(typeof window.ethereum?.selectedAddress);
        console.log(window.ethereum?.selectedAddress === nft.seller.toLowerCase());
        console.log(account.normalize() === person.normalize());
        if(account.normalize() === person.normalize()) {
          setSell(true);
        } else{
          setBuy(true);
        }
      }catch(error){
        console.log(error);
      }
    }

    const HandleList = () => {
      if(view){
        return(
          <div class='mt-2'>
            <input class='list_input' placeholder='Set Price' value={price} onChange={(e) => setPrice(e.target.value)} autoFocus/>
            <button class='list_button' onClick={List}>List</button>
          </div>
        )
      }
    }

    const HandleBuy = () => {
      if(interest){
        return(
          <div class='mt-2'>
            <input class='buy_input' placeholder='Input Price' value={price} onChange={(e) => setPrice(e.target.value)} autoFocus/>
            <button class='buy_list_button' onClick={Buy}>Buy</button>
          </div>
        )
      }
    }

    const SellButton = () => {
      if(sell){
        return(
          <button class='sell_button' onClick={onClick}>List for Sale</button>
        )
      }
    }

    const BuyButton = () => {
      if(buy){
        return(
          <button class='buy_button' onClick={onInterest}>Purchase Item</button>
        )
      }
    }

    async function List(){
      //setId(currentId);
      try{
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        let contract = new ethers.Contract(amativecontractAddress, Amative.abi, signer);

        let listingPrice = await contract.getListingPrice();
        listingPrice = ethers.utils.formatEther(listingPrice);
        listingPrice = listingPrice.toString();
        //console.log(listingPrice);
        const value = {value : ethers.utils.parseEther(listingPrice)};

        console.log(price);
        console.log(typeof price);
        let newprice = parseInt(price);
        console.log(typeof newprice);
        console.log(newprice);
        /*let priceFormatted = ethers.utils.formatEther(price);
        console.log(priceFormatted);
        priceFormatted = priceFormatted.toString();*/
        /*let newprice = ethers.utils.parseEther(price);
        console.log(newprice);
        newprice = newprice.toNumber();
        console.log(newprice);
        console.log(typeof newprice);*/

        let action = await contract.sellToken(nft.tokenId, newprice, value);
        await action.wait();
        let data = await contract.returnMarketItem(nft.tokenId);

        console.log(data);
        nft.price = data.price.toNumber();
        console.log(nft.price);
        let sum = data.price;
        sum = sum.toNumber();
        console.log(sum + ' ether');

      } catch(error){

        console.log(error);
      }
    }

    async function Buy(){
      console.log(typeof price);
      console.log(nft.owner);
      try{
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        let contract = new ethers.Contract(amativecontractAddress, Amative.abi, signer);
        //let amt = ethers.utils.parseEther(price);
        //console.log(typeof price);
        //let amount = ethers.utils.parseUnits(price, 'ether');
        //amount = amount.toNumber();
        //amount = ethers.utils.formatEther(amount);
        //console.log(amount);
        //amount = ethers.utils.parseUnits(amount);
        //console.log(amount);
        //const decimals = 18;
        //const trans_amount = price;
        //const amount = BigNumber.from(trans_amount).mul(BigNumber.from(10).pow(decimals));
        //let amount = 
        /*var decimals = 18;
        const sum = ethers.utils.parseUnits(price, 'ether');
        const amount = ethers.utils.formatUnits(sum, decimals);
        console.log(amount);*/
        /*let amount = ethers.utils.parseEther(price);
        console.log(amount);*/
        //let amount = price * 10**18;
        //console.log(amount);
        //amount = amount.toString();
        //console.log(typeof amount);
        //amount = ethers.utils.formatEther(amount);
        //amount = amount.toString();
        //console.log(listingPrice);
        //const value = {value : ethers.utils.parseEther(amount)};
        //const priceFormatted = ethers.utils.formatUnits(price, 18);
        let tx = await contract.sellItemAndTransferOwnership(nft.tokenId, {value : ethers.utils.parseUnits(price)});
        await tx.wait();
        console.log(nft.owner);

      }catch(error){
        console.log(error);
      }
    }

//{view ? <HandleList/> : null}
    return(
    <div class='flex flex-row justify-center pb-28'>
      <div class='div_class mt-10 m-auto'>
        {nft.seller}
        <img class='m-auto h-96' src={nft.image} alt=''/>
        <div class='price_display flex flex-row m-auto justify-center '>
            <img src={logo} alt='' class='eth_logo'/>
            {nft.price}
        </div>
        <SellButton class='sell_button'/>
        <BuyButton class='buy_button'/>
        <HandleList style={{display : view ? 'visible' : 'none'}}/>
        <HandleBuy style={{display : interest ? 'visible' : 'none'}}/>
      </div>
    </div>
    )
}