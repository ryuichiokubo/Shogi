package okubo.ryuichi.shogi;

final class Ryu extends Piece {

	Ryu(int x, int y, boolean mine) {
		super("ryu", x, y, mine, "", new int[][] {{0, 1, 1}, {1, 0, 1}, {0, -1, 1}, {-1, 0, 1}, {-1, 1}, {1, 1}, {1, -1}, {-1, -1}});
	}

}
