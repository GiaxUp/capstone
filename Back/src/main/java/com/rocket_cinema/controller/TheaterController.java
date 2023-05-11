package com.rocket_cinema.controller;

import com.rocket_cinema.requestDto.TheaterRequestDto;
import com.rocket_cinema.responseDto.TheaterResponseDto;
import com.rocket_cinema.service.TheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/theater")
public class TheaterController {
	@Autowired
	TheaterService theaterService;

	// Add a new theater
	@PostMapping("/add")
	public String createTheater(@RequestBody() TheaterRequestDto theaterRequestDto) {
		return theaterService.createTheater(theaterRequestDto);
	}

	// Get a single theater by ID
	@GetMapping("/getTheater")
	public TheaterResponseDto getbyId(@RequestParam("id") int id) {
		return theaterService.getbyId(id);
	}
}
