package com.rocket_cinema.cinema.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rocket_cinema.cinema.model.Movie;

@Repository
public interface MovieDAO extends JpaRepository<Movie, Long> {
}

