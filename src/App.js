import React, { Component } from 'react';
import GoogleApp from './GoogleApp'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      Apps: [],
      search: '',
      sort: '',
      genres: '',
      error: null
    }
  }

  setSearch (search){
    this.setState(
      {
        search
      }
    )
  }

  setSort (sort) {
    this.setState(
      {
        sort
      }
    )
  }

  setGenres (genres) {
    this.setState({
      genres
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const baseUrl = 'http://localhost:8000/apps'
    const params = []

    if ( this.state.search){
      params.push(`search=${this.state.search}`)
    }
    if ( this.state.sort){
      params.push(`sort=${this.state.sort}`)
    }
    if ( this.state.genres){
      params.push(`genres=${this.state.genres}`)
    }

    const query = params.join('&');
    const url = `${baseUrl}?${query}`

    fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error (res.statusText)
      }
      return res.json
    })
    .then( data => {
      this.setState({
          Apps: data,
          error: null
        })
    })
    .catch( err => {
      this.setState ( { 
        error: 'Sorry, could not get Apps at this time.'
      })
    })
  }

  render(){
    const googlePlay = this.state.Apps.map((play, i) => {
      return <GoogleApp {...play} key= {i} />
    })
    return (
    <main className="App">
      <h1>Let's Play!</h1>
      <div className='search_section'>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor='search'> Search: </label>
          <input 
          type='text'
          name='search'
          id='search'
          value={this.state.search}
          onChange={e => this.setSearch(e.target.value)}
          />
          <label htmlFor='sort'>Genres: </label>
          <select id='sort' name='sort' onChange={e => this.setSort(e.target.value)}>
            <option value=''>None</option>
            <option value='rating'>Rating</option>
            <option value='app'>App</option>
          </select>
          <label htmlFor='genres'>Genres: </label>
          <select id='genres' name='genres' onChange={e => this.setGenres(e.target.value)}>
            <option value=''>None</option>
            <option value='Action'>Action</option>
            <option value='Puzzle'>Puzzle</option>
            <option value='Strategy'>Strategy</option>
            <option value='Casual'>Casual</option>
            <option value='Arcade'>Arcade</option>
            <option value='Card'>Card</option>
          </select>
          <button type='submit'>Submit</button>
        </form>
        <div className='App_error'>{this.state.error}</div>
      </div>
      {googlePlay}
    </main>
  )
  }
}

export default App;
