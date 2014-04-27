package okubo.ryuichi.shogi;

final class Kaku extends Piece {

	Kaku() {
		this.prom = "uma";
		this.move = new int[][] {{-1, 1, 1}, {1, 1, 1}, {1, -1, 1}, {-1, -1, 1}};
	}

}
