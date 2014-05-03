package okubo.ryuichi.shogi;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

final class Board {

	private final Piece[][] square;
	private List<Piece> captives;

	public Board(int row, int column) {
		square = new Piece[row][column];
	}

	public void setPiece(String type, int x, int y, boolean mine) {
		Piece piece = Game.getPiece(type, x, y, mine);
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
		
		pieceOk = (piece.prom != null && piece.prom.length() > 0);
		placeOk = (oldY >= 6 || newY >= 6);
		
		return pieceOk && placeOk;
	}

	// Get available hands for one piece
	private List<Hand> getAvailableHands(Piece piece, int x, int y) {
		List<Hand> hands = new ArrayList<Hand>();
		
		//Logger.global.info("piece: " + piece.toString());
		
		int[][] move = piece.getMove();
		for (int i = 0; i < move.length; i++) {		
			for (int j = 1; ; j++) {
				boolean stop = false;
				Piece newPlace = null;
				int newX = x + move[i][0] * j;
				int newY = y + move[i][1] * j;
				
				//Logger.global.info("newXY: " + newX + ", " + newY);
				
				if (isInBoard(newX, newY)) {
					newPlace = square[newX][newY];
					
					if (newPlace != null) {
						//Logger.global.info("newPlace: " + newPlace.toString());
					} else {
						//Logger.global.info("newPlace: " + "null");								
					}

					if (newPlace == null || newPlace.isMine() == true) {
						hands.add(new Hand(piece.getType(), x, y, newX, newY));
						if (canPromote(piece, y, newY)) {
							hands.add(new Hand(piece.getPromType(), x, y, newX, newY));							
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
	
	// Check all available hands and return the best one
	public List<Hand> getAvailableHands() {
		List<Hand> hands = new ArrayList<Hand>();
		
		for (int i = 0; i < square.length; i++) {			
			for (int j = 0; j < square[i].length; j++) {
				if (square[i][j] != null && square[i][j].isMine() == false) {
					hands.addAll(getAvailableHands(square[i][j], i, j));
				}
			}
		}
		//Logger.global.info("hands: " + hands.toString());

		return hands;
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
