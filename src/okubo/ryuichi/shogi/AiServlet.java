package okubo.ryuichi.shogi;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.*;

import com.google.gson.Gson;

@SuppressWarnings("serial")
public class AiServlet extends HttpServlet {
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		Gson gson = new Gson();
		BufferedReader reader = req.getReader();
		Map<String, Object> data = gson.fromJson(reader, HashMap.class);
		
		List<List<Map<String, Object>>> squares 
			= (List<List<Map<String, Object>>>) data.get("square");
		//Logger.global.info("square: " + squares.toString());
		
		Map<String, List<String>> captive = (Map<String, List<String>>) data.get("captive");
		//Logger.global.info("captive: " + captive.toString());

		Captive myCaptive = Captive.getInstance(true);
		Captive aiCaptive = Captive.getInstance(false);
		
		myCaptive.clear(); // XXX why not cleared??
		aiCaptive.clear(); // XXX why not cleared??
		
		for (String type: captive.get("my")) {
			Piece p = Game.getPiece(type, true);
			myCaptive.setCaptive(p);
		}
		for (String type: captive.get("ai")) {
			Piece p = Game.getPiece(type, false);
			aiCaptive.setCaptive(p);
		}
		//Logger.global.info("aiCaptive: " + aiCaptive.toString());
		//Logger.global.info("myCaptive: " + myCaptive.toString());
		
		Board board = Board.getInstance(9, 9);
		board.clear();
		
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

		Logger.global.info("board: " + board.toString());
		
		Game game = new Game(board, myCaptive, aiCaptive);
		Hand hand = game.getNextHand();
		String json = gson.toJson(hand);

		resp.setContentType("application/json");
		resp.setCharacterEncoding("utf-8");
		resp.getWriter().write(json);
	}
}
