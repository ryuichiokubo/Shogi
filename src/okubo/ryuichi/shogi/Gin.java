package okubo.ryuichi.shogi;

final class Gin extends Piece {

	Gin(int x, int y, boolean mine) {
		super("gin", x, y, mine, "narigin", new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, -1}, {1, -1}});
	}

}
