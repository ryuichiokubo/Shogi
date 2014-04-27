package okubo.ryuichi.shogi;
final class Board {

	private final Piece[][] square;

	public Board(int row, int column) {
		square = new Piece[row][column];
	}

	public void setPiece(String type, int x, int y, boolean mine) {
		Piece piece = Piece.getInstance(type, x, y, mine);
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
