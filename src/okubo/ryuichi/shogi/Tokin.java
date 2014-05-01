package okubo.ryuichi.shogi;

final class Tokin extends Piece {

	Tokin(int x, int y, boolean mine) {
		super("tokin", x, y, mine, "", new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}});
	}

}
