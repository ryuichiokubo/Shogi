package okubo.ryuichi.shogi;

final class Ryu extends Piece {

	Ryu() {
		this.prom = "";
		this.move = new int[][] {{0, 1, 1}, {1, 0, 1}, {0, -1, 1}, {-1, 0, 1}, {-1, 1}, {1, 1}, {1, -1}, {-1, -1}};
	}

}
