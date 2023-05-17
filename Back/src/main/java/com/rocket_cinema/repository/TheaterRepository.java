package com.rocket_cinema.repository;

import com.rocket_cinema.model.Theater;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TheaterRepository extends JpaRepository<Theater, Integer> {
	Theater findByNameAndCity(String name, String city);

	Theater findTheaterById(int id);

	@Query(value = "SELECT CASE WHEN COUNT(t) > 0 THEN false ELSE true END FROM Theater t")
    boolean isEmpty();
}
