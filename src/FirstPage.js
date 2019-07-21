import React,{Component} from 'react';
import './Table.css'

export default class FirstPage extends Component{
   render(){
     let details = this.props.location.state.data;
     return(
       <div>
       <table id="details">
       <tr><th>{details.first_name}</th></tr>

       {
       Object.entries(details).map(([k, v]) => (
         <tr key={k}>
         <td>{k}</td><td> {v}</td>

          </tr>
       ))
     }

       </table>
       </div>
     );
   }
}
