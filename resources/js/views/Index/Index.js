import React from 'react'
import { inject, observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

const Index=(props)=> {
  const Navigate = useNavigate();
  props.AuthStore.getToken();
  console.log(JSON.parse(props.AuthStore.appState))  

  const logout =()=>{
    //removeToken metodunu cagır, login sayfasına gonder,  "cıkıs yapma"
    props.AuthStore.removeToken();
    Navigate('/login');
    console.log("tıklandı")
  }
  return (
    <div>
      burası index sayfası 
      <button onClick={logout}>
        cıkıs yap
      </button>
    </div>
  )
}

export default inject("AuthStore")(observer(Index));