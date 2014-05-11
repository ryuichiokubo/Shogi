package okubo.ryuichi.shogi;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

final class Board implements Cloneable {

	private Piece[][] square = null;
	private final int row;
	private final int column;

	Board(int row, int column) {
		this.row = row;
		this.column = column;
		square = new Piece[row][column];
	}

	void clear() {
		square = new Piece[row][column];
	}
	
	void setPiece(String type, int x, int y, boolean mine) {
		Piece piece = Game.getPiece(type, mine);
		square[x][y] = piece;
	}
	
	public void movePiece(Hand h) {
		Piece piece = Game.getPiece(h.type, false);
		square[h.toX][h.toY] = piece;
		if (isInBoard(h.fromX, h.fromY)) {
			square[h.fromX][h.fromY] = null;
		}
	}

	private boolean isInBoard(int x, int y) {
		// XXX row and column number are same for now
		if (x >= 0 && x < square.length && y >= 0 && y < square.length) {
			return true;
		} else {
			return false;
		}
	}

	private boolean canPromote(Piece piece, int oldY, int nextY, boolean isPlayer) {
		boolean piece_ok = false;
		boolean place_ok = false;
		
		piece_ok = (piece.getProm() != null);
		
		if (isPlayer) {
			place_ok = (oldY <= 2 || nextY <= 2);			
		} else {
			place_ok = (oldY >= 6 || nextY >= 6);
		}
		return piece_ok && place_ok;
	}

	// Get available hands for one piece
	private List<Hand> getAvailableHands(Piece piece, int x, int y, boolean isPlayer) {
		List<Hand> hands = new ArrayList<Hand>();
		
		int[][] move = piece.getMove(isPlayer);
		
		for (int i = 0; i < move.length; i++) {		
			for (int j = 1; ; j++) {
				boolean stop = false;
				Piece captured = null;
				int nextX = x + move[i][0] * j;
				int nextY = y + move[i][1] * j;
								
				if (isInBoard(nextX, nextY)) {
					captured = square[nextX][nextY];
					
					if (captured == null || captured.isPlayer() != isPlayer) {
						addToHands(hands, piece, x, y, nextX, nextY, captured, isPlayer);
					}
				}		
				
				if (captured != null || !isInBoard(nextX, nextY)) {
					stop = true;
				}
				
				if (move[i].length < 3 || move[i][2] != 1 || stop) {
					break;
				}
			}
		}

		return hands;	
	}
	
	private void addToHands(List<Hand> hands, Piece piece, int x, int y, int nextX, int nextY, Piece captured, boolean isPlayer) {

		Game game = Game.getInstance();
		
		Hand h1 = new Hand(piece.getType(), x, y, nextX, nextY);
		h1.setScore(game.calcScore(h1, captured, false, isPlayer));
		hands.add(h1);
		
		if (canPromote(piece, y, nextY, isPlayer)) {
			Hand h2 = new Hand(piece.getProm(), x, y, nextX, nextY);
			h2.setScore(game.calcScore(h2, captured, true, isPlayer));
			hands.add(h2);							
		}
	}

	List<Hand> getAvailableHands(boolean isPlayer) {
		List<Hand> hands = new ArrayList<Hand>();
		
		for (int i = 0; i < square.length; i++) {			
			for (int j = 0; j < square[i].length; j++) {
				Piece piece = square[i][j];
				if (piece != null && piece.isPlayer() == isPlayer) {
					// AI's piece found. Get available hands on this piece.
					hands.addAll(getAvailableHands(piece, i, j, isPlayer));
				}
			}
		}
		Logger.global.info("player:" + isPlayer + " hands: " + hands.toString());

		return hands;
	}
	
	List<Map<String, Integer>> getEmptySquare() {
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

	boolean hasInColumn(Piece.Type type, Integer column, boolean isPlayer) {
		boolean res = false;
		
		for (int i = 0; i < square[column].length; i++) {
			Piece onCol = square[column][i];
			if (onCol != null && onCol.getType() == type && onCol.isPlayer() == isPlayer) {
				res = true;
				break;
			}
		}
		
		return res;
	}

	@Override
	public Board clone() throws CloneNotSupportedException {
		Board cloned = (Board) super.clone();
		cloned.square = square.clone();
		for (int i = 0; i < cloned.square.length; i++) {
			cloned.square[i] = square[i].clone();
		}
		return cloned;
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
