import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Layout = () => {


   const [ enteredValue, setEnteredvalue ] = useState("");
   const [ searchResults, setSearchResults ] = useState("");

   const onSubmitForm = (e) => {

      e.preventDefault();
      if(enteredValue){
         api(enteredValue)
      }
      
   }


   useEffect(()=>{
      // const getCurrentIP = async () => {
      //    const res = await axios.get('https://geolocation-db.com/json/');
      //    return res.data.IPv4;
      // }
      // console.log("Hello", getCurrentIP())
      // api(getCurrentIP())
      ( async () => {
         const res = await axios.get('https://geolocation-db.com/json/');
         console.log(res);
         api(res.data.IPv4);
         // console.log(res);
         // return res.data.IPv4;
         
      })();
   }, [])

   async function api(ip){
      console.log(ip)
      const data = await axios.get("https://geo.ipify.org/api/v1/", {
         params:{
            apiKey: 'at_POgsJyOItI1DQF68WTu4A9zROtWQw',
            ipAddress: ip
         }
      });
      console.log(data);
      setSearchResults(data.data);

   }


  return (
      <div className="content-container">

         <div className="app-title text-center">
            <h1>IP Address Tracker</h1>
         </div>

         <div className="form-container d-flex justify-content-center">

            <form className="d-flex align-item-center" onSubmit={ onSubmitForm }>
               <label className="d-none">Ip address or domain</label>
               <input className="ip-input" type="text" onChange={(e) => setEnteredvalue(e.target.value)} />
               <button type="submit">
                  <img src="/images/icon-arrow.svg"/>
               </button>
            </form>

         </div>

         <div className="display-block mt-5">
            <div className="row align-items-center">

               <div className="col-md-3">
                  <p className="title">IP ADDRESS</p>
                  <p className="search-result">{ searchResults ? searchResults.ip : "IP"}</p>
               </div>

               <div className="col-md-3">
                  <p className="title">LOCATION</p>
                  <p className="search-result">{ searchResults ? searchResults.location.city + "," + searchResults.location.country + "," + searchResults.location.postalCode : "location"}</p>
               </div>

               <div className="col-md-3">
                  <p className="title">TIMEZONE</p>
                  <p className="search-result">{ searchResults ? searchResults.location.timezone : "timezone" }</p>
               </div>

               <div className="col-md-3">
                  <p className="title">ISP</p>
                  <p className="search-result">{ searchResults ? searchResults.isp : "isp" }</p>
               </div>

            </div>
         </div>

      </div>
   );
};

export default Layout;
