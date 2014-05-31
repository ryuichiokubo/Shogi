package okubo.ryuichi.shogi;

import java.util.ArrayList;
import java.util.Collections;
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

	final static int BOARD_ROW = 5;
	final static int BOARD_COL = 5;
	final static int BOARD_PROM_ROW = 2;
	
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
			List<Hand> handSeq = new ArrayList<Hand>();
			handSeq.add(h);
		
			for (Hand h2: getNextHandSeq(handSeq)) {
				List<Hand> handSeq2 = new ArrayList<Hand>();
				handSeq2.add(h);
				handSeq2.add(h2);
			
				for (Hand h3: getNextHandSeq(handSeq2)) {
					List<Hand> handSeq3 = new ArrayList<Hand>();
					handSeq3.add(h);
					handSeq3.add(h2);
					handSeq3.add(h3);
					handSeqList.add(handSeq3);

//					for (Hand h4: getNextHandSeq(handSeq3)) {
//						List<Hand> handSeq4 = new ArrayList<Hand>();
//						handSeq4.add(h);
//						handSeq4.add(h2);
//						handSeq4.add(h3);
//						handSeq4.add(h4);
//						handSeqList.add(handSeq4);
//					}
				}
			}
		}
		
		Logger.global.info("####################");
		//Logger.global.info("handSeqList: " + handSeqList);
		Logger.global.info("handSeqList num: " + handSeqList.size());
		
		List<List<Hand>> filtered = filterByExpectingBest(handSeqList, 3);
		//Logger.global.info("filtered1: " + filtered);
		//filtered = filterByExpectingBest(filtered, 3);
		//Logger.global.info("filtered2: " + filtered);
		filtered = filterByExpectingBest(filtered, 2);
		//Logger.global.info("filtered3: " + filtered);
		ArrayList<Hand> finalAiHands = new ArrayList<Hand>();
		for (List<Hand> handList: filtered) {
			finalAiHands.add(handList.get(0));
		}
		
		Collections.sort(finalAiHands, Collections.reverseOrder());
		ArrayList<Hand> bestHands = new ArrayList<Hand>();
		for (Hand h: finalAiHands) {
			if (bestHands.size() == 0 || bestHands.get(0).getScore() == h.getScore()) {
				bestHands.add(h);
			}
		}
		Logger.global.info("bestHands: " + bestHands);
		
		int rand = (int) Math.floor(Math.random() * bestHands.size());
		Hand res = bestHands.get(rand);
		
		return res;
	}

	private List<List<Hand>> filterByExpectingBest(List<List<Hand>> handSeqList, int depth) {
		List<List<Hand>> filtered = new ArrayList<List<Hand>>();

		Hand tmpHand = null;
		List<Hand> tmpHandSeq = null;
		int bestNextScore = 0;
		int tmpScore = 0;
		
		// leave only one aiHand (from {ai1, hu1}, {ai1, hu2}, ... ) based on assumption that human will pick the best hand
		for (List<Hand> handSeq: handSeqList) {
			Hand currentHand = handSeq.get(depth - 2);
			Hand nextHand = handSeq.get(depth - 1);
			if (tmpHand == null) {
				tmpHand = currentHand;
				tmpHandSeq = handSeq;
			}
			if (currentHand.equals(tmpHand)) {
				// checking for same current hand
//				if (handSeq.get(0).getScore() > 100 || handSeq.get(1).getScore() > 100) { // || handSeq.get(2).getScore() > 1000) {
//					Logger.global.info("########");
//					Logger.global.info("currentHand: " + currentHand);
//					Logger.global.info("nextHand: " + nextHand);
//				}

				if (nextHand.getScore() > bestNextScore) {
					bestNextScore = nextHand.getScore();
					tmpScore = currentHand.getScore() - nextHand.getScore();
					tmpHandSeq = handSeq;
				}
			} else {
				// move to check different hand
				tmpHand.setScore(tmpScore);
				filtered.add(tmpHandSeq);
				
				tmpHand = currentHand;
				tmpHandSeq = handSeq;
				bestNextScore = nextHand.getScore();
				tmpScore = currentHand.getScore() - nextHand.getScore();
			}
		}
		tmpHand.setScore(tmpScore);
		filtered.add(tmpHandSeq);
			
		//Logger.global.info("finalAiHands: " + filtered);
		
		return filtered;
	}

	private List<Hand> getNextHandSeq(List<Hand> hSeq) {
//		private List<Hand> getNextHandSeq(List<Hand> phSeq, Player p) {
		Board nextBoard;
		
		try {
			nextBoard = board.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
			throw new NullPointerException("No clone, no nextBoard.");
		}

		Player p = null;
		int cntr = 0;
		for (Hand h: hSeq) {
			p = (cntr % 2 == 0) ? Player.AI : Player.HUMAN;
			nextBoard.movePiece(h, p);

//				Logger.global.info("phSeq: " + phSeq);
//				Logger.global.info("board: " + nextBoard);
			cntr++;
		}
		p = (cntr % 2 == 0) ? Player.AI : Player.HUMAN;
		Captive c = (p == Player.AI) ? aiCaptive : myCaptive;
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
		
		// TODO plus if type is kin or gin etc and player's o is near
		// TODO plus if type is hisha or kaku etc and opponent's o is near
		
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
