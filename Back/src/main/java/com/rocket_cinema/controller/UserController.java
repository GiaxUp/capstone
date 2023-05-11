package com.rocket_cinema.controller;

import com.rocket_cinema.requestDto.UserRequestDto;
import com.rocket_cinema.responseDto.TicketResponseDto;
import com.rocket_cinema.responseDto.UserResponseDto;
import com.rocket_cinema.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserService userService;

	// Add a new user
	@PostMapping("/add")
	public String addUser(@RequestBody() UserRequestDto userRequestDto) {
		String result = userService.addUser(userRequestDto);
		return result;
	}
	
	// Return all tickets booked by an user
	@GetMapping("/tickets")
	public List<TicketResponseDto> getAllTicketsBookedByUser(@RequestParam("id") int userId) {
		return userService.getAllUserBookedTicketsInfo(userId);
	}
	
	// Find user by name
	@GetMapping("/getUser")
	public UserResponseDto findByName(@RequestParam("name") String name) {
		return userService.getUserByName(name);
	}
}
