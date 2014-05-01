package okubo.ryuichi.shogi;

final class Narikei extends Piece {

	Narikei(int x, int y, boolean mine) {
		super("narikei", x, y, mine, "", new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}});
	}

}
