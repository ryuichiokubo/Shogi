package okubo.ryuichi.shogi;

import java.util.Set;
import java.util.logging.Logger;

abstract class Piece {

	protected String type;
	protected int x;
	protected int y;
	protected boolean mine; // true: human, false: AI
	protected String prom;
	protected int[][] move;	// available position relative to current position [x, y, anywhere in this direction(1: true)]
	
	static Piece getInstance(String type, int x, int y, boolean mine) {
		Piece instance = null;
		switch (type) {
			case "hu": 		instance = new Hu(); 		break;
			case "kyosha": 	instance = new Kyosha(); 	break;
			case "keima": 	instance = new Keima(); 	break;
			case "gin": 	instance = new Gin(); 		break;
			case "kin": 	instance = new Kin(); 		break;
			case "o": 		instance = new O(); 		break;
			case "hisha": 	instance = new Hisha(); 	break;
			case "kaku": 	instance = new Kaku(); 		break;
			case "tokin": 	instance = new Tokin(); 	break;
			case "narikyo": instance = new Narikyo(); 	break;
			case "narikei": instance = new Narikei(); 	break;
			case "narigin": instance = new Narigin(); 	break;
			case "ryu": 	instance = new Ryu(); 		break;
			case "uma": 	instance = new Uma(); 		break;
		}
		
		// XXX throw error if instance is null?
		
		instance.init(type, x, y, mine);
		
		return instance;
	}

	private void init(String type, int x, int y, boolean mine) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.mine = mine;
	};
	
	public boolean isMine() {
		return mine;
	}
	
	public int[][] getMove() {
		return move;
	}

	public String getType() {
		return type;
	}

	@Override
	public String toString() {
		return type + "(" + mine + ")";
	}
}
