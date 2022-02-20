import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Layout = ( { setPosition, setSubmit, searchResults, setSearchResults } ) => {


   const [ enteredValue, setEnteredvalue ] = useState("");
   // const [ searchResults, setSearchResults ] = useState("");

   const onSubmitForm = (e) => {

      e.preventDefault();
      if(enteredValue){
         setSubmit(true);
         api(enteredValue)
      }
      
   }


   useEffect(()=>{
      setSubmit(false);
      ( async () => {
         const res = await axios.get('https://geolocation-db.com/json/');
         api(res.data.IPv4);
      })();
   }, [])

   async function api(ip){
      
      const data = await axios.get("https://geo.ipify.org/api/v1/", {
         params:{
            apiKey: 'at_POgsJyOItI1DQF68WTu4A9zROtWQw',
            ipAddress: ip
         }
      });
   
      setPosition([data.data.location.lat, data.data.location.lng]);
      setSearchResults(data.data);

   }


  return (
      <div className="content-container position-absolute w-100">

         <div className="app-title text-center">
            <h1 className="page-title white">IP Address Tracker</h1>
         </div>

         <div className="mx-3 mx-sm-0 form-container d-flex justify-content-center">
         
            <form className="d-flex align-item-center" onSubmit={ onSubmitForm }>
               <label className="d-none">Ip address or domain</label>
               <input 
                  className="ip-input" 
                  type="text" 
                  onChange={(e) => setEnteredvalue(e.target.value)} 
                  placeholder="Search for any IP address"
               />
               <button type="submit">
                  <img src="/images/icon-arrow.svg"/>
               </button>
            </form>

         </div>

         <div className="display-block mx-3 mx-xl-auto mt-4 mt-md-5">
            <div className="row">

               <div className="col-md-3">
                  <p className="title text-center text-md-start small-title mb-0 med-grey">IP ADDRESS</p>
                  <p className="search-result text-center text-md-start mb-4 dark-grey">{ searchResults ? searchResults.ip : "IP"}</p>
               </div>

               <div className="col-md-3">
                  <p className="title text-center text-md-start small-title mb-0 med-grey">LOCATION</p>
                  <p className="search-result text-center text-md-start mb-4 dark-grey">{ searchResults ? searchResults.location.city + "," + searchResults.location.country + "," + searchResults.location.postalCode : "location"}</p>
               </div>

               <div className="col-md-3">
                  <p className="title text-center text-md-start small-title mb-0 med-grey">TIMEZONE</p>
                  <p className="search-result text-center text-md-start mb-4 dark-grey">{ searchResults ? searchResults.location.timezone : "timezone" }</p>
               </div>

               <div className="col-md-3">
                  <p className="title text-center text-md-start small-title mb-0 med-grey">ISP</p>
                  <p className="search-result text-center text-md-start mb-0 dark-grey">{ searchResults ? searchResults.isp : "isp" }</p>
               </div>

            </div>
         </div>

      </div>
   );
};

export default Layout;
