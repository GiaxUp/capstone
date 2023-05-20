package com.rocket_cinema.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowResponseDto {
	private int showID;
	private int theaterID;
	private LocalDate showDate;
	private List<LocalTime> showTime;
	private String movieName;
}
