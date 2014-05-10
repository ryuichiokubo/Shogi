package okubo.ryuichi.shogi;

import com.google.gson.Gson;

final class Hand {
	
	@SuppressWarnings("unused")
	private final String type;
	
	@SuppressWarnings("unused")
	private final int fromX;
	
	@SuppressWarnings("unused")
	private final int fromY;
	
	@SuppressWarnings("unused")
	private final int toX;
	
	@SuppressWarnings("unused")
	private final int toY;
	
	private int score = 0;

	Hand(Piece.Type type, int fromX, int fromY, int toX, int toY) {
		this.type = type.toString().toLowerCase(); 
		this.fromX = fromX;
		this.fromY = fromY;
		this.toX = toX;
		this.toY = toY;
	}
	
	void setScore(int score) {
		this.score = score;
	}
	
	int getScore() {
		return score;
	}
	
	@Override
	public String toString() {
		Gson gson = new Gson();
		return gson.toJson(this);
	}

}
