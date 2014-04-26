package okubo.ryuichi.shogi;

import java.util.Map;

final class Piece {

	private final String type;
	private final boolean mine;

	public Piece(Map data) {
		this.type = (String) data.get("type");
		this.mine = (boolean) data.get("mine");
	}

	@Override
	public String toString() {
		return type + "(" + mine + ")";
	}
}
