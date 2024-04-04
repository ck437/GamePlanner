import React, { useState,useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from 'universal-cookie';
import {useAuth} from '../../Context/AuthContext';
import axios from 'axios';
export default function Individualcomps({onData}) {
   const [card,setcard]=useState();
   const [Activity,setActivity]=useState();
   const {user}=useAuth();
   const cookies=new Cookies();
   const handleBook= (card) => {
     setActivity(card);
     onData(card);
   }


  
   useEffect(() => { 
    const BookActivities = async() => {
      try {
          const params= {'email': user.email,"category": "Individual Sports"};
        console.log(user);
        const response = await axios.post(process.env.URL + `/api/activities`,params,{ headers: {
          'Authorization': 'Bearer '+cookies.get("jwt_authorization"),
          'Content-Type': 'application/json'
        }});
        if (response.data.success) {
          setActivity(response.data.data);
          console.log("********",Activity);
        }
        console.log(user);
      } catch (error) {
        console.error(error);
      } 
    };
   
      BookActivities();
    }, []);
       
    return (
      
       <>
       <div style={{height:'150px',width:'100vw',marginTop:'30px',marginBottom:'30px'}}>
                   <h2> Individual Sports</h2>
                   
       </div>
      <span style={{display:'flex',justifyContent:"space-between",flexWrap:"wrap",flexDirection:'row'}} >
                {Activity && Activity.map((card, index) => (
                  <div key={index} className="card" >
                  <img src={card.imglink} alt={card.name} style={{height:'250px',width:'370px'}} />
                  <h2 style={{fontFamily:'gloock',textAlign:'center'}}>{card.name} </h2>
                  <button  style={{textAlign:'center',marginTop:'0px',width:'200px',borderRadius:'25px',marginLeft:"25%",marginBottom:'20px'}} type="button" class="btn btn-dark" onClick={ () =>  handleBook(card) }>Book now</button>
                  </div>
                 
                  ))}

      </span>
      

       </>  
       );
     };
 

