package com.rocket_cinema.cinema.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rocket_cinema.cinema.model.Ticket;
import com.rocket_cinema.cinema.repository.MovieDAO;
import com.rocket_cinema.cinema.repository.TicketDAO;

@RestController
@RequestMapping("/tickets")
public class TicketController {
    private final TicketDAO ticketRepository;
    private final MovieDAO movieRepository;
    
    public TicketController(TicketDAO ticketRepository,
                            MovieDAO movieRepository) {
        this.ticketRepository = ticketRepository;
        this.movieRepository = movieRepository;
    }
    
    @GetMapping("/{id}")
    public Ticket getTicket(@PathVariable("id") Long id) {
        return ticketRepository.findById(id).orElse(null);
    }
    
    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @PutMapping("/{id}")
    public Ticket updateTicket(@PathVariable("id") Long id, @RequestBody Ticket ticketDetails) {
        Ticket ticket = ticketRepository.findById(id).orElse(null);
        if (ticket != null) {
            ticket.setUser(ticketDetails.getUser());
            return ticketRepository.save(ticket);
        }
        return null;
    }
    
    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable("id") Long id) {
        ticketRepository.deleteById(id);
    }
}