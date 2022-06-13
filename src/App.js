import './App.css';
import Create from './components/Create';
import UserDashboard from './components/UserDashboard';
import { Route, Routes } from 'react-router';
//import NFTI from './components/Details';
import Details from './components/Details';
import Navbar from './containers/Navbar';
import Home from './containers/Home';
import Help from './containers/Help';
import Footer from './containers/Footer';

const {ethereum} = window;

//import detectEthereumProvider from '@metamask/detect-provider';

/*const provider = await detectEthereumProvider();

if(provider){
  console.log('Metamask is installed');
} else{
  console.log('Please install metamask');
}*/

/*async function getAccount(){
  const accounts = await ethereum.request({method : 'eth_requestAccounts'});
  const account = accounts[0];
  return account;
}*/


/*class App extends Component{
  constructor(){
    super();
    this.state = {
      account : []
    };
    this.getAccount = this.getAccount.bind(this);
  }

  async getAccount(){
    if(typeof window.ethereum !== 'undefined'){
      const accounts = await ethereum.request({method : 'eth_requestAccounts'});
      const account = accounts[0];
      this.setState({account : account});
    } else{
      console.log('Please install Web3 Connective Software');
    }
  }

  

  render(){
  return (
      <div className="App">
        <button onClick={this.getAccount}>Connect Ethereum</button>
        <h2>Accounts : {this.state.account}</h2>
        <Minter/>
      </div>
    );
  }
}

export default App;
*/

//connect wallet
//getcurrentwallet
//Wallet listener
//

/*async function connectWallet(){
  if(ethereum){
    try{
      const accounts = await ethereum.request({method : 'eth_requestAccounts'})
      return accounts[0]
    }catch(error){
      console.log(error);
    }
  } else{
    return(
      <div>
        <p>You must connect with a virtual Ethereum Wallet</p>
      </div>
    )
  }
}

async function getCurrentWallet(){
  if(ethereum){
    try{
      const accounts = await ethereum.request({method : 'eth_accounts'});
      if(accounts.length > 0){
        return accounts[0]
      } else{
        return "Connect to Metamask"
      }
    } catch(error){
      console.log(error)
    }
  } else{
    return(
      <div>
        <p>You must connect with a virtual Ethereum Wallet</p>
      </div>
    )
  }
}*/

/*async function walletListener(){
  if(ethereum){
      ethereum.on('accountsChanged', (accounts) => {
        if(accounts.length > 0){
          setAccount(accounts[0]);
        } else{
          return "Connect to Metamask"
        }
      })
  } else{
    return(
      <div>
        <p>You must connect with a virtual Ethereum Wallet</p>
      </div>
    )
  }
}*/

/*const handleAccountChange = (accounts) => {
    if(accounts.length == 0){
      console.log('Connect to Metamask')
    } else if(accounts[0] !== currentAccount){
      getCurrent(accounts[0])
    }
  }

  const connect = async() => {
    if(ethereum) {
      try{
        ethereum.request({method : 'eth_requestAccounts'})
        .then(handleAccountChange)
      } catch(error){
        console.log(error);
      }
    }
  }*/

  /*useEffect(() => {
    ethereum.on('accountsChanged', async () => {
      try{
        const accountsArray = await ethereum.request({method : 'eth_accounts'});
        if(ethereum.selectedAddress !== accountsArray[0]){
          setAccount(ethereum.selectedAddress);
        }
      }catch(error){
        console.log(error)
      }
    });
  })*/


  /*
  async function getCurrentWallet(){
    if(ethereum){
      try{
        const accounts = await ethereum.request({method : 'eth_accounts'});
        if(accounts.length > 0){
          return accounts[0]
        } else{
          return "Connect to Metamask"
        }
      } catch(error){
        console.log(error)
      }
    } else{
      return(
        <div>
          <p>You must connect with a virtual Ethereum Wallet</p>
        </div>
      )
    }
  }

  const walletListener = async() => {
    if(ethereum){
      ethereum.on('accountsChanged', (accounts) => {
        if(accounts.length > 0){
          setAccount(accounts[0]);
        } else{
          return "Connect to Metamask"
        }
      })
    } else{
      return(
        <div>
          <p>You must connect with a virtual Ethereum Wallet</p>
        </div>
      )
    }
  }

  useEffect(async() => {
    const address = await getCurrentWallet();
    setAccount(address);

    walletListener();
  }, []);
*/


/*
async function connect() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0];
    provider.on('accountsChanged', function (accounts) {
        account = accounts[0];
        console.log(address); // Print new address
    });

    const signer = provider.getSigner();

    const address = await signer.getAddress();

    console.log(address);
}
*/

const App = (props) => {
  /*const [account, setAccount] = useState("");

  useEffect(() => {
    connect()
  }, []);

  async function connectWallet(){
    if(ethereum){
      try{
        const accounts = await ethereum.request({method : 'eth_requestAccounts'})
        return accounts[0]
      }catch(error){
        console.log(error);
      }
    } else{
      return(
        <div>
          <p>You must connect with a virtual Ethereum Wallet</p>
        </div>
      )
    }
  }

  const connectWalletConnec = async() => {
    const walletResponse = await connectWallet();
    setAccount(walletResponse);
  }

  const connect = async () => {
    let provider = window.ethereum;

    if(typeof provider !== 'undefined'){
      provider
        .request({method : 'eth_requestAccounts'})
        .then((accounts) => {
          var selectedAccount = accounts[0];
          console.log(`Selected Account is ${selectedAccount}`)
        })
        .catch((err) => {
          console.log(err);
          return;
        });
        window.ethereum.on('accountsChanged', (accounts) => {
          var selectedAccount = accounts[0];
          console.log(`Selected Account changed to ${selectedAccount}`)
        });
    }
  }*/

  return(
    <div className='App scroll-smooth'>
        <Navbar/>
        <div className='background flex flex-col'>
        <Routes>
          <Route path='/' element={[<Home/>, <Help/>, <Footer/>]}/>
          <Route path='/Mint' element={<Create/>} />
          <Route path='/Dashboard/*' element={<UserDashboard/>}/>
          <Route path='/Nft/:id' element={<Details/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App;