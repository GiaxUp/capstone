package com.rocket_cinema.cinema.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.rocket_cinema.cinema.model.User;
import com.rocket_cinema.cinema.repository.UserDAO;

@Service
public class UserService {
    private final UserDAO userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserDAO userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(String username, String password) {
        // Verifica se l'utente esiste già nel database
        if (userRepository.findByUsername(username) != null) {
            throw new RuntimeException("Username already exists");
        }

        // Crea un nuovo utente
        User user = new User(null, username, password); // ****DA FIXARE****
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));

        // Salva l'utente nel database
        return userRepository.save(user);
    }
}
