package okubo.ryuichi.shogi;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
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
		Map[][] data = gson.fromJson(reader, HashMap[][].class);
		
		Board board = new Board(9, 9);
		
		String type;
		boolean mine;
		
		for (int i = 0; i < data.length; i++) {			
			for (int j = 0; j < data[i].length; j++) {
				if (data[i][j] != null && data[i][j].get("type") != null) {
					// XXX assert type, mine etc?
					type = (String) data[i][j].get("type");
					if (data[i][j].get("mine") == null) {
						mine = false;
					} else {
						mine = (boolean) data[i][j].get("mine");
					}

					board.setPiece(type, i, j, mine);
				}
			}
		}
		
		Logger.global.info("board: " + board.toString());
		
		Hand hand = board.getNextHand();
		String json = gson.toJson(hand);

		resp.setContentType("application/json");
		resp.setCharacterEncoding("utf-8");
		resp.getWriter().write(json);
	}
}
