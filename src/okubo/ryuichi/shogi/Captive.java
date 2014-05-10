package okubo.ryuichi.shogi;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

final class Captive {

	Map<Piece.Type, List<Piece>> pieces
		= new EnumMap<Piece.Type, List<Piece>>(Piece.Type.class);
	
	private static final Captive MY = new Captive();
	private static final Captive AI = new Captive();
	
	private Captive() {}
	
	public static Captive getInstance(boolean mine) {
		if (mine) {
			return MY;
		} else {
			return AI;
		}
	}
	
	public void setCaptive(Piece piece) {
		List<Piece> sameTypes;
		
		if (pieces.containsKey(piece)) {
			sameTypes = pieces.get(piece.getType());
		} else {
			sameTypes = new ArrayList<Piece>();
		}
		sameTypes.add(piece);
		pieces.put(piece.getType(), sameTypes);
	}

	public void clear() {
		pieces.clear();
	}
	
	public List<Hand> getAvailableHands() {
		List<Hand> hands = new ArrayList<Hand>();
		Board board = Board.getInstance();
		
		Set<Piece.Type> keys = pieces.keySet();
		for (Piece.Type k: keys) {
			for (Map<String, Integer> square: board.getEmptySquare()) {
				if (k == Piece.Type.HU && board.hasInColumn(Piece.Type.HU, square.get("x"))) {
					continue; // XXX skip this column
				} else {
					hands.add(new Hand(k, -1, -1, square.get("x"), square.get("y")));
				}
			}
		}

		return hands;
	}
		
	@Override
	public String toString() {
		String res = "Captive: ";

		for (List<Piece> values: pieces.values()) {
			for (Piece p: values) {
				if (p != null) {
					res += "{" + p.toString() + "}";
				} else {
					res += "null";
				}
			}
		}
		
		return res;
	}
	
}
