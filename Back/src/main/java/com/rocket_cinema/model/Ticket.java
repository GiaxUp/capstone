package com.rocket_cinema.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.rocket_cinema.auth.entity.User;

@Entity
@Table(name = "ticket")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String allocatedSeats;
	private String selectedShowtime;
	private int amount;
	private Date booked_at;
	@ManyToOne
	@JoinColumn
	@JsonIgnoreProperties(value = {"ticketList"})
	private User user;
	@ManyToOne
	@JoinColumn
	@JsonIgnore
	private Show show;
	@OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
	@JsonIgnore
	List<ShowSeat> showSeatList;
}
