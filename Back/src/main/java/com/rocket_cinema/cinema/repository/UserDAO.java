package com.rocket_cinema.cinema.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rocket_cinema.cinema.model.User;
@Repository
public interface UserDAO extends JpaRepository<User, Long> {
	User findByUsername(String username);
}