package okubo.ryuichi.shogi;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

final class Game {

	private static final int SCORE_PROMOTION = 5;
	private static final int SCORE_CAPTURE = 5;
	
	private final Board board;
	private final Captive myCaptive;
	private final Captive aiCaptive;
	
	Game(Board board, Captive my, Captive ai) {
		this.board = board;
		this.myCaptive = my;
		this.aiCaptive = ai;
	}

	Hand getNextHand() {
		List<Hand> hands = board.getAvailableHands();
		hands.addAll(aiCaptive.getAvailableHands());
		
		return getBestHand(hands);
	}
	
	private Hand getBestHand(List<Hand> hands) {
		List<Hand> highScores = new ArrayList<Hand>();
		
		for (Hand h : hands) {
			int currentBest = highScores.isEmpty() ? 
					0 : highScores.get(0).getScore();
			
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

	static int calcScore(Hand h, Piece captured, boolean isPromoted) {
		int score = 0;
				
		if (captured != null) {
			score += SCORE_CAPTURE;
		}
		
		if (isPromoted) {
			score += SCORE_PROMOTION;
		}
		
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
