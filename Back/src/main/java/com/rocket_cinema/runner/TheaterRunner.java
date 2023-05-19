package com.rocket_cinema.runner;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.rocket_cinema.model.Movie;
import com.rocket_cinema.model.Theater;
import com.rocket_cinema.repository.MovieRepository;
import com.rocket_cinema.repository.ShowRepository;
import com.rocket_cinema.repository.TheaterRepository;
import com.rocket_cinema.requestDto.ShowRequestDto;
import com.rocket_cinema.requestDto.TheaterRequestDto;
import com.rocket_cinema.service.ShowService;
import com.rocket_cinema.service.TheaterService;

@SpringBootApplication
public class TheaterRunner implements CommandLineRunner {

	@Autowired
	private TheaterService theaterService;
	@Autowired
	private ShowService showService;
	@Autowired
	private MovieRepository movieRepository;
	@Autowired
	private TheaterRepository theaterRepository;

	public static void main(String[] args) {
		SpringApplication.run(TheaterRunner.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Runner #2 running...");

	    if (theaterService.isTheaterTableEmpty()) {
	        createTheaters();
	    } else {
	        System.out.println("Theater table is not empty. Skipping theater creation.");
	    }

	    if (movieRepository.count() > 0) {
	        if (showService.isShowTableEmpty()) {
	            addShowsForAllTheaters();
	        } else {
	            System.out.println("Show table is not empty. Skipping show creation.");
	        }
	    } else {
	        System.out.println("Movie table is empty. Skipping show creation.");
	    }
	}

	private void createTheaters() {
		TheaterRequestDto theater1 = new TheaterRequestDto();
		theater1.setName("Cinema Stella");
		theater1.setCity("Roma");
		theater1.setAddress("Via Fasulla 123");

		TheaterRequestDto theater2 = new TheaterRequestDto();
		theater2.setName("Cinema Omega");
		theater2.setCity("Milano");
		theater2.setAddress("Via Colle 22");

		TheaterRequestDto theater3 = new TheaterRequestDto();
		theater3.setName("Cinema Alpha");
		theater3.setCity("Napoli");
		theater3.setAddress("Via Scudetto 3");

		TheaterRequestDto theater4 = new TheaterRequestDto();
		theater4.setName("Cinema Gamma");
		theater4.setCity("Pisa");
		theater4.setAddress("Via Paolino 13");

		// Creazione dei 4 cinema
		theaterService.createTheater(theater1);
		theaterService.createTheater(theater2);
		theaterService.createTheater(theater3);
		theaterService.createTheater(theater4);
	}

	public void addShowsForAllTheaters() {
		System.out.println("Generating Shows for all Theaters...");
		List<Movie> movies = movieRepository.findAll();
		List<Theater> theaters = theaterRepository.findAll();
		LocalDate currentDate = LocalDate.now();

		for (Theater theater : theaters) {
			int movieIndex = 0;
			for (int i = 0; i <= 3; i++) {
				LocalDate showDate = currentDate.plusDays(i);
				List<LocalTime> showTime = new ArrayList<LocalTime>();
				boolean isRunning = true;
				LocalTime baseTime = LocalTime.of(14, 30);
				while (isRunning) {
					if (showTime.size() != 4) {
						baseTime = baseTime.plusHours(2);
						showTime.add(baseTime);
					} else {
						isRunning = false;
					}
				}

				Movie movie = movies.get(movieIndex);
				movieIndex += 1;

				ShowRequestDto showRequestDto = new ShowRequestDto();
				showRequestDto.setShowDate(showDate);
				showRequestDto.setShowTime(showTime);
				showRequestDto.setMovieName(movie.getMovieName());
				showRequestDto.setTheaterId(theater.getId());
				showRequestDto.setMultiplier(1.0); // Set the appropriate multiplier value
				showService.addShow(showRequestDto);

			}

		}
		System.out.println("Added shows to database!");
	}
}