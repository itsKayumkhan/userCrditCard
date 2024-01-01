import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import '../assets/styles/style.css'

const Card = () => {
  const {id} = useParams();
  const [card,setCard] = useState();
  useEffect(()=>{
    const singleCard = async()=>{ 
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/card/${id}`);
        setCard(response.data);
      } catch (error) {
        console.error('Error fetching card:', error);
      }
    }
    singleCard();
  },[])
  return (
    <>
 <section>
  <div className="container w-1/2 h-72 ">
    <div className="card front-face ">
      <header className='h-[30%]'>
        <span className="logo text-white text-xl">
          <img src="../assets/img/logo.png" alt />
          <h5>Master Card</h5>
        </span>
        <img src="../assets/img/chip.png" alt className="chip" />
      </header>
      <div className="card-details h-[70%] flex items-start">
        <div className="name-number text-white text-xl">
          <h6>Card Number</h6>
          <h5 className="number">{card?.card}</h5>
          <h5 class="name">{card?.name}</h5>
        </div>
        <div className="valid-date text-white text-xl">
          <h6>Valid Thru</h6>
          <h5>{card?.expire}</h5>
        </div>
      </div>
    </div>
    <div className="card back-face">
      <h6>
        For customer service call +977 4343 4693 or email at
        mastercard@gmail.com
      </h6>
      <span className="magnetic-strip" />
      <div className="signature"><i>{card?.cvc}</i></div>
      <h5>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
        maiores sed doloremque nesciunt neque beatae voluptatibus doloribus.
        Libero et quis magni magnam nihil temporibus? Facere consectetur
        dolore reiciendis et veniam.
      </h5>
    </div>
  </div>
</section>


    
    </>
  )
}

export default Card
