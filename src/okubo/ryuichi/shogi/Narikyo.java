package okubo.ryuichi.shogi;

final class Narikyo extends Piece {

	Narikyo(int x, int y, boolean mine) {
		super("narikyo", x, y, mine, "", new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}});
	}

}
