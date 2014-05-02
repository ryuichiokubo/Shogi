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
		Map data = gson.fromJson(reader, HashMap.class);
		
		List<List<Map>> square = (List<List<Map>>) data.get("square");
		Logger.global.info("square: " + square.toString());
		
		Board board = new Board(9, 9);
		
		String type;
		boolean mine;
		int x = 0;
		int y = 0;
	
		for (List<Map> column: square) {
			Logger.global.info("column: " + column.toString());
			for (Map place: column) {
				if (place != null && place.get("type") != null) {
					Logger.global.info("place: " + place.toString() + x + ", " + y);
					// XXX assert type, mine etc?
					type = (String) place.get("type");
					if (place.get("mine") == null) {
						mine = false;
					} else {
						mine = (boolean) place.get("mine");
					}
					board.setPiece(type, x, y, mine);
				}
				y++;
			}
			x++;
			y = 0;
		}

		Logger.global.info("board: " + board.toString());
		
		Game game = new Game(board);
		Hand hand = game.getNextHand();
		String json = gson.toJson(hand);

		resp.setContentType("application/json");
		resp.setCharacterEncoding("utf-8");
		resp.getWriter().write(json);
	}
}
