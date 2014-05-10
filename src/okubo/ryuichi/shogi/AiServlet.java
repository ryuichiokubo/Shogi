package okubo.ryuichi.shogi;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.http.*;

@SuppressWarnings("serial")
public class AiServlet extends HttpServlet {
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		Board board = Board.getInstance(9, 9);
		
		Captive myCaptive = Captive.getInstance(true);
		Captive aiCaptive = Captive.getInstance(false);
		
		// XXX why not cleared??
		board.clear();
		myCaptive.clear(); 
		aiCaptive.clear();
		
		ClientDataParser parser = ClientDataParser.getInstance();
		parser.parse(req, board, myCaptive, aiCaptive);

		Logger.global.info("board: " + board.toString());
		
		Game game = new Game(board, myCaptive, aiCaptive);
		Hand hand = game.getNextHand();
		String json = hand.toString();

		resp.setContentType("application/json");
		resp.setCharacterEncoding("utf-8");
		resp.getWriter().write(json);
	}
}
