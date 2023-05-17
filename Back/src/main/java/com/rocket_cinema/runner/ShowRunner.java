package com.rocket_cinema.runner;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Random;

import com.rocket_cinema.model.Movie;
import com.rocket_cinema.model.Theater;
import com.rocket_cinema.repository.MovieRepository;
import com.rocket_cinema.repository.TheaterRepository;
import com.rocket_cinema.requestDto.ShowRequestDto;
import com.rocket_cinema.service.ShowService;

// *** DA FIXARE TUTTO NON FUNZIONA AL MOMENTO ***

public class ShowRunner {
    private ShowService showService;
    private MovieRepository movieRepository;
    private TheaterRepository theaterRepository;

    public ShowRunner(ShowService showService, MovieRepository movieRepository, TheaterRepository theaterRepository) {
        this.showService = showService;
        this.movieRepository = movieRepository;
        this.theaterRepository = theaterRepository;
    }

    public void addShowsForAllTheaters() {
        List<Movie> movies = movieRepository.findAll();
        List<Theater> theaters = theaterRepository.findAll();

        LocalDate currentDate = LocalDate.now();
        Random random = new Random();

        for (Theater theater : theaters) {
            for (int i = 0; i < 3; i++) {
                LocalDate showDate = currentDate.plusDays(random.nextInt(7));
                LocalTime showTime = LocalTime.of(21, 0).plusMinutes(i * 30); // 21:00, 21:30, 22:00

                int movieIndex = random.nextInt(movies.size());
                Movie movie = movies.get(movieIndex);

                ShowRequestDto showRequestDto = new ShowRequestDto();
                showRequestDto.setShowDate(showDate);
                showRequestDto.setShowTime(showTime);
                showRequestDto.setMovieName(movie.getMovieName());
                showRequestDto.setTheaterId(theater.getId());
                showRequestDto.setMultiplier(1.0); // Set the appropriate multiplier value

                showService.addShow(showRequestDto);
            }
        }
    }
}

