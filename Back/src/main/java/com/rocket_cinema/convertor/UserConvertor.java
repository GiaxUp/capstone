package com.rocket_cinema.convertor;

import com.rocket_cinema.model.Ticket;
import com.rocket_cinema.model.User;
import com.rocket_cinema.responseDto.UserResponseDto;

import java.util.ArrayList;
import java.util.List;

public class UserConvertor {

	public static UserResponseDto convertEntityToDto(User user) {

		List<Ticket> usersTickets = user.getTicketList();
		List<String> seats = new ArrayList<>();
		for (Ticket ticket : usersTickets) {
			String seatsofusers = ticket.getAllocatedSeats();
			seats.add(seatsofusers);
		}
		UserResponseDto userResponseDto = UserResponseDto.builder().username(user.getUsername())
				.password(user.getPassword()).seats(seats).build();
		return userResponseDto;

	}
}
