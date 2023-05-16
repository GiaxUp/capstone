package com.rocket_cinema.runner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.rocket_cinema.requestDto.TheaterRequestDto;
import com.rocket_cinema.service.TheaterService;

@SpringBootApplication
public class TheaterRunner implements CommandLineRunner {

    @Autowired
    private TheaterService theaterService;

    public static void main(String[] args) {
        SpringApplication.run(TheaterRunner.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
    	System.out.println("TheaterRunner running...");
        createTheaters();
    }

    private void createTheaters() {
        TheaterRequestDto theater1 = new TheaterRequestDto();
        theater1.setName("Cinema Stella");
        theater1.setCity("Roma");
        theater1.setAddress("Via Fasulla 123");

        TheaterRequestDto theater2 = new TheaterRequestDto();
        theater2.setName("Cinema Omega");
        theater2.setCity("Milano");
        theater2.setAddress("Via Colle 22");

        TheaterRequestDto theater3 = new TheaterRequestDto();
        theater3.setName("Cinema Alpha");
        theater3.setCity("Napoli");
        theater3.setAddress("Via Scudetto 3");

        TheaterRequestDto theater4 = new TheaterRequestDto();
        theater4.setName("Cinema Gamma");
        theater4.setCity("Pisa");
        theater4.setAddress("Via Paolino 13");

        // Scommentare dopo aver droppato database!
//         theaterService.createTheater(theater1);
//         theaterService.createTheater(theater2);
//         theaterService.createTheater(theater3);
//         theaterService.createTheater(theater4);
    }
}