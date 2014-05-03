package okubo.ryuichi.shogi;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

final class Captive {

	Map<String, List<Piece>> pieces = new HashMap<String, List<Piece>>();
	
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
		
		if (pieces.containsKey(piece.type)) {
			Logger.global.info("containsKey: " + piece.type);

			sameTypes = pieces.get(piece.type);
		} else {
			Logger.global.info("NOT containsKey: " + piece.type);
			sameTypes = new ArrayList<Piece>();
		}
		sameTypes.add(piece);
		pieces.put(piece.type, sameTypes);
	}

	public void clear() {
		pieces.clear();
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
