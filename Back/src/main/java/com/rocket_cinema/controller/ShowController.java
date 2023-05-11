package com.rocket_cinema.controller;

import com.rocket_cinema.requestDto.ShowRequestDto;
import com.rocket_cinema.responseDto.ShowResponseDto;
import com.rocket_cinema.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/show")
public class ShowController {
	@Autowired
	ShowService showService;
	
	// Add show
	@PostMapping("/add")
	public String addShow(@RequestBody() ShowRequestDto showRequestDto) {
		return showService.addShow(showRequestDto);

	}
	
	// Get all shows of a movie
	@GetMapping("getShows")
	public List<ShowResponseDto> getAllShowsOfAMovie(@RequestParam("id") int movieId) {
		return showService.getAllShowsForAMovie(movieId);

	}
}
