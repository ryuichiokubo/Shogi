package okubo.ryuichi.shogi;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

final class Game {

	private static Game instance = null;
	
	private static final int SCORE_PROMOTION = 50;
	private static final Map<Piece.Type, Integer> SCORE_CAPTURE
		= new EnumMap<Piece.Type, Integer>(Piece.Type.class);
	
	private final Board board;
	private final Captive my_captive;
	private final Captive ai_captive;

	final static int BOARD_ROW = 9;
	final static int BOARD_COL = 9;
	
	static {
		for (Piece.Type type : Piece.Type.values()) {
			SCORE_CAPTURE.put(type, type.getScore());
		}
	}
	
	private Game(Board board, Captive my, Captive ai) {
		this.board = board;
		this.my_captive = my;
		this.ai_captive = ai;
	}
	
	static Game getInstance(Board board, Captive my, Captive ai) {
		if (instance == null) {
			instance = new Game(board, my, ai);
		}
		return instance;
	}
	
	static Game getInstance() {
		if (instance == null) {
			throw new NullPointerException("Game instance not created yet");
		}
		return instance;
	}
	
	static boolean hasInstance() {
		return (instance != null);
	}
	
	Board getBoard() {
		return board;
	}

	Hand getNextHand() {
		List<Hand> hands = board.getAvailableHands(false);
		hands.addAll(ai_captive.getAvailableHands());
		
		return getBestHand(hands);
	}
	
	private Hand getBestHand(List<Hand> hands) {
		List<Hand> high_scores = new ArrayList<Hand>();
		
		for (Hand h : hands) {
			int currentBest = high_scores.isEmpty() ? -1000 : high_scores.get(0).getScore();
			
			if (currentBest == h.getScore()) {
				high_scores.add(h);
			} else if (currentBest < h.getScore()) {
				high_scores.clear();
				high_scores.add(h);
			}
		}

		int rand = (int) Math.floor(Math.random() * high_scores.size());
		
		return high_scores.get(rand);
	}

	int calcScore(Hand h, Piece captured, boolean isPromoted, boolean isPlayer) {
		int score = 0;
				
		if (captured != null) {
			score += SCORE_CAPTURE.get(captured.getType());
		}
		
		if (isPromoted) {
			score += SCORE_PROMOTION;
		}
		
		if (!isPlayer) // only reading AI's next hand for now
			score -= calcNextPlayerScore(h);
		
		return score;
	}

	private int calcNextPlayerScore(Hand hand) {
		Board next_board;
		
		try {
			next_board = board.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
			throw new NullPointerException("No clone, no next_board.");
		}

		next_board.movePiece(hand);
		List<Hand> hands = next_board.getAvailableHands(true);
		
		//Logger.global.info(" hands: " + hands.toString());

		int sum = 0;
		for (Hand h : hands) {
			sum += h.getScore();
		}
		int score = sum / hands.size();
		
		return score;
	}

	static Piece getPiece(String type, boolean mine) {
		Piece instance = null;
		switch (type) {
			case "hu": 		instance = new Piece(Piece.Type.HU); 		break;
			case "kyosha": 	instance = new Piece(Piece.Type.KYOSHA); 	break;
			case "keima": 	instance = new Piece(Piece.Type.KEIMA); 	break;
			case "gin": 	instance = new Piece(Piece.Type.GIN); 		break;
			case "kin": 	instance = new Piece(Piece.Type.KIN); 		break;
			case "o": 		instance = new Piece(Piece.Type.O); 		break;
			case "hisha": 	instance = new Piece(Piece.Type.HISHA); 	break;
			case "kaku": 	instance = new Piece(Piece.Type.KAKU); 		break;
			case "tokin": 	instance = new Piece(Piece.Type.TOKIN); 	break;
			case "narikyo": instance = new Piece(Piece.Type.NARIKYO); 	break;
			case "narikei": instance = new Piece(Piece.Type.NARIKEI); 	break;
			case "narigin": instance = new Piece(Piece.Type.NARIGIN); 	break;
			case "ryu": 	instance = new Piece(Piece.Type.RYU); 		break;
			case "uma": 	instance = new Piece(Piece.Type.UMA); 		break;
		}
		
		if (instance == null) {
			throw new NullPointerException("Unknown piece type.");
		}
		
		instance.setPlayer(mine);
		
		return instance;
	}

}
