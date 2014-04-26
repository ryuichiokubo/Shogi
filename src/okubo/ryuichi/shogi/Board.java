package okubo.ryuichi.shogi;

import java.util.Map;

final class Board {

	private final Piece[][] square;

	public Board(int row, int column) {
		square = new Piece[row][column];
	}

	public void setPiece(int x, int y, Map data) {
		Piece piece = new Piece(data);
		//int x = (int) (double) data.get("x");
		//int y = (int) (double) data.get("y");
		square[x][y] = piece;
	}
	
	@Override
	public String toString() {
		String res = "";
		String piece = "";
		
		for (int i = 0; i < square.length; i++) {			
			for (int j = 0; j < square[i].length; j++) {
				piece = square[i][j] != null ? square[i][j].toString() : " ";
				res += "{" + i + ", " + j + ": " + piece + "}";
			}
		}
		
		return res;
	}

}
