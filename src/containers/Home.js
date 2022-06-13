import logo from '../brandmark-design.svg';
import ParticlesContainer from './ParticlesContainer';
import './Home.css';

const Home = () => {
    return(
        <div className='App-body'>
            <ParticlesContainer/>
            <div className='App-body-2'>
                <img src={logo} className="App-logo" alt="logo" />
                <span className='splash_text font-bold'>An NFT Marketplace</span>
            </div>
        </div>
    )
}

export default Home;