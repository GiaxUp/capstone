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

	@PostMapping("/add")
	public String addShow(@RequestBody() ShowRequestDto showRequestDto) {
		return showService.addShow(showRequestDto);

	}

	@GetMapping("get_all_shows")
	public List<ShowResponseDto> getAllShowsOfAMovie(@RequestParam("id") int movieId) {
		return showService.getAllShowsForAMovie(movieId);

	}
}
