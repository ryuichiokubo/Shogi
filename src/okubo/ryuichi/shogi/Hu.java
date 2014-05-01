package okubo.ryuichi.shogi;

final class Hu extends Piece {

	Hu(int x, int y, boolean mine) {
		super("hu", x, y, mine, "tokin", new int[][] {{0, 1}});
	}
}
