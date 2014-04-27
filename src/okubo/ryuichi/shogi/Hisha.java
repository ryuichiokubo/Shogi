package okubo.ryuichi.shogi;

final class Hisha extends Piece {

	Hisha() {
		this.prom = "ryu";
		this.move = new int[][] {{0, 1, 1}, {1, 0, 1}, {0, -1, 1}, {-1, 0, 1}};
	}

}
