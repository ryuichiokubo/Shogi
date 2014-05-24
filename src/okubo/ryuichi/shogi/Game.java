package okubo.ryuichi.shogi;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;
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
		// hands: AI's next hand
		
		List<List<Hand>> handSeqList = new ArrayList<List<Hand>>(); // (AI, HU, AI ... ), (AI, HU, AI ... ), ...
		
		for (Hand h: hands) {
			Map<Player, Hand> phSeq = new TreeMap<Player, Hand>();
			phSeq.put(Player.AI, h);
		
			for (Hand h2: getNextHandSeq(phSeq, Player.HUMAN)) {
				List<Hand> handSeq = new ArrayList<Hand>();
				handSeq.add(h);
				handSeq.add(h2);
				handSeqList.add(handSeq);

//				Map<Player, Hand> phSeq2 = new TreeMap<Player, Hand>();
//				phSeq2.put(Player.AI, h);
//				phSeq2.put(Player.HUMAN, h2);
			
//				for (Hand h3: getNextHandSeq(phSeq2, Player.AI)) {
//					List<Hand> handSeq = new ArrayList<Hand>();
//					handSeq.add(h);
//					handSeq.add(h2);
//					handSeq.add(h3);
//					handSeqList.add(handSeq);

//					Map<Player, Hand> phSeq3 = new TreeMap<Player, Hand>();
//					phSeq2.put(Player.AI, h);
//					phSeq2.put(Player.HUMAN, h2);
//					phSeq2.put(Player.AI, h3);
					
//					for (Hand h4: getNextHandSeq(phSeq2, Player.AI)) {
//						List<Hand> handSeq = new ArrayList<Hand>();
//						handSeq.add(h);
//						handSeq.add(h2);
//						handSeq.add(h3);
//						handSeq.add(h4);
//						handSeqList.add(handSeq);
//					}
				//}
			}
		}
		
		//Logger.global.info("handSeqList: " + handSeqList);
		
		List<Hand> finalAiHands = new ArrayList<Hand>();
		
		Hand prevAiHand = null;
		int bestHumanScore = 0;
		int currentScore = 0;
		
		// leave only one aiHand (from {ai1, hu1}, {ai1, hu2}, ... ) based on assumption that human will pick the best hand
		for (List<Hand> handSeq: handSeqList) {
			Hand aiHand = handSeq.get(0);
			Hand huHand = handSeq.get(1);
			if (prevAiHand == null) {
				prevAiHand = aiHand;
			}
			if (aiHand.equals(prevAiHand)) {
				// checking for same first ai hand
				Logger.global.info("###########");
				Logger.global.info("aiHand: " + aiHand);
				Logger.global.info("huHand: " + huHand);

				if (huHand.getScore() > bestHumanScore) {
					Logger.global.info("# human's better hand #");
					bestHumanScore = huHand.getScore();
					currentScore = aiHand.getScore() - huHand.getScore();
				}
			} else {
				// move to check next ai hand
				prevAiHand.setScore(currentScore);
				finalAiHands.add(prevAiHand);
				currentScore = 0;

				prevAiHand = aiHand;
				bestHumanScore = huHand.getScore();
			}
		}
		prevAiHand.setScore(currentScore);
		finalAiHands.add(prevAiHand);
			
		Logger.global.info("finalAiHands: " + finalAiHands);
		
		int highScore = Integer.MIN_VALUE;
		Hand bestHand = null;
		
		for (Hand aiHand: finalAiHands) {
			int score = aiHand.getScore();
			
			if (bestHand == null || highScore < score) {
				highScore = score;
				bestHand = aiHand;
			}
		}
		Logger.global.info("highScore: " + highScore);
		Logger.global.info("bestHand: " + bestHand);

		// XXX randomize
		//int rand = (int) Math.floor(Math.random() * highScores.size());
		//return highScores.get(rand);
		return bestHand;
	}

	private List<Hand> getNextHandSeq(Map<Player, Hand> phSeq, Player p) {
		Board nextBoard;
		
		try {
			nextBoard = board.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
			throw new NullPointerException("No clone, no nextBoard.");
		}

		for (Entry<Player, Hand> e: phSeq.entrySet()) {
			nextBoard.movePiece(e.getValue(), e.getKey());
		}
		Captive c = p == Player.AI ? myCaptive : aiCaptive;
		List<Hand> hands = nextBoard.getAvailableHands(p);
		hands.addAll(c.getAvailableHands());

		//Logger.global.info("hands: " + hands);

		return hands;
	}

	int calcScore(Hand h, Piece captured, boolean isPromoted, Player p) {
		int score = 0;
				
		if (captured != null) {
			score += SCORE_CAPTURE.get(captured.getType());
		}
		
		if (isPromoted) {
			score += SCORE_PROMOTION;
		}
		
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
