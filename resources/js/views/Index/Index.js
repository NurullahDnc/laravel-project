import { inject, observer } from 'mobx-react'
import React from 'react'

const Index=(props)=> {
  props.AuthStore.getToken();
  console.log(JSON.parse(props.AuthStore.appState))  
  return (
    <div>
      burası index sayfası
    </div>
  )
}

export default inject("AuthStore")(observer(Index));