import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import Carousel from './Carousel'




export default function Banner() {
  return (
    <div className='bannerBg'>
      <Container style={{

        height:400,
        display:"flex",
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around",
      }}>
        <div className='tagline'>
            <Typography variant='h2' style={{
                fontWeight:"bold",
                marginBottom:15,
                fontFamily:"Montserrat",
            }}>
                Crypto Verse
            </Typography>
            <Typography variant='subtitle2' style={{
                color:"darkgrey",
                textTransform:"capitalize",
                fontFamily:"Montserrat",
            }}>
                Get all the info 
                regarding your favorite crypto curreny 
                on crypto verse
            </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  )
}
