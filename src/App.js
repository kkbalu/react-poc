import React, { Component } from 'react'
import { Provider } from 'react-redux'
import './Config'
import DebugConfig from './Config/DebugConfig'
import createStore from './Redux'
import './App.css'
import MoviesGrid from './Containers/Grid'
import Tree from './Containers/Tree'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



// create our store
const store = createStore()

const App = () => {
  return (
    // <Provider store={store}>
    //   <div className="App">
    //     <header className="App-header">
    //       <h3 className="App-title">Defect list</h3>
        
    //     </header>
    //     <MoviesGrid />
    //   </div> 
    //   <Routes /> 
    // </Provider>
    <Router>
      <Provider store={store}>
      
      <div className="App">
    <div className="nav">
        
       <ul>
          <li><Link to={'/Tree'}>Tree</Link></li>
          <li><Link to={'/Grid'}>Grid</Link></li>
       </ul>
       <hr />
       </div>
       <Switch>
          <Route exact path='/Grid' component={MoviesGrid} />
          <Route exact path='/Tree' component={Tree} />
       </Switch>
    
    </div>
    </Provider>
 </Router>

  )
}

// allow reactotron overlay for fast design in dev mode
export default (DebugConfig.useReactotron ? console.tron.overlay(App) : App)
