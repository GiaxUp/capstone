package com.rocket_cinema.responseDto;

import com.rocket_cinema.model.Show;
import com.rocket_cinema.model.TheaterSeat;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TheaterResponseDto {

    private String name;
    private String city;
    private String address;

   private List<String> movieName;
}