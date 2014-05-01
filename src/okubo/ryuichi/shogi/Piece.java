package okubo.ryuichi.shogi;

abstract class Piece {

	protected final String type;
	protected final int x;
	protected final int y;
	protected final boolean mine; // true: human, false: AI
	protected final String prom;
	protected final int[][] move; // available position relative to current position [x, y, anywhere in this direction(1: true)]
	
	Piece(String type, int x, int y, boolean mine, String prom, int[][] move) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.mine = mine;
		this.prom = prom;
		this.move = move;
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

	public String getPromType() {
		return prom;
	}

	@Override
	public String toString() {
		return type + "(" + mine + ")";
	}
}
