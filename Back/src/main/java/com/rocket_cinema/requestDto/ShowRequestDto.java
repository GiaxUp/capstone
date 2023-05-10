package com.rocket_cinema.requestDto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
@Data
public class ShowRequestDto {
    private LocalDate showDate;
    private LocalTime showTime;
    private String movieName;
    private int theaterId;
    private double multiplier;
}