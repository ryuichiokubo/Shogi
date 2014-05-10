package okubo.ryuichi.shogi;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.Gson;

final class ClientDataParser {

	private static ClientDataParser instance = new ClientDataParser();
	private Gson gson = new Gson();
	
	private ClientDataParser() {}
	
	public static ClientDataParser getInstance() {
		return instance;
	}

	public void parse(HttpServletRequest req, Board board, Captive myCaptive, Captive aiCaptive)
			throws IOException {
		
		BufferedReader reader = req.getReader();
		
		@SuppressWarnings("unchecked")
		Map<String, Object> data = gson.fromJson(reader, HashMap.class);
		
		parseCaptive(data, myCaptive, aiCaptive);
		parseSquare(data, board);
	}
	
	private void parseCaptive(Map<String, Object> data, Captive myCaptive, Captive aiCaptive) {
		@SuppressWarnings("unchecked")
		Map<String, List<String>> captive
			= (Map<String, List<String>>) data.get("captive");

		for (String type: captive.get("my")) {
			Piece p = Game.getPiece(type, true);
			myCaptive.setCaptive(p);
		}
		for (String type: captive.get("ai")) {
			Piece p = Game.getPiece(type, false);
			aiCaptive.setCaptive(p);
		}
	}
	
	private void parseSquare(Map<String, Object> data, Board board) {
		@SuppressWarnings("unchecked")
		List<List<Map<String, Object>>> squares 
			= (List<List<Map<String, Object>>>) data.get("square");
		
		int x = 0;
		int y = 0;
	
		for (List<Map<String, Object>> column: squares) {
			//Logger.global.info("column: " + column.toString());
			for (Map<String, Object> square: column) {
				if (square != null && square.get("type") != null) {
					//Logger.global.info("square: " + square.toString() + x + ", " + y);
					// XXX assert type, mine etc?
					String type = (String) square.get("type");
					boolean mine;
					if (square.get("mine") == null) {
						mine = false;
					} else {
						mine = (boolean) square.get("mine");
					}
					board.setPiece(type, x, y, mine);
				}
				y++;
			}
			x++;
			y = 0;
		}
	}
}
