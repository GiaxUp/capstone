package com.rocket_cinema.auth.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rocket_cinema.auth.entity.User;
import com.rocket_cinema.auth.repository.UserRepository;
import com.rocket_cinema.convertor.TicketConvertor;
import com.rocket_cinema.convertor.UserConvertor;
import com.rocket_cinema.model.Ticket;
import com.rocket_cinema.responseDto.TicketResponseDto;
import com.rocket_cinema.responseDto.UserResponseDto;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;

	public List<TicketResponseDto> getAllUserBookedTicketsInfo(Long userId) {
		User user = userRepository.findById(userId).get();
		List<Ticket> userTickets = user.getTicketList();
		List<TicketResponseDto> ticketResponseDtos = new ArrayList<>();

		ticketResponseDtos = TicketConvertor.convertEntityToDto(userTickets);
		return ticketResponseDtos;

	}

	public UserResponseDto getUserByUserame(String username) {
		User user = userRepository.findByUsername(username).get();
		UserResponseDto userResponseDto = UserConvertor.convertEntityToDto(user);
		return userResponseDto;
	}

}
