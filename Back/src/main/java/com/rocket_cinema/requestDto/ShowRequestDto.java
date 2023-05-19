package com.rocket_cinema.requestDto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class ShowRequestDto {
	private LocalDate showDate;
	private List<LocalTime> showTime;
	private String movieName;
	private int theaterId;
	private double multiplier;
}