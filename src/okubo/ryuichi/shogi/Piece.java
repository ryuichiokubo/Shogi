package okubo.ryuichi.shogi;

class Piece {
	
	enum Type {
		O(1000, null, new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {-1, -1}, {0, -1}, {1, -1}}),
		RYU(800, null, new int[][] {{0, 1, 1}, {1, 0, 1}, {0, -1, 1}, {-1, 0, 1}, {-1, 1}, {1, 1}, {1, -1}, {-1, -1}}),
		UMA(800, null, new int[][] {{-1, 1, 1}, {1, 1, 1}, {1, -1, 1}, {-1, -1, 1}, {0, -1}, {1, 0}, {0, 1}, {-1, 0}}),
		NARIGIN(500, null, new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}),
		NARIKEI(250, null, new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}),
		NARIKYO(250, null, new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}),
		TOKIN(100, null, new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}),

		HISHA(700, Type.RYU, new int[][] {{0, 1, 1}, {1, 0, 1}, {0, -1, 1}, {-1, 0, 1}}),
		KAKU(700, Type.UMA, new int[][] {{-1, 1, 1}, {1, 1, 1}, {1, -1, 1}, {-1, -1, 1}}),
		KIN(400, null, new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, 0}, {1, 0}, {0, -1}}),
		GIN(300, Type.NARIGIN, new int[][] {{-1, 1}, {0, 1}, {1, 1}, {-1, -1}, {1, -1}}),
		KEIMA(150, Type.NARIKEI, new int[][] {{-1, 2}, {1, 2}}),
		KYOSHA(150, Type.NARIKYO, new int[][] {{0, 1, 1}}),
		HU(50, Type.TOKIN, new int[][] {{0, 1}});

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

		int[][] getMove(boolean isPlayer) {
			if (isPlayer) {
				int[][] player_move = move.clone();
				for (int i = 0; i < move.length; i++) {
					player_move[i] = move[i].clone();
					player_move[i][1] = -move[i][1];
				}
				return player_move;
			} else {
				return move;
			}
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

	int[][] getMove(boolean isPlayer) {
		return type.getMove(isPlayer);
	}

	Type getProm() {
		return type.getProm();
	}
	
	@Override
	public String toString() {
		return type.toString() + "(" + player + ")";
	}
}
