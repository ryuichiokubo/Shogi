package okubo.ryuichi.shogi;

final class Hisha extends Piece {

	Hisha(int x, int y, boolean mine) {
		super("hisha", x, y, mine, "ryu", new int[][] {{0, 1, 1}, {1, 0, 1}, {0, -1, 1}, {-1, 0, 1}});
	}

}
