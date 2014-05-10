package okubo.ryuichi.shogi;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

final class Board {

	private static Piece[][] square = null;
	private static int row;
	private static int column;
	
	private static final Board instance = new Board();

	private Board() {}
	
	public static Board getInstance(int row, int column) {
		if (square == null) {
			Board.row = row;
			Board.column = column;
			square = new Piece[row][column];
		}
		return instance;
	}

	public static Board getInstance() {
		return instance;
	}
	
	public void clear() {
		square = new Piece[row][column];
	}
	
	public void setPiece(String type, int x, int y, boolean mine) {
		Piece piece = Game.getPiece(type, mine);
		square[x][y] = piece;
	}
	
	private boolean isInBoard(int newX, int newY) {
		// XXX row and column number is same for now
		if (newX >= 0 && newX < square.length && newY >= 0 && newY < square.length) {
			return true;
		} else {
			return false;
		}
	}

	private boolean canPromote(Piece piece, int oldY, int newY) {
		boolean pieceOk = false;
		boolean placeOk = false;
		
		pieceOk = (piece.getProm() != null);
		placeOk = (oldY >= 6 || newY >= 6);
		
		return pieceOk && placeOk;
	}

	// Get available hands for one piece
	private List<Hand> getAvailableHands(Piece piece, int x, int y) {
		List<Hand> hands = new ArrayList<Hand>();
		
		int[][] move = piece.getMove();
		for (int i = 0; i < move.length; i++) {		
			for (int j = 1; ; j++) {
				boolean stop = false;
				Piece newPlace = null;
				int newX = x + move[i][0] * j;
				int newY = y + move[i][1] * j;
								
				if (isInBoard(newX, newY)) {
					newPlace = square[newX][newY];
					
					if (newPlace == null || newPlace.isPlayer() == true) {
						hands.add(new Hand(piece.getType(), x, y, newX, newY));
						if (canPromote(piece, y, newY)) {
							hands.add(new Hand(piece.getProm(), x, y, newX, newY));							
						}
					}
				}					
				
				if (newPlace != null || !isInBoard(newX, newY)) {
					stop = true;
				}
				
				if (move[i].length < 3 || move[i][2] != 1 || stop) {
					break;
				}
			}
		}

		return hands;	
	}
	
	public List<Hand> getAvailableHands() {
		List<Hand> hands = new ArrayList<Hand>();
		
		for (int i = 0; i < square.length; i++) {			
			for (int j = 0; j < square[i].length; j++) {
				Piece piece = square[i][j];
				if (piece != null && piece.isPlayer() == false) {
					// AI's piece found. Get available hands on this piece.
					hands.addAll(getAvailableHands(piece, i, j));
				}
			}
		}
		Logger.global.info("hands: " + hands.toString());

		return hands;
	}
	
	public List<Map<String, Integer>> getEmptySquare() {
		List<Map<String, Integer>> squares = new ArrayList<Map<String, Integer>>();
		for (int i = 0; i < square.length; i++) {			
			for (int j = 0; j < square[i].length; j++) {
				if (square[i][j] == null) {
					Map<String, Integer> xy = new HashMap<String, Integer>();
					xy.put("x", i);
					xy.put("y", j);
					squares.add(xy);
				}
			}
		}
		
		return squares;

	}

	public boolean hasInColumn(Piece.Type type, Integer column) {
		boolean res = false;
		
		for (int i = 0; i < square[column].length; i++) {
			Piece onCol = square[column][i];
			if (onCol != null && onCol.getType() == type) {
				res = true;
				break;
			}
		}
		
		return res;
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
