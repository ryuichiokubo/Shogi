package okubo.ryuichi.shogi;

final class Hand {
	
	final String type;
	final int fromX;
	final int fromY;
	final int toX;
	final int toY;

	Hand(String type, int fromX, int fromY, int toX, int toY) {
		this.type = type;
		this.fromX = fromX;
		this.fromY = fromY;
		this.toX = toX;
		this.toY = toY;
	}

}
