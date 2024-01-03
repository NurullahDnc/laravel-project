import React from 'react'
import { inject, observer } from 'mobx-react';
import Layout from '../../Components/Layout/Front.layout';

const Create = (props) => {
  return (
    <Layout>
      <div>
        burası Product create
      
      </div>
    </Layout>
  )
}

export default inject("AuthStore")(observer(Create));