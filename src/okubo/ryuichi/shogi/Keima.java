package okubo.ryuichi.shogi;

final class Keima extends Piece {

	Keima(int x, int y, boolean mine) {
		super("keima", x, y, mine, "narikei", new int[][] {{-1, 2}, {1, 2}});
	}

}
