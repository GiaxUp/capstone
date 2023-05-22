package com.rocket_cinema.repository;

import com.rocket_cinema.model.Show;
import com.rocket_cinema.model.Ticket;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {
	
//	@Query("SELECT t FROM Ticket t INNER JOIN t.show_id s WHERE s.id = :showID")
//	List<Ticket> getTicketsByShowID(@Param("showID") Long showID);
	
	
	List<Ticket> findTicketsByShowId(Long showID);
}