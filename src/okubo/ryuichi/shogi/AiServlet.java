package okubo.ryuichi.shogi;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.logging.Logger;

import javax.servlet.http.*;

import com.google.gson.Gson;

@SuppressWarnings("serial")
public class AiServlet extends HttpServlet {
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		String line = "";
		String board = "";
		Gson gson = new Gson();

		BufferedReader reader = req.getReader();
		
		while ((line = reader.readLine()) != null) {
			board += line;
		}

		HashMap map = gson.fromJson(board, HashMap.class);
		
		Logger.global.info("board: " + map.toString());
		
	}
}
