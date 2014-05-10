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
	
	public static Piece getPiece(String type, boolean mine) {
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
