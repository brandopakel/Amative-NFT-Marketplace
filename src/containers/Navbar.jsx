import './Navbar.css';
import React from 'react';
import {BiUserCircle,BiWalletAlt,BiMenu} from "react-icons/bi";
import {useState} from 'react';
import SearchBar from './Searchbar';
import { useEffect } from 'react';

const {ethereum} = window;

const NavbarRightItems = () => {
    return(
        <div className='rightblock_items'>
                <li>
                    <a href="/">Explore</a>
                </li>
                <li>
                    <a href='/'>Data</a>
                </li>
                <li>
                    <a href='/Mint'>Create</a>
                </li>
        </div>
    );
};



const NavbarPersonalItems = () => {
    const[userWallet, setWallet] = useState();
    useEffect(()=>{
        connect()
    },[])

    const connect = async () => {
        let provider = window.ethereum;
    
        if(typeof provider !== 'undefined'){
          provider
            .request({method : 'eth_requestAccounts'})
            .then((accounts) => {
              var selectedAccount = accounts[0];
              setWallet(selectedAccount);
              console.log(`Selected Account is ${selectedAccount}`)
            })
            .catch((err) => {
              console.log(err);
              return;
            });
            window.ethereum.on('accountsChanged', (accounts) => {
              var selectedAccount = accounts[0];
              setWallet(selectedAccount);
              console.log(`Selected Account changed to ${selectedAccount}`)
            });
        }
    }

      //BiWalletAlt
      /*<div className='personal_account'>
            <li className='personalnav'>
                <a href='/Login'>
                    <BiUserCircle size='32' title='Account' value='account_circle' className='usericon'/>
                </a>
            </li> 
        </div>*/
        /*<li className='walletaccount'>
                <button className='walletbutton' type='button'>
                    <BiWalletAlt size='32' className='userwallet' title='Wallet' value='account_user_wallet'/>
                </button>
            </li>

        /*<li>
                    <a href='/Dashboard'>User Dashboard</a>
                </li>*/
   return(   
    <div className='personal_items'>
            <li className='personalnav'>
                <a href='/Dashboard'>
                    <BiUserCircle size='32' title='Account' value='account_circle' className='usericon mr-5'/>
                </a>
            </li> 
    </div>
    );
};


const Navbar = () => {
    return(
        <div className='app_navbar'>
                <nav className='navbar_main'>
                    
                    <div className='navbar_left'>
                        <a className='navbar_logo' href='/'>
                            <svg className='navbar_brandname'
                            xmlnsdc="http://purl.org/dc/elements/1.1/"
                            xmlnscc="http://creativecommons.org/ns#"
                            xmlnsrdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                            xmlnssvg="http://www.w3.org/2000/svg"
                            xmlns="http://www.w3.org/2000/svg"
                            id="svg4"
                            xmlSpace="preserve"
                            viewBox="0 0 1024 768"
                            y="0px"
                            x="0px"
                            version="1.1"><defs
                            id="defs8" /><path
                            id="path2"
                            d="m556.73 340.09c-1.8144 0-3.2668 0.60472-4.3555 1.6934-1.2096 1.2096-1.6934 2.6601-1.6934 4.3535v57.699c0 4.4755 0.84589 8.4668 2.7812 11.975 1.8144 3.6288 4.3552 6.4105 7.6211 8.4668s6.895 3.0234 10.887 3.0234h2.1777c2.0563 0 3.7495-0.48376 5.0801-1.6934 1.3306-1.0886 2.0566-2.5391 2.0566-4.3535 0-1.6934-0.60458-3.1459-1.5723-4.3555-0.96768-1.0886-2.1774-1.6934-3.6289-1.6934h-4.1133c-2.6611 0-4.8378-1.0883-6.5312-3.2656-1.8144-2.1773-2.6621-4.8376-2.6621-8.1035v-29.877h10.281c1.6934 0 3.0246-0.48349 4.1133-1.4512 0.96768-0.96768 1.5723-2.1774 1.5723-3.6289 0-1.5725-0.60459-2.9034-1.5723-3.8711-1.0886-0.96768-2.4198-1.4512-4.1133-1.4512h-10.281v-17.42c0-1.6934-0.60472-3.1439-1.6934-4.3535-1.2096-1.0886-2.6601-1.6934-4.3535-1.6934zm-208.25 20.441c-1.5725 0-3.0227 0.60472-4.1113 1.6934-1.2096 1.2096-1.6934 2.5408-1.6934 4.1133v54.916c0 1.8144 0.48376 3.265 1.6934 4.4746s2.6602 1.6934 4.4746 1.6934 3.267-0.48376 4.4766-1.6934c1.0886-1.2096 1.6934-2.6602 1.6934-4.4746v-34.111c0-4.4755 1.3291-8.103 3.9902-11.127 2.6611-2.903 6.1689-4.3555 10.523-4.3555 4.1126 0 7.3796 1.3309 9.7988 3.8711s3.75 6.2886 3.75 11.127v34.596c0 1.8144 0.48376 3.265 1.6934 4.4746s2.6602 1.6934 4.4746 1.6934 3.267-0.48376 4.4766-1.6934c1.0886-1.2096 1.6934-2.6602 1.6934-4.4746v-34.111c0-4.4755 1.3291-8.103 3.9902-11.127 2.6611-2.903 6.1707-4.3555 10.404-4.3555 4.1126 0 7.3777 1.3309 9.7969 3.8711s3.75 6.2886 3.75 11.127v34.596c0 1.8144 0.48376 3.265 1.6934 4.4746s2.6602 1.6934 4.4746 1.6934 3.267-0.48376 4.4766-1.6934c1.0886-1.2096 1.6934-2.6602 1.6934-4.4746v-34.596c0-8.2253-2.1767-14.636-6.5312-19.232-4.3546-4.5965-10.041-6.8945-16.936-6.8945h-40.279zm-62.59 0.1211c-6.2899 0-11.974 1.5735-17.055 4.4766-5.0803 2.903-9.0735 7.0154-11.977 12.096-2.903 5.0803-4.3535 10.765-4.3535 17.055 0 6.2899 1.3311 12.095 3.9922 17.176 2.6611 5.0803 6.4095 9.0735 11.127 11.977 4.8384 3.024 10.04 4.4746 15.846 4.4746h29.877c1.5725 0 2.9037-0.60472 4.1133-1.6934 1.0886-1.0886 1.6934-2.4198 1.6934-4.1133v-27.821c0-6.169-1.5716-11.974-4.4746-17.055-2.903-5.0803-6.8962-9.1927-11.977-12.096-5.0803-2.903-10.644-4.4766-16.812-4.4766zm205.22 0c-6.2899 0-11.974 1.5735-17.055 4.4766-5.0803 2.903-9.0735 7.0154-11.977 12.096-2.903 5.0803-4.3535 10.765-4.3535 17.055 0 6.2899 1.3311 12.095 3.9922 17.176 2.6611 5.0803 6.4095 9.0735 11.127 11.977 4.8384 3.024 10.04 4.4746 15.846 4.4746h29.877c1.5725 0 2.9037-0.60472 4.1133-1.6934 1.0886-1.0886 1.6934-2.4198 1.6934-4.1133v-27.821c0-6.169-1.5716-11.974-4.4746-17.055-2.903-5.0803-6.8962-9.1927-11.977-12.096-5.0803-2.903-10.644-4.4766-16.812-4.4766zm250.25 0c-6.2899 0-11.974 1.4524-16.934 4.3555-4.9594 2.903-8.8312 6.8943-11.613 11.975-2.7821 5.0803-4.1113 10.886-4.1113 17.297 0 6.5318 1.4505 12.217 4.3535 17.297 2.903 5.0803 7.0156 9.0735 12.338 11.977 5.2013 2.903 11.128 4.2324 17.781 4.2324 3.6288 0 7.5006-0.60512 11.613-2.0566 4.1126-1.3306 7.4992-3.145 10.281-5.3223 1.2096-0.96768 1.9356-2.1774 1.9356-3.6289s-0.72621-2.9017-2.1777-4.1113c-0.96768-0.72576-2.1774-1.2109-3.6289-1.2109-1.5725 0-2.9036 0.48531-3.9922 1.332-1.6934 1.3306-3.8701 2.4189-6.5312 3.2656-2.6611 0.96768-5.0808 1.3301-7.5 1.3301-6.169 0-11.37-1.6933-15.604-5.2012-4.2336-3.3869-6.7744-7.9828-7.6211-13.668h45.965c1.5725 0 2.9036-0.48349 3.9922-1.4512 0.96768-0.96768 1.5723-2.2986 1.5723-3.8711 0-6.2899-1.2097-11.976-3.6289-16.936-2.4192-4.8384-5.9268-8.7082-10.402-11.49-4.5965-2.6611-9.9189-4.1133-16.088-4.1133zm-132.62 0.48437c-1.8144 0-3.267 0.60472-4.4766 1.6934-1.2096 1.2096-1.6934 2.6602-1.6934 4.4746v53.828c0 1.8144 0.48376 3.265 1.6934 4.4746s2.6622 1.6934 4.4766 1.6934 3.265-0.48377 4.4746-1.6934c1.0886-1.2096 1.6934-2.6602 1.6934-4.4746v-53.828c0-1.8144-0.60472-3.265-1.6934-4.4746-1.2096-1.0886-2.6602-1.6934-4.4746-1.6934zm30.65 0.24219c-0.96768 0-1.8133 0.24063-2.5391 0.60352-2.2982 1.2096-3.3867 2.7836-3.3867 4.9609 0 0.84672 0.11954 1.571 0.48242 2.1758l25.645 54.07c0.72576 1.4515 1.4503 2.5397 2.418 3.1445 0.84672 0.6048 1.9352 0.84765 3.3867 0.84765 2.4192 0 4.3548-1.3311 5.5644-3.9922l25.645-54.07c0.36288-0.72576 0.60352-1.5711 0.60352-2.2969 0-0.96768-0.36187-1.9365-0.84571-2.7832-0.6048-0.84672-1.4522-1.5728-2.4199-2.0566-0.84672-0.36289-1.8136-0.60352-2.7812-0.60352-1.0886 0-2.0558 0.36186-3.0234 0.8457-0.96768 0.48384-1.5728 1.2101-2.0566 2.1777l-20.807 45.359-21.047-45.359c-0.48384-0.96768-1.208-1.6939-2.0547-2.1777-0.96768-0.48384-1.8155-0.8457-2.7832-0.8457zm101.96 9.6758c5.3222 0 9.5565 1.6949 12.943 4.8398 3.2659 3.2659 5.3211 7.6192 6.0469 12.941h-40.279c0.96768-5.3222 3.2657-9.6755 6.8945-12.941 3.6288-3.145 8.4675-4.8398 14.395-4.8398zm-455.47 0.48438c3.9917 0 7.6208 1.0881 10.887 3.0234 3.2659 1.9354 5.8049 4.7186 7.7402 8.1055 1.8144 3.5078 2.7832 7.3777 2.7832 11.611 0 4.3546-0.9688 8.2264-2.7832 11.613-1.9354 3.3869-4.4743 6.1682-7.7402 8.1035-3.2659 1.9354-6.895 2.9023-10.887 2.9023-4.1126 0-7.7419-0.96698-11.008-2.9023-3.2659-1.9354-5.8049-4.7166-7.7402-8.1035-1.9354-3.3869-2.7832-7.2587-2.7832-11.613 0-4.2336 0.84785-8.1035 2.7832-11.611 1.9354-3.3869 4.4743-6.1701 7.7402-8.1055s6.8952-3.0234 11.008-3.0234zm205.22 0c3.9917 0 7.6208 1.0881 10.887 3.0234 3.2659 1.9354 5.8049 4.7186 7.7402 8.1055 1.8144 3.5078 2.7832 7.3777 2.7832 11.611 0 4.3546-0.96881 8.2264-2.7832 11.613-1.9354 3.3869-4.4743 6.1682-7.7402 8.1035-3.2659 1.9354-6.895 2.9023-10.887 2.9023-4.1126 0-7.7419-0.96698-11.008-2.9023-3.2659-1.9354-5.8049-4.7166-7.7402-8.1035-1.9354-3.3869-2.7832-7.2587-2.7832-11.613 0-4.2336 0.84784-8.1035 2.7832-11.611 1.9354-3.3869 4.4743-6.1701 7.7402-8.1055s6.8952-3.0234 11.008-3.0234z"
                            fill="#ffffff"/>
                            </svg>
                        </a>
                    </div>

                    <SearchBar/>

                    <ul className='navbar_items'>
                        <NavbarRightItems/>
                        <NavbarPersonalItems/>
                    </ul>

                </nav>
        </div>
    );
}

export default Navbar;