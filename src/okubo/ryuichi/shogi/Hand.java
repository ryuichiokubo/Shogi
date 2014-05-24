package okubo.ryuichi.shogi;

import com.google.gson.Gson;

final class Hand {
	
	@SuppressWarnings("unused")
	final String type;
	
	@SuppressWarnings("unused")
	final int fromX;
	
	@SuppressWarnings("unused")
	final int fromY;
	
	@SuppressWarnings("unused")
	final int toX;
	
	@SuppressWarnings("unused")
	final int toY;
	
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

	@Override
	public boolean equals(Object o) {
		if (!(o instanceof Hand)) {
			return false;
		}
		Hand h = (Hand) o;
		if (h.type == type && h.fromX == fromX && h.fromY == fromY && h.toX == toX && h.toY == toY) {
			return true;
		} else {
			return false;
		}
	}
}
