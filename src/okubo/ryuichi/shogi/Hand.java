package okubo.ryuichi.shogi;

import com.google.gson.Gson;

final class Hand implements Comparable<Hand> {
	
	final String type;
	final int fromX;
	final int fromY;
	final int toX;
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

	// inconsistent with equals (compareTo checks only score while equals check other fields)
	@Override
	public int compareTo(Hand h) {
		return score - h.score; // score can't be too big number (calculation result can't exceed Integer.MAX_VALUE)
	}
}
