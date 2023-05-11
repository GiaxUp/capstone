package com.rocket_cinema.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

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
	private int amount;
	private Date booked_at;
	@ManyToOne
	@JoinColumn
	private User user;
	@ManyToOne
	@JoinColumn
	private Show show;
	@OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
	List<ShowSeat> showSeatList;
}
