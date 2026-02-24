//import { useState } from 'react'
import { Provider } from 'react-redux'
import Body from './components/Body.jsx'
import appstore from './utils/appstore.jsx'


function App() {
 // const [count, setCount] = useState(0)

  return (<>
  <Provider store ={appstore}>
    <Body/>
  </Provider>
     
    </>
  )
}

export default App
