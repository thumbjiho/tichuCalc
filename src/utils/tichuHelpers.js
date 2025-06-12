export const TICHU_STATUS = {
  NO_TICHU: "NO TICHU",
  SMALL_TICHU: "SMALL TICHU",
  LARGE_TICHU: "LARGE TICHU",
  ST_FAIL: "ST FAIL!",
  LT_FAIL: "LT FAIL!",
  ST_SUCCESS: "ST SUCCESS!",
  LT_SUCCESS: "LT SUCCESS!",
  DOUBLE_WIN: "DOUBLE WIN!",
  NONE: "NONE",
};

export function getNextTichuStatus(current) {
  switch (current) {
    case TICHU_STATUS.NO_TICHU:
      return TICHU_STATUS.SMALL_TICHU;
    case TICHU_STATUS.SMALL_TICHU:
      return TICHU_STATUS.LARGE_TICHU;
    case TICHU_STATUS.LARGE_TICHU:
      return TICHU_STATUS.NO_TICHU;
    default:
      return TICHU_STATUS.NO_TICHU;
  }
}

export function calculateTeamTichuScores(players) {
  let blue = 0,
    yellow = 0;
  for (const p of players) {
    let pt = 0;
    switch (p.tichuStatus) {
      case TICHU_STATUS.ST_SUCCESS:
        pt = 100;
        break;
      case TICHU_STATUS.ST_FAIL:
        pt = -100;
        break;
      case TICHU_STATUS.LT_SUCCESS:
        pt = 200;
        break;
      case TICHU_STATUS.LT_FAIL:
        pt = -200;
        break;
      case TICHU_STATUS.DOUBLE_WIN:
        pt = 200;
        break;
      default:
        pt = 0;
    }
    if (p.team === "Blue") blue += pt;
    else if (p.team === "Yellow") yellow += pt;
  }
  return [blue, yellow];
}
