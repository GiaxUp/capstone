package com.rocket_cinema.cinema.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rocket_cinema.cinema.model.User;

public interface UserDAO extends JpaRepository<User, Long> {
	User findByUsername(String username);
}