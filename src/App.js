import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seriesList: [],
            seriesEpisodesList: []
        };
    }

    componentDidMount() {

        fetch('seriesList.json',{})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesList: seriesListDepuisFichier});
            })
            .then(fetch('seriesEpisodesList.json',{}))
            .then(response => response.json())
            .then(seriesEpisodesListDepuisFichier => {
                this.setState({seriesEpisodesList: seriesEpisodesListDepuisFichier});
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                alert("j'ai fait ce que j'ai pu");
            });

    }

    render() {
        // noinspection JSAnnotator
        return (
            <div>
                <input onChange={this.searchChange.bind(this)} placeholder={this.state.placeHolder}/>
                <p>{this.state.searchText}</p>
                <ul>
                    {this.state.seriesList.length ?
                        this.state.seriesList.map(item => <li key={item.id}>{item.seriesName}</li>)
                        : <li>Loading...</li>
                    }
                </ul>
            </div>
        )
    }

    searchChange(e){
        this.setState({searchText:e.target.value});
    }
}


export default App;
