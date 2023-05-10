package com.rocket_cinema.convertor;

import com.rocket_cinema.model.Show;
import com.rocket_cinema.responseDto.ShowResponseDto;

import java.util.ArrayList;
import java.util.List;

public class ShowConvertor {
	public static List<ShowResponseDto> convertEntityToDto(List<Show> showEntityList) {

		List<ShowResponseDto> showResponseDtoList = new ArrayList<>();
		for (Show show : showEntityList) {
			ShowResponseDto showResponseDto = ShowResponseDto.builder().showDate(show.getShowDate())
					.showTime(show.getShowTime()).movieName(show.getMovie().getMovieName()).build();
			showResponseDtoList.add(showResponseDto);
		}
		return showResponseDtoList;
	}
}
