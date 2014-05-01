package okubo.ryuichi.shogi;

final class Kyosha extends Piece {

	Kyosha(int x, int y, boolean mine) {
		super("kyosha", x, y, mine, "narikyo", new int[][] {{0, 1, 1}});
	}

}
