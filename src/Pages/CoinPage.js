import axios from 'axios';
import React, { useState } from 'react'
import useParams from 'react-router-dom';
import { SingleCoin } from '../config/api';

export default function Coinpage() {
  const {id} = useParams();// this helps to take data from url 
  // we take id because we pass id variable  in the url 
  const [coin,setCoin] = useState();

  const fetchCoin = async ()=>{
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
    console.log(coin);
  }
  return (
    <div>
      
    </div>
  )
}
