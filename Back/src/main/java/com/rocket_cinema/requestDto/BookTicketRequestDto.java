package com.rocket_cinema.requestDto;

import lombok.Data;

import java.util.List;

@Data
public class BookTicketRequestDto {
	private List<String> requestedSeats;
	private List<String> requestedShowtime; // Non è string ma è da fixare
	private int showId;
	private Long userId;

}