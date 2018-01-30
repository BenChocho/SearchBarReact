import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            seriesList: [],
            seriesEpisodesList: [],
            input: ''
        };
    }

    searchChange(e) {
        this.setState({input: e.target.value});
    }

    componentDidMount() {
        fetch('seriesList.json',{})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesList: seriesListDepuisFichier});
            })
            .catch(function (error) {
                console.log(error);
            });

        fetch('seriesEpisodesList.json',{})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesEpisodesList: seriesListDepuisFichier});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.input} onChange={this.searchChange.bind(this)} />
                <div>
                    {this.state.input.length ?
                        this.state.seriesList.filter(
                        a => a.seriesName.toLowerCase().trim().indexOf(this.state.input) > -1)
                        .map(matchingSeries => <li key={matchingSeries.id}>{matchingSeries.seriesName}
                        <ol>
                        {this.state.seriesEpisodesList.filter(b => b.serie_id === matchingSeries.id)
                            .map(matchingEpisode => matchingEpisode.episodes_list
                                .filter(getEpisodeName => getEpisodeName.episodeName)
                                .map(matchingSerieEpisodesLists => <li>{matchingSerieEpisodesLists.episodeName}</li>)
                            )
                        }
                        </ol>
                        </li>)
                        : <p>Loading...</p>
                    }
                </div>
            </div>
        )
    }
}

export default App;