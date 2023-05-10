package com.rocket_cinema.responseDto;

import com.rocket_cinema.model.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieResponseDto {


    private int duration;
    private Date releaseDate;



    private LocalDate ShowDate;
    private LocalTime showTime;

    private double multiplier;

    private String theater;
    private String city;
    private String address;


}
