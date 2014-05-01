package okubo.ryuichi.shogi;

final class Kin extends Piece {

	Kin(int x, int y, boolean mine) {
		super("kin", x, y, mine, "", new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}});
	}

}
