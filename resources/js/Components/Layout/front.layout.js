import axios from 'axios'
import { inject, observer } from 'mobx-react'
import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';

const Layout=(props)=> {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [isLoggedIn, setisLoggedIn] = useState(false);

    //getToken cagırıyor 
    props.AuthStore.getToken();

    //guvenlik islemleri ?
    useEffect(()=>{
        const token = (props.AuthStore.appState != null) ? props.AuthStore.appState.user.access_token : null;
        axios.post(`api/authenticate`, {},{
            headers:{
                Authorization: 'Bearer ' + token
            }   
        }).then((res)=>{
            if (!res.data.isLoggedIn) {
                history.push("/login")
            }
            setUser(res.data.user);
            setisLoggedIn(res.data.isLoggedIn);

        })
        .catch((err)=>{
            console.log(err, "err")
            // history.push("/login")
            console.log(props.AuthStore.appState.user);
        })
    },[])

    //cıkıs yapma
    const logout = () => {
        //removeToken metodunu cagır, login sayfasına gonder,  "cıkıs yapma"
        axios.post(`api/logout`, {},{
            headers:{
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token 
            }   
        }).then(res => console.log("Çıkış işlemi basarılı"))    
        
        .catch(res => console.log("Çıkış işlemi sırasında bir hata oluştu:"))

        props.AuthStore.removeToken();  
        history.push("/login");
      }
      
  return (
    <div>
        <button onClick={logout}>cıkıs yap</button>
        {props.children}
    </div>
  )
}

export default inject("AuthStore")(observer(Layout));