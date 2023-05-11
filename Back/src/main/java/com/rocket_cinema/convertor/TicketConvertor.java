package com.rocket_cinema.convertor;

import com.rocket_cinema.model.Show;
import com.rocket_cinema.model.Ticket;
import com.rocket_cinema.responseDto.TicketResponseDto;

import java.util.ArrayList;
import java.util.List;

public class TicketConvertor {
	public static List<TicketResponseDto> convertEntityToDto(List<Ticket> tickets) {
		List<TicketResponseDto> ticketResponseDtos = new ArrayList<>();

		for (Ticket ticket : tickets) {
			Show show = ticket.getShow();
			TicketResponseDto ticketResponseDto = TicketResponseDto.builder().movieName(show.getMovie().getMovieName())
					.theaterName(show.getTheater().getName()).showTime(show.getShowTime())
					.seatNo(ticket.getAllocatedSeats()).ticketAmount(ticket.getAmount()).build();
			ticketResponseDtos.add(ticketResponseDto);

		}
		return ticketResponseDtos;
	}
}