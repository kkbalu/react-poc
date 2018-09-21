import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import './Config/ReactotronConfig'
import registerServiceWorker from './registerServiceWorker'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

