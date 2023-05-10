package com.rocket_cinema.service;

import com.rocket_cinema.model.*;
import com.rocket_cinema.repository.*;
import com.rocket_cinema.requestDto.BookTicketRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TicketService {
	@Autowired
	TicketRepository ticketRepository;
	@Autowired
	ShowRepository showRepository;

	@Autowired
	UserRepository userRepository;

	public String bookTicket(BookTicketRequestDto bookTicketRequestDto) throws Exception {
		List<String> requestedSeats = bookTicketRequestDto.getRequestedSeats();

		Show show = showRepository.findById(bookTicketRequestDto.getShowId()).get();

		User user = userRepository.findById(bookTicketRequestDto.getUserId()).get();

		// List that desribes our booked seats
		List<ShowSeat> bookedSeats = new ArrayList<>();

		// We need show seats for checking whether available or not
		List<ShowSeat> showSeatList = show.getShowSeatList();

		// We need to check seats requested wheteher it is avalaible or not
		for (ShowSeat showSeat : showSeatList) {
			String seatNo = showSeat.getSeatNo();
			// if the requested seats list contains this seatNo and its available then add
			// it in our booked seat means we can book it
			if (showSeat.isBooked() == false && requestedSeats.contains(seatNo)) {
				bookedSeats.add(showSeat);
			}
		}
		// When the requested seats are not fully available then throw an exception
		if (bookedSeats.size() != requestedSeats.size()) {
			throw new Exception("Seats not available!");
		}

		// we came here that means requested seats are available and now we can
		// calculate amount to be paid
		// so generating ticket
		double amount = 0;
		double mul = show.getMultiplier();
		String allotedSeats = "";

		Ticket ticket = new Ticket();
		ticket.setUser(user);
		ticket.setShow(show);
		ticket.setBooked_at(new Date());

		// So we will calculate it from bookedseats list
		for (ShowSeat bookedseat : bookedSeats) {
			bookedseat.setBooked(true);
			bookedseat.setBooked_at(new Date());
			bookedseat.setTicket(ticket);
			bookedseat.setShow(show);
			allotedSeats = allotedSeats + bookedseat.getSeatNo() + " ,";
			// Price
			if (bookedseat.getSeatNo().charAt(0) == '1') // Classic seat cost 10
			{
				amount += 10 * mul;

			} else // Premium seat cost 20
			{
				amount += 20 * mul;
			}

		}
		ticket.setAmount((int) amount);
		ticket.setShowSeatList(bookedSeats);
		ticket.setAllotedSeats(allotedSeats);

		// bidirectional mapping part pending
		user.getTicketList().add(ticket);

		ticketRepository.save(ticket);
		return "Successfullty booked ticket!";

	}

	public int cancelTicket(int ticketId) {
		// get the ticket
		Ticket ticket = ticketRepository.findById(ticketId).get();

		// get the seats which were booked
		String bookedSeats = ticket.getAllotedSeats();
		// removing alloted seats
		ticket.setAllotedSeats("");

		List<ShowSeat> showBookedSeats = ticket.getShowSeatList();

		// freeing the seats
		for (ShowSeat seat : showBookedSeats) {
			seat.setBooked(false);
		}
		ticket.setShowSeatList(new ArrayList<>());

		int totalamount = ticket.getAmount();
		int fine = (totalamount * 20) / 100;
		// free ticket from user
		User user = ticket.getUser();
		user.setUpdatedOn(new Date());
		List<Ticket> userTickets = user.getTicketList();
//      for(TicketEntity ticket1:userTickets )
//      {
//          if(ticket1.getId()==ticketId)
//          {
//              userTickets.remove(ticket1);
//          }
//      }
		userTickets.remove(ticket);

		userRepository.save(user);

		Show show = ticket.getShow();
		List<Ticket> showTickets = show.getListOfTickets();
//         for(TicketEntity ticket1 : showTickets)
//         {
//             if(ticket1.getId()==ticketId)
//             {
//                 showTickets.remove(ticket1);
//             }
//         }
		showTickets.remove(ticket);
		showRepository.save(show);

		ticketRepository.save(ticket);
		return fine;
	}
}