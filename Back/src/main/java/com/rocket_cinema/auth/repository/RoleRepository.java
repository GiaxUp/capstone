package com.rocket_cinema.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocket_cinema.auth.entity.ERole;
import com.rocket_cinema.auth.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
	Optional<Role> findByRoleName(ERole roleName);

}
