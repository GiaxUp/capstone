package com.rocket_cinema.convertor;

import com.rocket_cinema.model.Show;
import com.rocket_cinema.model.Theater;
import com.rocket_cinema.responseDto.TheaterResponseDto;

import java.util.ArrayList;
import java.util.List;

public class TheaterConvertor {
	public static TheaterResponseDto convertEntityTodto(Theater theater) {

		List<Show> showList = theater.getShowList();
		List<String> movies = new ArrayList<>();
		for (Show show : showList) {
			String movieName = show.getMovie().getMovieName();
			movies.add(movieName);
		}
		TheaterResponseDto theaterResponseDto = TheaterResponseDto.builder().name(theater.getName())
				.address(theater.getAddress()).city(theater.getCity()).movieName(movies).build();
		return theaterResponseDto;

	}
}
