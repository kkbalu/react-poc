
import React from 'react'

class PopupDetails extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.popupdata
        }
    }

    render(){
         
        console.log(this.props.popupdata);
        var columnNames = Object.keys(this.props.popupdata);
        this.setState({
            data: this.props.popupdata
          });
          var data =  this.state.data;
        return(
        
        <div > 
       {columnNames != 0?  
        
           <ul>
                  {columnNames.map(function (name) {
                    return <li><span class="label">{name}</span> {data[name]}</li>;
                  })}
                </ul>  : null }
              </div>       
   )

    };
}

export default PopupDetails