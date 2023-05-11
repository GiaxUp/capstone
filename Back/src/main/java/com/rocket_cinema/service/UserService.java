package com.rocket_cinema.service;

import com.rocket_cinema.convertor.TicketConvertor;
import com.rocket_cinema.convertor.UserConvertor;
import com.rocket_cinema.model.Ticket;
import com.rocket_cinema.model.User;
import com.rocket_cinema.repository.UserRepository;
import com.rocket_cinema.requestDto.UserRequestDto;
import com.rocket_cinema.responseDto.TicketResponseDto;
import com.rocket_cinema.responseDto.UserResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;

	public String addUser(UserRequestDto userRequestDto) {
		User user = User.builder().username(userRequestDto.getUsername()).password(userRequestDto.getPassword()).build();
		try {
			userRepository.save(user);

		} catch (Exception e) {
			return "User couldn't be added!";
		}
		return "User added succesfully.";
	}

	public List<TicketResponseDto> getAllUserBookedTicketsInfo(int userId) {
		User user = userRepository.findById(userId).get();
		List<Ticket> userTickets = user.getTicketList();
		List<TicketResponseDto> ticketResponseDtos = new ArrayList<>();

		ticketResponseDtos = TicketConvertor.convertEntityToDto(userTickets);
		return ticketResponseDtos;

	}

	public UserResponseDto getUserByName(String username) {
		User user = userRepository.findUserByUsername(username);
		UserResponseDto userResponseDto = UserConvertor.convertEntityToDto(user);
		return userResponseDto;
	}

}