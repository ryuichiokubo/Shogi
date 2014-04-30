package okubo.ryuichi.shogi;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Logger;

final class Board {

	private final Piece[][] square;

	public Board(int row, int column) {
		square = new Piece[row][column];
	}

	public void setPiece(String type, int x, int y, boolean mine) {
		Piece piece = Piece.getInstance(type, x, y, mine);
		square[x][y] = piece;
	}
	
	public Hand getNextHand() {
		List<Hand> hands = new ArrayList<Hand>();
		
		for (int i = 0; i < square.length; i++) {			
			for (int j = 0; j < square[i].length; j++) {
				if (square[i][j] != null && square[i][j].isMine() == false) {
					Logger.global.info("square[i][j]: " + square[i][j].toString());
					int[][] move = square[i][j].getMove();
					for (int k = 0; k < move.length; k++) {
						//Logger.global.info("move2: " + move[i][2]);
						int newX = i+move[k][0];
						int newY = j+move[k][1];
						Logger.global.info("newXY: " + newX + ", " + newY);
						if (newX >= 0 && newX < square.length && newY >= 0 && newY < square[i].length) {
							Piece newPlace = square[newX][newY];
							if (newPlace == null || newPlace.isMine() == true) {
								if (newPlace != null) {
									Logger.global.info("newPlace: " + newPlace.toString());
								} else {
									Logger.global.info("newPlace: " + "null");								
								}
								hands.add(new Hand(square[i][j].getType(), i, j, newX, newY, false));
							}
						}
					}
					
				}
			}
		}
		Logger.global.info("hands: " + hands.toString());

		// XXX get highest score from hands
		int rand = (int) Math.floor(Math.random() * hands.size());
		return hands.get(rand);
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
