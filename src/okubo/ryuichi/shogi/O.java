package okubo.ryuichi.shogi;

final class O extends Piece {

	O(int x, int y, boolean mine) {
		super("o", x, y, mine, "", new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {-1, -1}, {0, -1}, {1, -1}});
	}

}
