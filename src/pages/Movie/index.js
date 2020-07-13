import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaImdb, FaHome } from 'react-icons/fa';
import ReactPlayer from 'react-player/youtube';
import _ from 'lodash';
import api from '../../services/api';

import Container from '../../components/Container';

import {
  Loading,
  MovieStyle,
  VoteAverage,
  MovieGenre,
  Cast,
  ProductionCompany,
} from './styles';

export default class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
      trailer: {},
      loading: true,
      cast: {},
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const movieId = match.params.movie;
    this.setState({ loading: true });

    const [movie, videos, cast] = await Promise.all([
      api.get(`/movie/${movieId}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY_MY_MOVIES_DATABASE,
          language: 'pt-br',
        },
      }),
      api.get(`/movie/${movieId}/videos`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY_MY_MOVIES_DATABASE,
          language: 'pt-br',
        },
      }),
      api.get(`/movie/${movieId}/credits`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY_MY_MOVIES_DATABASE,
          language: 'pt-br',
        },
      }),
    ]);
    if (movie && movie.status === 200) {
      this.setState({ movie: movie.data });
    }

    if (videos && videos.status === 200) {
      const trailer = _.first(
        _.filter(
          videos.data.results,
          v => v.type === 'Trailer' && v.site === 'YouTube'
        )
      );
      this.setState({ trailer });
    }

    if (cast && cast.status === 200) {
      this.setState({ cast: cast.data.cast });
    }

    this.setState({
      loading: false,
    });
  }

  render() {
    const { movie, loading, trailer, cast } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <h1>
          <Link to="/">
            <FaHome size={32} color="#fff" />
          </Link>
          <a
            href={`https://www.imdb.com/title/${movie.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaImdb size={32} color="rgba(243,206,19)" />
          </a>
          {movie.title}
        </h1>
        <MovieStyle>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                'https://via.placeholder.com/300x500?text=%22no%20image%22';
            }}
            alt={movie.title}
          />
          <p>{movie.overview}</p>
          <VoteAverage vote={movie.vote_average}>
            <strong>nota:</strong>
            <p>{movie.vote_average}</p>
          </VoteAverage>

          <MovieGenre>
            {movie.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </MovieGenre>
          {(trailer && trailer.key && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer.key}`}
              width="100%"
            />
          )) ||
            null}
          <Cast>
            {cast.map(person => (
              <li key={person.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/100x150?text=%22no%20image%22';
                  }}
                  alt={person.name}
                />
                <span>{person.character}</span>
                <p>{person.name}</p>
              </li>
            ))}
          </Cast>
          <ProductionCompany>
            {movie.production_companies.map(production => (
              <li key={production.id}>
                <img
                  src={`${
                    production.logo_path
                      ? `https://image.tmdb.org/t/p/w500${production.logo_path}`
                      : `https://via.placeholder.com/300x150?text=${production.name}`
                  }`}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/300x150?text=%22no%20image%22';
                  }}
                  alt={production.name}
                />
              </li>
            ))}
          </ProductionCompany>
        </MovieStyle>
      </Container>
    );
  }
}

Movie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      movie: PropTypes.string,
    }),
  }).isRequired,
};
