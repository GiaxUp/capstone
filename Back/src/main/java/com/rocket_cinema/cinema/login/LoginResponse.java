package com.rocket_cinema.cinema.login;

public class LoginResponse {
	private boolean success;

	// Costruttori, getter e setter
	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public LoginResponse(boolean success) {
		super();
		this.success = success;
	}

}
