import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class CatList extends Component {
    state = { 
        cats: [],
        breeds: [],
        current_page: 1,
        current_limit: 10,
        total_items: 0,
        search_id:""
    }
    
    constructor(props){
        super(props);
        const params = new URLSearchParams(props.location.search);
        if(params.has('breed')){
            this.getSearchCatList(params.get('breed'),10);
            this.pageHandler(params.get('breed'));
        }

    }
    componentDidMount(){
        axios.get('https://api.thecatapi.com/v1/breeds')
            .then(res => {
                const breeds = res.data;
                this.setState({ breeds });
            });
    };

    getSearchCatList(q,limit){
        
        axios.get('https://api.thecatapi.com/v1/images/search', { params:{  
            breed_id: q,
            page: 1,
            limit: limit 
        }})
        .then(res => {
            this.setState({cats: res.data});
            this.setState({search_id:q});
        })
    }

    HandleChange = (e) =>{
        const queryString = e.target.value;
        this.setState({search_id:queryString});
        if(e.target.value === "") {
            this.setState({cats: []});
            
        }else{
            this.setState({current_page: 1 });
            this.getSearchCatList(queryString,10);
            this.pageHandler(queryString);
        }
    };

    handleLoadMore = () =>{
        const {current_page,current_limit,search_id} = this.state;
        this.setState({current_page:  current_page + 1 });
        this.getSearchCatList(search_id,current_limit + 10);
    }


    RenderCatList(){
        return (
            <div className="col-md-3 col-sm-6 col-12">
                <div className="form-group">
                    <label forhtml="selectBreed">Breed: </label>
                    <select onChange={ this.HandleChange } id="selectBreed" className="form-control" value={this.state.search_id}>
                        <option value="">Select a Breed</option>
                        { this.state.breeds.map(breed => <option key={breed.id} value={breed.id}> {breed.name} </option>) }
                    </select>
                </div>    
            </div>
        );
    };

    RenderSelectedCatBreed(){
        if(this.state.cats.length === 0){
            return <h3>No Cats Available</h3>;
        }else{
            return (
                <div className="row row-cols-4">
                        { this.state.cats.map(cat => (
                            <div className="col" key={cat.id}>
                                <div className="card">
                                    <img src={cat.url} className="card-img-top grid-card-img" alt="..."/>
                                    <div className="card-body">
                                       <Link to={`/${cat.id}`} className="btn btn-primary">View</Link>
                                    </div>
                                </div>
                            </div>                     
                        ))}
                </div>     
            );
        }
              
    };

    pageHandler(q){
        axios.get('https://api.thecatapi.com/v1/images/search', { params:{  
            breed_id: q,
            page: 1,
            limit: 100 
        }})
        .then(res => {
            this.setState({total_items: res.data.length});
        })
    }

    renderLoadMore(){
        const { total_items, current_page } = this.state
        let total_page = 0;
        let limit = 10;
        if(total_items !== 0 && total_items > 10){
            total_page = Math.ceil(total_items/limit);
            console.log(current_page);
            if(current_page !== total_page){
                return (
                    <div>
                        <button onClick={this.handleLoadMore} className="btn btn-success">Load More</button>
                    </div>
                )
            }
        }
    }

    render() { 
        return (                     
                <div className="container">
                    <h1>Cat Browser</h1>
                    <div className="col-lg">
                        { this.RenderCatList() }
                        { this.RenderSelectedCatBreed() }
                        { this.renderLoadMore() }
                    </div>
                </div>
          );
    }

   
}




export default CatList;