package com.rocket_cinema.auth.runner;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.rocket_cinema.auth.entity.ERole;
import com.rocket_cinema.auth.entity.Role;
import com.rocket_cinema.auth.repository.RoleRepository;
import com.rocket_cinema.auth.repository.UserRepository;
import com.rocket_cinema.auth.service.AuthService;

@Component
public class AuthRunner implements ApplicationRunner {

	@Autowired
	RoleRepository roleRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	AuthService authService;

	private Set<Role> adminRole;
	private Set<Role> moderatorRole;
	private Set<Role> userRole;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("AuthRunner running...");
		setRoleDefault();
		// setUserDefault();

	}

	private void setRoleDefault() {
		Role admin = new Role();
		admin.setRoleName(ERole.ROLE_ADMIN);
		//roleRepository.save(admin);

		Role user = new Role();
		user.setRoleName(ERole.ROLE_USER);
		// Scommentare la riga sotto se il database viene droppato
		// roleRepository.save(user);

		Role moderator = new Role();
		moderator.setRoleName(ERole.ROLE_MODERATOR);
		//roleRepository.save(moderator);

		adminRole = new HashSet<Role>();
		adminRole.add(admin);
		adminRole.add(moderator);
		adminRole.add(user);

		moderatorRole = new HashSet<Role>();
		moderatorRole.add(moderator);
		moderatorRole.add(user);

		userRole = new HashSet<Role>();
		userRole.add(user);
	}

	private void setUserDefault() {

		Set<String> roleAdmin = new HashSet<>(
				adminRole.stream().map(r -> r.getRoleName().toString()).collect(Collectors.toList()));
		Set<String> roleModerator = new HashSet<>(
				moderatorRole.stream().map(r -> r.getRoleName().toString()).collect(Collectors.toList()));
		Set<String> roleUser = new HashSet<>(
				userRole.stream().map(r -> r.getRoleName().toString()).collect(Collectors.toList()));
	}

}
