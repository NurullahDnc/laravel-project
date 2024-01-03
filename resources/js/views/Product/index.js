import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react';
import Layout from '../../Components/Layout/Front.layout';

const Index = (props) => {

  useEffect(() => {
    axios.get(`api/Product`, {
        headers: {
            Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
        }
    }).then((res) => {
       console.log(res);

    })
        .catch((err) => {
            console.log(err, "err")
            
        })
}, [])

  return (
    <Layout>
      <div>
        <button onClick={()=> props.history.push("/urunler/ekle")}>yeni urun ekle</button>
        burası ProductIndex


      </div>
    </Layout>
  )
}

export default inject("AuthStore")(observer(Index));