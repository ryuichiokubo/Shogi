package okubo.ryuichi.shogi;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.http.*;

@SuppressWarnings("serial")
public class AiServlet extends HttpServlet {
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		Game game;
		Board board;
		Captive myCaptive = Captive.getInstance(true);
		Captive aiCaptive = Captive.getInstance(false);
		
		if (Game.hasInstance()) {
			game = Game.getInstance();
			board = game.getBoard();
		} else {
			board = new Board(Game.BOARD_ROW, Game.BOARD_COL);
			game = Game.getInstance(board, myCaptive, aiCaptive);				
		}
		
		// XXX reuse previous board
		board.clear();
		myCaptive.clear(); 
		aiCaptive.clear();
		
		ClientDataParser.parse(req, board, myCaptive, aiCaptive);

		Logger.global.info("board: " + board.toString());
		
		Hand hand = game.getNextHand();
		String json = hand.toString();

		resp.setContentType("application/json");
		resp.setCharacterEncoding("utf-8");
		resp.getWriter().write(json);
	}
}
