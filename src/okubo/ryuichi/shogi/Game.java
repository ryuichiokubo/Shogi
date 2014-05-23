package okubo.ryuichi.shogi;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

final class Game {

	enum Player {
		HUMAN, AI;
	}
	
	private static Game instance = null;
	
	private static final int SCORE_PROMOTION = 300;
	private static final Map<Piece.Type, Integer> SCORE_CAPTURE = new EnumMap<Piece.Type, Integer>(Piece.Type.class);
	
	private final Board board;
	private final Captive myCaptive;
	private final Captive aiCaptive;

	final static int BOARD_ROW = 9;
	final static int BOARD_COL = 9;
	
	static {
		for (Piece.Type type : Piece.Type.values()) {
			SCORE_CAPTURE.put(type, type.getScore());
		}
	}
	
	private Game(Board b, Captive my, Captive ai) {
		board = b;
		myCaptive = my;
		aiCaptive = ai;
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
		List<Hand> hands = board.getAvailableHands(Player.AI);
		hands.addAll(aiCaptive.getAvailableHands());
		
		return getBestHand(hands);
	}
	
	private Hand getBestHand(List<Hand> hands) {
		List<Hand> highScores = new ArrayList<Hand>();
		
		for (Hand h : hands) {
			if (Math.abs(h.getScore()) > 100) {
				Logger.global.info("hand: " + h.toString());
			}
			
			int currentBest = highScores.isEmpty() ? -1000 : highScores.get(0).getScore();
			
			if (currentBest == h.getScore()) {
				highScores.add(h);
			} else if (currentBest < h.getScore()) {
				highScores.clear();
				highScores.add(h);
			}
		}

		int rand = (int) Math.floor(Math.random() * highScores.size());
		
		return highScores.get(rand);
	}

	int calcScore(Hand h, Piece captured, boolean isPromoted, Player p) {
		int score = 0;
				
		if (captured != null) {
			score += SCORE_CAPTURE.get(captured.getType());
		}
		
		if (isPromoted) {
			score += SCORE_PROMOTION;
		}
		
		if (p == Player.AI) { // XXX only reading AI's next hand for now
			boolean debug = false;
			if (Math.abs(score) > 100) {
				debug = true;
			}
			score -= calcNextPlayerScore(h, debug);
		}
		
		return score;
	}

	private int calcNextPlayerScore(Hand hand, boolean debug) {
		Board nextBoard;
		
		try {
			nextBoard = board.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
			throw new NullPointerException("No clone, no nextBoard.");
		}

		nextBoard.movePiece(hand);
		List<Hand> hands = nextBoard.getAvailableHands(Player.HUMAN);
		hands.addAll(myCaptive.getAvailableHands());

		if (debug) {
			Logger.global.info("next hands: " + hands.toString());
		}

		int sum = 0;
		for (Hand h : hands) {
			sum += h.getScore();
		}
		int score = sum / hands.size();
		
		return score;
	}

	static Piece getPiece(String type, Player p) {
		Piece instance = null;
		switch (type) {
			case "hu": 			instance = new Piece(Piece.Type.HU); 			break;
			case "kyosha": 		instance = new Piece(Piece.Type.KYOSHA); 		break;
			case "keima": 		instance = new Piece(Piece.Type.KEIMA); 		break;
			case "tetsu": 		instance = new Piece(Piece.Type.TETSU); 		break;
			case "dou": 		instance = new Piece(Piece.Type.DOU); 			break;
			case "gin": 		instance = new Piece(Piece.Type.GIN); 			break;
			case "kin": 		instance = new Piece(Piece.Type.KIN); 			break;
			case "o": 			instance = new Piece(Piece.Type.O); 			break;
			case "hisha": 		instance = new Piece(Piece.Type.HISHA); 		break;
			case "kaku": 		instance = new Piece(Piece.Type.KAKU); 			break;
			case "tokin": 		instance = new Piece(Piece.Type.TOKIN); 		break;
			case "narikyo": 	instance = new Piece(Piece.Type.NARIKYO); 		break;
			case "narikei": 	instance = new Piece(Piece.Type.NARIKEI); 		break;
			case "naritetsu": 	instance = new Piece(Piece.Type.NARITETSU); 	break;
			case "naridou": 	instance = new Piece(Piece.Type.NARIDOU); 		break;
			case "narigin": 	instance = new Piece(Piece.Type.NARIGIN); 		break;
			case "ryu": 		instance = new Piece(Piece.Type.RYU); 			break;
			case "uma": 		instance = new Piece(Piece.Type.UMA); 			break;
			case "kirin": 		instance = new Piece(Piece.Type.KIRIN); 		break;
			case "houou": 		instance = new Piece(Piece.Type.HOUOU); 		break;
			case "shishi": 		instance = new Piece(Piece.Type.SHISHI); 		break;
			case "honou": 		instance = new Piece(Piece.Type.HONOU); 		break;
		}
		
		if (instance == null) {
			throw new NullPointerException("Unknown piece type.");
		}
		
		instance.setPlayer(p);
		
		return instance;
	}

}
