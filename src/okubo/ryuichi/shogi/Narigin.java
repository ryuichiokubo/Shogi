package okubo.ryuichi.shogi;

final class Narigin extends Piece {

	Narigin(int x, int y, boolean mine) {
		super("narigin", x, y, mine, "", new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}});
	}

}
