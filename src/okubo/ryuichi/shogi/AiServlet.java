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
		Map data = gson.fromJson(reader, HashMap.class);
		
		Logger.global.info("data: " + data.toString());
		
		Board board = new Board(9, 9);
		board.setPiece(data);
		
		Logger.global.info("board: " + board.toString());
	}
}
