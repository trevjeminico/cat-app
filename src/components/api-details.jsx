import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class CatDetails extends Component {
    state = { 
        id:0
     }
     constructor(props, {match}){
         super(props, {match});
         this.state = {
                details:[],
                id:props.match.params.id
            };
     }
     componentDidMount(){
        axios.get(`https://api.thecatapi.com/v1/images/${this.state.id}`)
        .then(res => {
            this.setState({details: [res.data]});
        })
     }
     renderImage(){
        return (
           <div className="row">
               {this.state.details.map(({ url,breeds}, i) => {
                    return (
                        <div key={i} className="col">
                            { breeds.map(({id,name,origin,temperament,description},j) =>{
                                return (
                                    <div key={j}>
                                       <div className="card">
                                            <div className="card-header">
                                               <Link to={`/?breed=${id}`} className="btn btn-primary">Back</Link>
                                            </div>
                                            <img src={url} className="card-img-top" alt="..."/>
                                            <div className="card-body">
                                                <h5 className="card-title">Name: {name}</h5>
                                                <h5 className="card-title">Origin: {origin}</h5>
                                                <h5 className="card-title">Temperament:</h5>
                                                <p className="card-text">{temperament}</p>
                                                <h5 className="card-title">Description:</h5>
                                                <p className="card-text">{description}</p>
                                                
                                            </div>
                                        </div>    
                                    </div>    
                                )
                            })}
                        </div>
                    )
                })}
           </div>
           
        );
     }
    
    render() { 
        return ( 
            <div className="container">
                {this.renderImage()}
            </div>
         );
    }
}
 
export default CatDetails;