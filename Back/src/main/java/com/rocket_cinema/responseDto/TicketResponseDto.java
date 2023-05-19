package com.rocket_cinema.responseDto;

import com.rocket_cinema.enums.SeatType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketResponseDto {
	private String movieName;
	private String theaterName;
	private LocalTime showTime;
	private String seatNo;
	private SeatType seatType;
	private int ticketAmount;
}
