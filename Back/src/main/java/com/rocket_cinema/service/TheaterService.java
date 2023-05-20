package com.rocket_cinema.service;

import com.rocket_cinema.convertor.TheaterConvertor;
import com.rocket_cinema.enums.SeatType;
import com.rocket_cinema.model.Theater;
import com.rocket_cinema.model.TheaterSeat;
import com.rocket_cinema.repository.ShowRepository;
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
	
	public boolean isTheaterTableEmpty() {
        return theaterRepository.isEmpty();
    }

	public String createTheater(TheaterRequestDto theaterRequestDto) {
		Theater theater = Theater.builder().name(theaterRequestDto.getName()).address(theaterRequestDto.getAddress())
				.city(theaterRequestDto.getCity()).build();
		// Now we need to create seats of this theater seats should be created
		// automatically when theater is created
		// so we will create seats here istself so that whenever createTheater is
		// called seats are also formed
		List<TheaterSeat> theaterSeatList = createTheaterSeats();

		theater.setTheaterSeatList(theaterSeatList);
		// Since for theaterseats we need to set the theater ofr this since thaeterseat
		// is child and theater is parent
		for (TheaterSeat theaterSeat : theaterSeatList) {
			theaterSeat.setTheater(theater);
		}
		theaterRepository.save(theater);
		return "Theater added successfully!";
	}

	public List<TheaterSeat> createTheaterSeats() {
	    List<TheaterSeat> theaterSeatList = new ArrayList<>();
	    
	    // Creazione dei 10 posti Premium
	    for (int seatNo = 1; seatNo <= 8; seatNo++) {
	        TheaterSeat theaterSeat = new TheaterSeat();
	        String seatId = "A" + seatNo;
	        SeatType seatType = SeatType.PREMIUM;
	        theaterSeat.setSeatNo(seatId);
	        theaterSeat.setSeatType(seatType);
	        theaterSeat.setRate(20);
	        theaterSeatList.add(theaterSeat);
	    }
	    
	    // Creazione dei 40 posti Classic
	    char[] rows = {'B', 'C', 'D', 'E', 'F', 'G', 'H'};
	    for (int row = 0; row < rows.length; row++) {
	        for (int seatNo = 1; seatNo <= 8; seatNo++) {
	            TheaterSeat theaterSeat = new TheaterSeat();
	            String seatId = Character.toString(rows[row]) + seatNo;
	            SeatType seatType = SeatType.CLASSIC;
	            theaterSeat.setSeatNo(seatId);
	            theaterSeat.setSeatType(seatType);
	            theaterSeat.setRate(10);
	            theaterSeatList.add(theaterSeat);
	        }
	    }

	    

	    return theaterSeatList;
	}

	public TheaterResponseDto getbyId(int id) {
		Theater theater = theaterRepository.findTheaterById(id);
		TheaterResponseDto theaterResponseDto = TheaterConvertor.convertEntityTodto(theater);
		return theaterResponseDto;
	}
}
