package okubo.ryuichi.shogi;

import com.google.gson.Gson;

final class Hand {
	
	final String type;
	final int fromX;
	final int fromY;
	final int toX;
	final int toY;

	Hand(Piece.Type type, int fromX, int fromY, int toX, int toY) {
		this.type = type.toString().toLowerCase(); 
		this.fromX = fromX;
		this.fromY = fromY;
		this.toX = toX;
		this.toY = toY;
	}
	
	@Override
	public String toString() {
		Gson gson = new Gson();
		return gson.toJson(this);
	}

}
