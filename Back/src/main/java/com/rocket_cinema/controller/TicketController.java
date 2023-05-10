package com.rocket_cinema.controller;

import com.rocket_cinema.requestDto.BookTicketRequestDto;
import com.rocket_cinema.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ticket")
public class TicketController {
	@Autowired
	TicketService ticketService;

	@PostMapping("/book")
	public String bookTicket(@RequestBody() BookTicketRequestDto bookTicketRequestDto) {
		try {
			return ticketService.bookTicket(bookTicketRequestDto);
		} catch (Exception e) {
			return "Requested seats are not available!";
		}
	}

	@PostMapping("/cancel")
	public int canTicket(@RequestParam("id") int ticketId) {
		return ticketService.cancelTicket(ticketId);
	}
}