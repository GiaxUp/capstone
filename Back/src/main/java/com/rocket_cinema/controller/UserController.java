package com.rocket_cinema.controller;

import com.rocket_cinema.auth.service.UserService;
import com.rocket_cinema.requestDto.UserRequestDto;
import com.rocket_cinema.responseDto.TicketResponseDto;
import com.rocket_cinema.responseDto.UserResponseDto;
// import com.rocket_cinema.service.UserCinemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserService userService;
	
	// Return all tickets booked by an user
	@GetMapping("/tickets")
	public List<TicketResponseDto> getAllTicketsBookedByUser(@RequestParam("id") Long userId) {
		return userService.getAllUserBookedTicketsInfo(userId);
	}
	
	// Find user by username
	@GetMapping("/getUser")
	public UserResponseDto findByName(@RequestParam("username") String username) {
		return userService.getUserByUserame(username);
	}
}
