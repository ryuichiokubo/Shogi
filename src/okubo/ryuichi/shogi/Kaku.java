package okubo.ryuichi.shogi;

final class Kaku extends Piece {

	Kaku(int x, int y, boolean mine) {
		super("kaku", x, y, mine, "uma", new int[][] {{-1, 1, 1}, {1, 1, 1}, {1, -1, 1}, {-1, -1, 1}});
	}

}
