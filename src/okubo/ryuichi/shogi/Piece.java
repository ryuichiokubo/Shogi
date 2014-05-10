package okubo.ryuichi.shogi;

class Piece {
	
	enum Type {
		O(100, null, new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {-1, -1}, {0, -1}, {1, -1}}),
		RYU(80, null, new int[][] {{0, 1, 1}, {1, 0, 1}, {0, -1, 1}, {-1, 0, 1}, {-1, 1}, {1, 1}, {1, -1}, {-1, -1}}),
		UMA(80, null, new int[][] {{-1, 1, 1}, {1, 1, 1}, {1, -1, 1}, {-1, -1, 1}, {0, -1}, {1, 0}, {0, 1}, {-1, 0}}),
		NARIGIN(50, null, new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}),
		NARIKEI(25, null, new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}),
		NARIKYO(25, null, new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}),
		TOKIN(10, null, new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}),

		HISHA(70, Type.RYU, new int[][] {{0, 1, 1}, {1, 0, 1}, {0, -1, 1}, {-1, 0, 1}}),
		KAKU(70, Type.UMA, new int[][] {{-1, 1, 1}, {1, 1, 1}, {1, -1, 1}, {-1, -1, 1}}),
		KIN(40, null, new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}),
		GIN(30, Type.NARIGIN, new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, -1}, {1, -1}}),
		KEIMA(15, Type.NARIKEI, new int[][] {{-1, 2}, {1, 2}}),
		KYOSHA(15, Type.NARIKYO, new int[][] {{0, 1, 1}}),
		HU(5, Type.TOKIN, new int[][] {{0, 1}});

		private final int score;
		private final Type prom;
		private final int[][] move; // available position relative to current position [x, y, anywhere in this direction(1: true)]
		
		Type(int score, Type prom, int[][] move) {
			this.score = score;
			this.prom = prom;
			this.move = move;
		}

		Integer getScore() {
			return score;
		}

		Type getProm() {
			return prom;
		}

		int[][] getMove() {
			return move;
		}
	}
	
	private final Type type;
	
	private boolean player; // true: human, false: AI

	Piece(Type type) {
		this.type = type;
	}

	void setPlayer(boolean player) {
		this.player = player;
	}
	
	boolean isPlayer() {
		return player;
	}
	
	Type getType() {
		return type;
	}

	int[][] getMove() {
		return type.getMove();
	}

	Type getProm() {
		return type.getProm();
	}
	
	@Override
	public String toString() {
		return type.toString() + "(" + player + ")";
	}
}
