import './App.css';
import {Route,Routes} from 'react-router-dom';
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';

function App() {

  return (
    <div style={{
      backgroundColor:"#14161a",
      color:"White",
      minHeight:"100vh",
    }}>
    <Header/>
    <Routes>
          <Route path='/' exact element={<Homepage/>}/>
          <Route path='/coins/:id'element={<CoinPage/>}/>
    </Routes>
   </div>
  );
}

export default App;
