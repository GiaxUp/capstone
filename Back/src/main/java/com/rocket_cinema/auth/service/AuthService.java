package com.rocket_cinema.auth.service;

import com.rocket_cinema.auth.payload.LoginDto;
import com.rocket_cinema.auth.payload.RegisterDto;

public interface AuthService {
    
	String login(LoginDto loginDto);
    String register(RegisterDto registerDto);
    
}
