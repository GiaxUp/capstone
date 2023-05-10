package com.rocket_cinema.service;

import com.rocket_cinema.convertor.MovieConvertor;
import com.rocket_cinema.model.Movie;
import com.rocket_cinema.model.Show;
import com.rocket_cinema.model.Theater;
import com.rocket_cinema.repository.MovieRepository;
import com.rocket_cinema.requestDto.MovieRequestDto;
import com.rocket_cinema.responseDto.MovieResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MovieService {
	@Autowired
	MovieRepository movieRepository;

	public String addMovie(MovieRequestDto movieRequestDto) {
		Movie movie = Movie.builder().movieName(movieRequestDto.getMovieName()).duration(movieRequestDto.getDuration())
				.releaseDate(movieRequestDto.getReleaseDate()).build();
		movieRepository.save(movie);
		return "Movie added successfully!";
	}

	public List<String> getListOfTheatersForAMovie(String movieName) {
		Movie movie = movieRepository.findByMovieName(movieName);
		List<Show> showEntityList = movie.getShowList();
		List<String> theaterList = new ArrayList<>();
		for (Show show : showEntityList) {
			Theater theater = show.getTheater();
			String theaterName = theater.getName();
			theaterList.add(theaterName);
		}
		return theaterList;

	}

	public List<MovieResponseDto> getMovieByName(String movieName) {
		Movie movie = movieRepository.findByMovieName(movieName);
		List<MovieResponseDto> movieResponseDtoList = MovieConvertor.convertEntityToDto(movie);

		return movieResponseDtoList;
	}
}
