package com.rocket_cinema.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "movies")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Movie {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(unique = true, nullable = false)
	private String movieName;
	private int duration;
	private Date releaseDate;
	@OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
	private List<Show> showList;
}