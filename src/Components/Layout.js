import React, { useState } from 'react';
import axios from 'axios';

const Layout = () => {

   const [ enteredValue, setEnteredvalue ] = useState("");
   const [ searchResults, setSearchResults ] = useState("");

   const onSubmitForm = async (e) => {
      e.preventDefault();
      
      const data = await axios.get("https://geo.ipify.org/api/v2/country", {
         params:{
            apiKey: 'at_POgsJyOItI1DQF68WTu4A9zROtWQw',
            ipAddress: enteredValue
         }
      });

      console.log(data);
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
                  <p className="search-result">125.50.21</p>
               </div>

               <div className="col-md-3">
                  <p className="title">IP ADDRESS</p>
                  <p className="search-result">125.50.21</p>
               </div>

               <div className="col-md-3">
                  <p className="title">IP ADDRESS</p>
                  <p className="search-result">125.50.21</p>
               </div>

               <div className="col-md-3">
                  <p className="title">IP ADDRESS</p>
                  <p className="search-result">125.50.21</p>
               </div>

            </div>
         </div>

      </div>
   );
};

export default Layout;
