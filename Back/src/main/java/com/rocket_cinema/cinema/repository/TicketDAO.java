package com.rocket_cinema.cinema.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rocket_cinema.cinema.model.Ticket;
@Repository
public interface TicketDAO extends JpaRepository<Ticket, Long> {
}
