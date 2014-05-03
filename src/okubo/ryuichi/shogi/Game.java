package okubo.ryuichi.shogi;

import java.util.List;

final class Game {

	private final Board board;
	private final Captive myCaptive;
	private final Captive aiCaptive;
	
	public Game(Board board, Captive my, Captive ai) {
		this.board = board;
		this.myCaptive = my;
		this.aiCaptive = ai;
	}

	public Hand getNextHand() {
		List<Hand> hands = board.getAvailableHands();
		hands.addAll(aiCaptive.getAvailableHands());
		
		// XXX get highest score from hands
		int rand = (int) Math.floor(Math.random() * hands.size());
		return hands.get(rand);
	}
	
	public static Piece getPiece(String type, int x, int y, boolean mine) {
		Piece instance = null;
		switch (type) {
			case "hu": 		instance = new Hu(x, y, mine); 			break;
			case "kyosha": 	instance = new Kyosha(x, y, mine); 		break;
			case "keima": 	instance = new Keima(x, y, mine); 		break;
			case "gin": 	instance = new Gin(x, y, mine); 		break;
			case "kin": 	instance = new Kin(x, y, mine); 		break;
			case "o": 		instance = new O(x, y, mine); 			break;
			case "hisha": 	instance = new Hisha(x, y, mine); 		break;
			case "kaku": 	instance = new Kaku(x, y, mine); 		break;
			case "tokin": 	instance = new Tokin(x, y, mine); 		break;
			case "narikyo": instance = new Narikyo(x, y, mine); 	break;
			case "narikei": instance = new Narikei(x, y, mine); 	break;
			case "narigin": instance = new Narigin(x, y, mine); 	break;
			case "ryu": 	instance = new Ryu(x, y, mine); 		break;
			case "uma": 	instance = new Uma(x, y, mine); 		break;
		}
		
		// XXX throw error if instance is null?
		
		return instance;
	}

}
