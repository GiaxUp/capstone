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

	@PostMapping("/add")
	public String addUser(@RequestBody() UserRequestDto userRequestDto) {
		String result = userService.addUser(userRequestDto);
		return result;
	}

	@GetMapping("/tickets")
	public List<TicketResponseDto> getAllTicketsBookedByUser(@RequestParam("id") int userId) {
		return userService.getAllUserBookedTicketsInfo(userId);
	}

	@GetMapping("/get_user_by_name")
	public UserResponseDto findByName(@RequestParam("name") String name) {
		return userService.getUserByName(name);
	}
}
