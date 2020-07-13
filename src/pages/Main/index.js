import React, { Component } from 'react';
import { FaInfo, FaFilm, FaSpinner, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      movies: [],
      loading: 0,
    };
  }

  async componentDidMount() {
    this.setState({ loading: 1 });
    const getFavoriteMovies = await api.get('/movie/popular', {
      params: {
        api_key: process.env.REACT_APP_API_KEY_MY_MOVIES_DATABASE,
        language: 'pt-br',
      },
    });
    if (getFavoriteMovies.status === 200) {
      this.setState({ movies: getFavoriteMovies.data.results });
    }
    this.setState({ loading: 0 });
  }

  handleInputChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { searchValue } = this.state;
    this.setState({ loading: 1 });
    const getFavoriteMovies = await api.get('/search/movie', {
      params: {
        api_key: process.env.REACT_APP_API_KEY_MY_MOVIES_DATABASE,
        language: 'pt-br',
        query: searchValue,
      },
    });
    if (getFavoriteMovies.status === 200) {
      this.setState({ movies: getFavoriteMovies.data.results });
    }
    this.setState({ loading: 0 });
  };

  render() {
    const { loading, movies, searchValue } = this.state;
    return (
      <Container>
        <h1>
          <FaFilm color="rgba(256, 0, 0, 0.9)" size="32" />
          Meus Filmes
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Buscar filme"
            value={searchValue}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaSearch color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {movies.map(movie => (
            <li key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://via.placeholder.com/300x500?text=%22no%20image%22';
                }}
                alt={movie.title}
              />
              <div>
                <span>
                  <h2>{(movie && movie.title) || ''}</h2>
                  <p>{(movie && movie.overview) || 'Filme sem descrição'}</p>
                </span>
                <Link to={`/movie/${movie.id}`}>
                  <FaInfo />
                  Mais Sobre
                </Link>
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
