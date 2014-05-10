package okubo.ryuichi.shogi;

class Piece {
	
	enum Type {
		O(new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {-1, -1}, {0, -1}, {1, -1}}, null),
		RYU(new int[][] {{0, 1, 1}, {1, 0, 1}, {0, -1, 1}, {-1, 0, 1}, {-1, 1}, {1, 1}, {1, -1}, {-1, -1}}, null),
		UMA(new int[][] {{-1, 1, 1}, {1, 1, 1}, {1, -1, 1}, {-1, -1, 1}, {0, -1}, {1, 0}, {0, 1}, {-1, 0}}, null),
		NARIGIN(new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}, null),
		NARIKEI(new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}, null),
		NARIKYO(new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}, null),
		TOKIN(new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}, null),

		HISHA(new int[][] {{0, 1, 1}, {1, 0, 1}, {0, -1, 1}, {-1, 0, 1}}, Type.RYU),
		KAKU(new int[][] {{-1, 1, 1}, {1, 1, 1}, {1, -1, 1}, {-1, -1, 1}}, Type.UMA),
		KIN(new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}, null),
		GIN(new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, -1}, {1, -1}}, Type.NARIGIN),
		KEIMA(new int[][] {{-1, 2}, {1, 2}}, Type.NARIKEI),
		KYOSHA(new int[][] {{0, 1, 1}}, Type.NARIKYO),
		HU(new int[][] {{0, 1}}, Type.TOKIN);

		private final int[][] move; // available position relative to current position [x, y, anywhere in this direction(1: true)]
		private final Type prom;
		
		Type(int[][] move, Type prom) {
			this.move = move;
			this.prom = prom;
		}
		
		int[][] getMove() {
			return move;
		}

		Type getProm() {
			return prom;
		}
	}
	
	private final Type type;
	
	private boolean player; // true: human, false: AI

	public Piece(Type type) {
		this.type = type;
	}

	public void setPlayer(boolean player) {
		this.player = player;
	}
	
	public boolean isPlayer() {
		return player;
	}
	
	public Type getType() {
		return type;
	}

	public int[][] getMove() {
		return type.getMove();
	}

	public Type getProm() {
		return type.getProm();
	}
	
	@Override
	public String toString() {
		return type.toString() + "(" + player + ")";
	}
}
