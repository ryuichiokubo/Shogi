package okubo.ryuichi.shogi;

final class Narikei extends Piece {

	Narikei() {
		this.prom = "";
		this.move = new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}};
	}

}
