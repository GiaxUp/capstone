package com.rocket_cinema.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieResponseDto {

	private int duration;
	private Date releaseDate;
	private LocalDate ShowDate;
	private List<LocalTime> showTime;
	private double multiplier;
	private String theater;
	private String city;
	private String address;

}
