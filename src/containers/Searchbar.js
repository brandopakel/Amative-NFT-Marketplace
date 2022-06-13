import React from "react";
import { useState } from "react";
import { BiLock, BiSearch } from "react-icons/bi";
import './Searchbar.css';
import { ethers } from "ethers";
import Amative from '../artifacts/contracts/Amative.sol/Amative.json';
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const amativecontractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const {ethereum} = window;

const SearchBar = () => {

    const [hasFocus, setFocus] = useState(false);
    const [nfts, setNfts] = useState([]);
    const [searchInput, setInput] = useState('');
    const [view, setView] = useState(false);
    const [resultsView, setResultsView] = useState(false);

    useEffect(() => {
        getNfts()
    },[])

    async function getNfts(){
        try{
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(amativecontractAddress, Amative.abi, signer);
            let data = await contract.getAllItems();
            
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
                    sold : i.sold,
                    name : meta.data.name
                }
                return item;
            })

            const result = await Promise.all(items);

            setNfts(result);
            console.log(result);
            return result;
        }catch(error){
            console.log(error);
        }
    }

    /*const loadOptions = async () => {
        try{
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(amativecontractAddress, Amative.abi, signer);
            let data = await contract.getAllItems();
            
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
                    sold : i.sold,
                    name : meta.data.name
                }
                return item;
            })

            const result = await Promise.all(items);

            setNfts(result);
            console.log(result);

        }catch(error){
            console.log(error);
        }
    }*/


    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    const FilterOptions = () => {
        if(searchInput){
        return(
        nfts.map((nft,i) => {
            if(nft.name.toLowerCase().includes(searchInput.toLowerCase())){
                return(
                    <div>
                    <Link class='' to={`/Nft/${nft.tokenId}`} state={{nft}}>
                        <div class='flex border-b bg-white hover:bg-red-500 max-h-8'>
                            <ul class=''>
                                <li class='flex flex-row mr-auto w-full' key={i}>
                                    <img class='flex origin-left ml-auto h-15 w-10 max-h-8' src={nft.image} alt=''/>
                                    <div class='flex ml-3 mt-1'>
                                        {nft.name}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Link>
                    </div>
                )
            }
        })
        )
        }
    }


    /*<input className='searchinput' type='search' placeholder='Search Collections, Items or Users...'
                                    aria-invalid='false' aria-controls='searchinput' aria-multiline='false' role='searchbox' onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={handleChange} value={searchInput}/>*/

        return(
            <div className='navbar_search_box'>
                        <div className='navbar_searchblock'>
                            <div className='navbar_searchlistbox' aria-expanded='false' aria-haspopup='listbox' aria-owns='searchinput' aria-controls='searchinput' 
                            height='80px,45px' role='combobox'>
                                <div style={{
                                    height: '45px',
                                    maxWidth: '768px',
                                    display: 'flex',
                                    
                                    cursor: 'text',
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    border: '1px solid rgb(229, 232, 235)',
                                    width: '100%',
                                    padding: '12px',
                                    boxShadow: hasFocus ? '0px 0px 5px 4px #888888' : 'none'
                                }} aria-expanded='false'>
                                    <div className='searchicon'>
                                        <BiSearch size='24' color='gray' value='search'/>
                                    </div>
                                    <input className="searchinput" type='search' placeholder='Search Collections, Items or Users...'
                                    aria-invalid='false' aria-controls='searchinput' aria-multiline='false' role='searchbox' onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={handleChange} value={searchInput}/>
                                </div>
                            </div>
                        </div>
                        <FilterOptions/>
            </div>
        );
};

export default SearchBar;