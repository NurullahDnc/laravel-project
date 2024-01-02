import React from 'react'
import { inject, observer } from 'mobx-react';
import Layout from '../../Components/Layout/Front.layout';

const Index = (props) => {
  console.log("merhaba yonlendirldi")
  // const Navigate = useNavigate();
  props.AuthStore.getToken();
  // console.log(JSON.parse(props.AuthStore.appState))

 
  return (
    <Layout>
      <div>
        burası index sayfası
      
      </div>
    </Layout>
  )
}

export default inject("AuthStore")(observer(Index));