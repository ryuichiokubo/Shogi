package okubo.ryuichi.shogi;

final class Uma extends Piece {

	Uma(int x, int y, boolean mine) {
		super("uma", x, y, mine, "", new int[][] {{-1, 1, 1}, {1, 1, 1}, {1, -1, 1}, {-1, -1, 1}, {0, -1}, {1, 0}, {0, 1}, {-1, 0}});
	}

}
