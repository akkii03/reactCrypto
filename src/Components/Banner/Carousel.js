import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {TrendingCoins} from '../../config/api'; 
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';



export function numberWithCommas(x) {
    // function is to add , after 3 digit
    // on currency price
    return x.toString().replace(/\B(?=(d{3})+(?!\d))/g,",");
}
export default function Carousel() {
    
const [items,setItem] = useState();

    const fetchTrendingCoins = async ()=>{
        const {data} = await axios.get(TrendingCoins());

        setItem(  data.map((coin)=>{
            let profit = coin.price_change_percentage_24h>=0;
            return(
                <Link to={`/coins/${coin.id}`} 
                    className='carouselItem'
                >
                    <img
                        alt={coin.name}
                        height="80"
                        src={coin?.image}
                        style={{marginBottom:10}}
                    />
                    <span style={{
                        fontSize:25,
                    }}>{coin?.symbol}
                        &nbsp;

                        <span style={{
                           color:profit>0?"rgb(14,203,129)":
                           "red",
                           fontWeight:500,
                        }} >
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                    </span>
                    <br></br>
                    <span style={{
                        fontSize:40,
                        fontWeight:600
                    }}>
                        
                        ₹{numberWithCommas(coin?.current_price.toFixed(2))}
                    </span>
                </Link>
            )
        }))
    }
    useEffect(()=>{
        fetchTrendingCoins();
    },[])

    const responsive = {
        0:{
            items:2,
        },
        512:{
            items:4
        }
    };


  return (
    <div style={{
        height:"50%",
        display:"flex",
        alignItems:"center",
    }}>
      
        <AliceCarousel
        mouseTracking 
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
        />
    </div>
  )
}
