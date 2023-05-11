//package com.rocket_cinema.service;
//
//import com.rocket_cinema.convertor.TicketConvertor;
//import com.rocket_cinema.convertor.UserConvertor;
//import com.rocket_cinema.model.Ticket;
//import com.rocket_cinema.model.UserCinema;
//import com.rocket_cinema.repository.UserCinemaRepository;
//import com.rocket_cinema.requestDto.UserRequestDto;
//import com.rocket_cinema.responseDto.TicketResponseDto;
//import com.rocket_cinema.responseDto.UserResponseDto;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class UserCinemaService {
//	@Autowired
//	UserCinemaRepository userRepository;
//
//	public String addUser(UserRequestDto userRequestDto) {
//		UserCinema user = UserCinema.builder().username(userRequestDto.getUsername()).password(userRequestDto.getPassword()).build();
//		try {
//			userRepository.save(user);
//
//		} catch (Exception e) {
//			return "UserCinema couldn't be added!";
//		}
//		return "UserCinema added succesfully.";
//	}
//
//	public List<TicketResponseDto> getAllUserBookedTicketsInfo(int userId) {
//		UserCinema user = userRepository.findById(userId).get();
//		List<Ticket> userTickets = user.getTicketList();
//		List<TicketResponseDto> ticketResponseDtos = new ArrayList<>();
//
//		ticketResponseDtos = TicketConvertor.convertEntityToDto(userTickets);
//		return ticketResponseDtos;
//
//	}
//
//	public UserResponseDto getUserByUserame(String username) {
//		UserCinema user = userRepository.findUserByUsername(username);
//		UserResponseDto userResponseDto = UserConvertor.convertEntityToDto(user);
//		return userResponseDto;
//	}
//
//}