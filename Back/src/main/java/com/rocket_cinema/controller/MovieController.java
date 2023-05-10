package com.rocket_cinema.controller;

import com.rocket_cinema.requestDto.MovieRequestDto;
import com.rocket_cinema.responseDto.MovieResponseDto;
import com.rocket_cinema.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movie")
public class MovieController {
    @Autowired
    MovieService movieService;

    @PostMapping("/add")
    public String addMovie(@RequestBody() MovieRequestDto movieRequestDto) {
        return movieService.addMovie(movieRequestDto);
    }

    // get movie by name
    @GetMapping("/getMovie")
    public List<MovieResponseDto> getMovieByName(@RequestParam("name")String movieName)
    {
              return movieService.getMovieByName(movieName);
    }


    @GetMapping("/getTheaters")
    public List<String> getListOfTheaters(@RequestParam("movie") String movieName) {
        return movieService.getListOfTheatersForAMovie(movieName);


    }
}
