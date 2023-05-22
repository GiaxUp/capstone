package com.rocket_cinema.controller;

import com.rocket_cinema.model.Ticket;
import com.rocket_cinema.requestDto.BookTicketRequestDto;
import com.rocket_cinema.service.TicketService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ticket")
public class TicketController {
	@Autowired
	TicketService ticketService;

	
	@GetMapping("/show/{id}")
	public ResponseEntity<List<Ticket>> getTicketForShow(@PathVariable Long id) {
		return new ResponseEntity<List<Ticket>>(ticketService.findTicketsByShow(id), HttpStatus.OK);
	}
	
	// Book a ticket, select a seat
	@PostMapping("/book")
	public String bookTicket(@RequestBody() BookTicketRequestDto bookTicketRequestDto) {
		try {
			return ticketService.bookTicket(bookTicketRequestDto);
		} catch (Exception e) {
			return "Requested seats are not available!";
		}
	}

	// Cancel a booked ticket
	@PostMapping("/cancel")
	public int canTicket(@RequestParam("id") int ticketId) {
		return ticketService.cancelTicket(ticketId);
	}
	
	
}