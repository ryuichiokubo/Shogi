package okubo.ryuichi.shogi;

final class Kin extends Piece {

	Kin() {
		this.prom = "";
		this.move = new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}};
	}

}
