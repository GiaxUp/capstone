package com.rocket_cinema.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "theater")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Theater {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String city;
	private String address;
	@OneToMany(mappedBy = "theater", cascade = CascadeType.ALL)
	private List<TheaterSeat> theaterSeatList;
	@OneToMany(mappedBy = "theater", cascade = CascadeType.ALL)
	private List<Show> showList;
}
