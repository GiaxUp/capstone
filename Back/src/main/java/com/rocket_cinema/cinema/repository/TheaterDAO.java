package com.rocket_cinema.cinema.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rocket_cinema.cinema.model.Theater;

@Repository
public interface TheaterDAO extends JpaRepository<Theater, Long> {
    // Altri metodi personalizzati se necessario
}
