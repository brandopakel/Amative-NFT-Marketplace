import React from "react";
import {IoWalletSharp} from 'react-icons/io5';
import {FcGallery} from 'react-icons/fc';
import {FcCurrencyExchange} from 'react-icons/fc';
import './Help.css';

const Help = () => {
    return(
        <div>
            <h2 class='ml-5 justify-center text-4xl pt-12'>Create and Sell your NFTs</h2>
            <div class='flex flex-row justify-center pt-10 pb-32'>
                    <div class='flex flex-col justify-center'>
                        <IoWalletSharp class='m-auto' size={45}/>
                        <p class='pt-10 font-bold'>Set up your wallet</p>
                        <p class='mx-10 pt-1'>Once you’ve set up your wallet of choice, connect it to OpenSea by clicking through to your profile icon in the top right corner. Learn about the wallets we support.</p>
                    </div>
                    <div class='flex flex-col justify-center'>
                        <FcGallery class='m-auto' size={50}/>
                        <p class='pt-10 font-bold'>Add your NFTs</p>
                        <p class='mx-10 pt-1'>Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content.</p>
                    </div>
                    <div class='flex flex-col'>
                        <FcCurrencyExchange class='m-auto' size={50}/>
                        <p class='pt-10 font-bold'>List them for sale</p>
                        <p class='mx-10 pt-1'>Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!</p>
                    </div>
            </div>
        </div>
    )
}

export default Help;