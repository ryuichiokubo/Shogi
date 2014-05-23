package okubo.ryuichi.shogi;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;

import okubo.ryuichi.shogi.Game.Player;

final class Captive {

	// XXX combine with board
	// <-- board and mochigoma should be always taken into account together
	
	Map<Piece.Type, List<Piece>> pieces = new EnumMap<Piece.Type, List<Piece>>(Piece.Type.class);
	
	private static final Captive MY = new Captive(Player.HUMAN);
	private static final Captive AI = new Captive(Player.AI);
	
	private Player player;
	
	private Captive(Player p) {
		player = p;
	}
	
	static Captive getInstance(Player p) {
		if (p == Player.HUMAN) {
			return MY;
		} else {
			return AI;
		}
	}
	
	void setCaptive(Piece piece) {
		List<Piece> same_types;
		
		if (pieces.containsKey(piece)) {
			same_types = pieces.get(piece.getType());
		} else {
			same_types = new ArrayList<Piece>();
		}
		same_types.add(piece);
		pieces.put(piece.getType(), same_types);
	}

	void clear() {
		pieces.clear();
	}
	
	List<Hand> getAvailableHands() {
		List<Hand> hands = new ArrayList<Hand>();
		Board board = Game.getInstance().getBoard();
		
		Set<Piece.Type> keys = pieces.keySet();
		for (Piece.Type k: keys) {
			for (Map<String, Integer> square: board.getEmptySquare()) {
				if (k == Piece.Type.HU && board.hasInColumn(Piece.Type.HU, square.get("x"), player)) {
					continue; // XXX skip this column
				} else {
					addToHands(hands, k, -1, -1, square.get("x"), square.get("y"));
				}
			}
		}

		return hands;
	}
	
	private void addToHands(List<Hand> hands, Piece.Type type, int fromX, int fromY, int toX, int toY) {
		Game game = Game.getInstance();

		Hand h = new Hand(type, fromX, fromY, toX, toY);
		h.setScore(game.calcScore(h, null, false, player));
		hands.add(h);
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
