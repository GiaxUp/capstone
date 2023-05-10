package com.rocket_cinema.service;

import com.rocket_cinema.convertor.ShowConvertor;
import com.rocket_cinema.model.*;
import com.rocket_cinema.repository.*;
import com.rocket_cinema.requestDto.ShowRequestDto;
import com.rocket_cinema.responseDto.ShowResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShowService {
	@Autowired
	MovieRepository movieRepository;
	@Autowired
	TheaterRepository theaterRepository;
	@Autowired
	ShowSeatRepository showSeatRepository;
	@Autowired
	ShowRepository showRepository;

	public String addShow(ShowRequestDto showRequestDto) {
// creating showEntity
		Show show = Show.builder().ShowDate(showRequestDto.getShowDate()).showTime(showRequestDto.getShowTime())
				.multiplier(showRequestDto.getMultiplier()).build();
		// getting movie by movie name
		Movie movie = movieRepository.findByMovieName(showRequestDto.getMovieName());
		// getting theater by theaterid
		Theater theater = theaterRepository.findById(showRequestDto.getTheaterId()).get();
		show.setMovie(movie);
		show.setTheater(theater);
		// setting show for movie and theater for bidirectional mapping
		movie.getShowList().add(show);
		theater.getShowList().add(show);

		// now creating showseats since show will determine showseats
		List<ShowSeat> showSeatList = createShowSeat(theater.getTheaterSeatList());

		show.setShowSeatList(showSeatList);
		// for each showseat we need to set the show to which it belongs
		for (ShowSeat showSeat : showSeatList) {
			showSeat.setShow(show);
		}

		theaterRepository.save(theater);// saving the upadted with showslist
		movieRepository.save(movie);
		// showRepository.save(show);// not saving since movie is parent and it is saved
		return "show added successfully";

	}

	public List<ShowSeat> createShowSeat(List<TheaterSeat> theaterSeatList) {
		List<ShowSeat> showSeatList = new ArrayList<>();
		for (int i = 0; i < theaterSeatList.size(); i++) {
			TheaterSeat theaterSeat = theaterSeatList.get(i);

			ShowSeat showSeat = ShowSeat.builder().seatNo(theaterSeat.getSeatNo()).seatType(theaterSeat.getSeatType())
					.build();

			// boolean booked = false;

			// showSeat.setBooked(booked);
			showSeatList.add(showSeat);

		}
		showSeatRepository.saveAll(showSeatList);
		return showSeatList;

	}

	public List<ShowResponseDto> getAllShowsForAMovie(int movieId) {
		Movie movie = movieRepository.findById(movieId).get();
		List<Show> showEntityList = movie.getShowList();
		List<ShowResponseDto> showResponseDtoList = ShowConvertor.convertEntityToDto(showEntityList);

		return showResponseDtoList;
	}
}
// here we can also check that show date > movie release date that can be checked which  have not done here
