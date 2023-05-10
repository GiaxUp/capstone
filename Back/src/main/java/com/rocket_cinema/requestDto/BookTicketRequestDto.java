package com.rocket_cinema.requestDto;

import lombok.Data;

import java.util.List;

@Data
public class BookTicketRequestDto {
    private List<String> requestedSeats;
    private int showId;

    private int userId;

}