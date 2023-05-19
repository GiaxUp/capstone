package com.rocket_cinema.repository;

import com.rocket_cinema.model.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowRepository extends JpaRepository<Show, Integer> {
	
	@Query(value = "SELECT CASE WHEN COUNT(s) > 0 THEN false ELSE true END FROM Show s")
    boolean isEmpty();
}
