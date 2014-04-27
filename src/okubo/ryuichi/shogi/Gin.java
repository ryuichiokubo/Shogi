package okubo.ryuichi.shogi;

final class Gin extends Piece {

	Gin() {
		this.prom = "narigin";
		this.move = new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, -1}, {1, -1}};
	}

}
