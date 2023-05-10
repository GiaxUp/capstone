package com.rocket_cinema.service;

import com.rocket_cinema.convertor.TheaterConvertor;
import com.rocket_cinema.enums.SeatType;
import com.rocket_cinema.model.Theater;
import com.rocket_cinema.model.TheaterSeat;
import com.rocket_cinema.repository.TheaterRepository;
import com.rocket_cinema.requestDto.TheaterRequestDto;
import com.rocket_cinema.responseDto.TheaterResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TheaterService {

    @Autowired
    TheaterRepository theaterRepository;
    public String createTheater(TheaterRequestDto theaterRequestDto)
    {
        Theater theater =Theater.builder().name(theaterRequestDto.getName()).address(theaterRequestDto.getAddress())
                .city(theaterRequestDto.getCity()).build();
        // now we need to create seats of this theater seats should be created automatically when theater is created
        // so we will creater seats here istself so that whenever createTheater is called seats are also formed
        List<TheaterSeat> theaterSeatList= createTheaterSeats();

        theater.setTheaterSeatList(theaterSeatList);
        // since for theaterseats we need to set the theater ofr this since thaeterseta is child and theater is parent
        for(TheaterSeat theaterSeat:theaterSeatList)
        {
            theaterSeat.setTheater(theater);
        }
        theaterRepository.save(theater);
        return "theater added successfully";
    }
    public List<TheaterSeat> createTheaterSeats()
    {
        // this function will create a list of theater seats
        List<TheaterSeat> theaterSeatList = new ArrayList<>();
        // we will only create 10 seats for simplicity for now later we can extend it to users choice and demand
        // for 5 classic seats
        for(int i =0 ; i < 5;i++)
        {
            // for classic
            TheaterSeat theaterSeat = new TheaterSeat();
            String seatNo = "1"+((char)('A'+i));
            SeatType seatType = SeatType.CLASSIC;
            theaterSeat.setSeatNo(seatNo);
            theaterSeat.setSeatType(seatType);
            theaterSeat.setRate(100);
            theaterSeatList.add(theaterSeat);
            // for platinum
//            theaterSeat = new TheaterSeat();
//            seatNo = "2"+((char)('A'+i));
//            seatType = SeatType.PLATINUM;
//            theaterSeat.setSeatNo(seatNo);
//            theaterSeat.setSeatType(seatType);
//            theaterSeat.setRate(200);
//            theaterSeatList.add(theaterSeat);
        }
        // for 5 PLATINUM seats
        for(int i =0 ; i < 5;i++)
        {
            TheaterSeat theaterSeat = new TheaterSeat();
            String seatNo = "2"+((char)('A'+i));
            SeatType seatType = SeatType.PREMIUM;
            theaterSeat.setSeatNo(seatNo);
            theaterSeat.setSeatType(seatType);
            theaterSeat.setRate(200);
            theaterSeatList.add(theaterSeat);
        }
        return theaterSeatList;


    }

    public TheaterResponseDto getbyId(int id)
    {
        Theater theater = theaterRepository.findTheaterById(id);
          TheaterResponseDto theaterResponseDto = TheaterConvertor.convertEntityTodto(theater);
          return theaterResponseDto;
    }
}
