//package com.rocket_cinema.model;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.hibernate.annotations.CreationTimestamp;
//import org.hibernate.annotations.UpdateTimestamp;
//
//import java.util.Date;
//import java.util.List;
//
//@Entity
//@Table(name = "users")
//@Data
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//public class UserCinema {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
//	private String name;
//	@Column(nullable = false, unique = true)
//    private String username;
//	@Column(nullable = false, unique = true)
//    private String email;
//    @Column(nullable = false)
//    private String password;
//	@CreationTimestamp
//	@Temporal(value = TemporalType.TIMESTAMP) // timestamp means date as well as time
//	private Date createdOn; // these will automatically set no need to set manually due to annotation sam
//							// with updatedOn
//	@UpdateTimestamp
//	@Temporal(value = TemporalType.TIMESTAMP)
//	private Date updatedOn;
//	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//	private List<Ticket> ticketList;
//}
