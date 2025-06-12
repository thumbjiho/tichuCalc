import { useEffect, useState } from "react";
import {
  TICHU_STATUS,
  getNextTichuStatus,
  calculateTeamTichuScores,
} from "../utils/tichuHelpers";

export function useTichuGameState({
  setTichuScores,
  setIsDoubleWin,
}) {
  const [players, setPlayers] = useState([
    {
      id: "p1",
      name: "Jojo",
      team: "Blue",
      baseTichuStatus: TICHU_STATUS.NO_TICHU,
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      isSelected: false,
    },
    {
      id: "p2",
      name: "Lizzy",
      team: "Blue",
      baseTichuStatus: TICHU_STATUS.NO_TICHU,
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      isSelected: false,
    },
    {
      id: "p3",
      name: "Jiang",
      team: "Yellow",
      baseTichuStatus: TICHU_STATUS.NO_TICHU,
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      isSelected: false,
    },
    {
      id: "p4",
      name: "Hoo",
      team: "Yellow",
      baseTichuStatus: TICHU_STATUS.NO_TICHU,
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      isSelected: false,
    },
  ]);

  const updateTichuStatuses = (players) => {
    return players.map((p) => {
      const teammates = players.filter(
        (tp) => tp.team === p.team && tp.id !== p.id
      );
      const teammateOrder = teammates[0]?.order;
      const { order, baseTichuStatus } = p;
      if (!order || baseTichuStatus === TICHU_STATUS.NO_TICHU)
        return p;

      if (baseTichuStatus === TICHU_STATUS.SMALL_TICHU)
        return {
          ...p,
          tichuStatus:
            order === 1
              ? TICHU_STATUS.ST_SUCCESS
              : TICHU_STATUS.ST_FAIL,
        };
      if (baseTichuStatus === TICHU_STATUS.LARGE_TICHU)
        return {
          ...p,
          tichuStatus:
            order === 1
              ? TICHU_STATUS.LT_SUCCESS
              : TICHU_STATUS.LT_FAIL,
        };
      if (order === 2 && teammateOrder === 1)
        return { ...p, tichuStatus: TICHU_STATUS.DOUBLE_WIN };

      return { ...p, tichuStatus: TICHU_STATUS.NONE };
    });
  };

  const handlePlayerClick = (clickedId) => {
    setPlayers((prev) => {
      let toggled = prev.map((p) =>
        p.id === clickedId
          ? { ...p, isSelected: !p.isSelected, order: null }
          : p
      );
      const selected = toggled
        .filter((p) => p.isSelected)
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
      const final = toggled.map((p) =>
        p.isSelected
          ? {
              ...p,
              order: selected.findIndex((sp) => sp.id === p.id) + 1,
            }
          : { ...p, order: null, tichuStatus: p.baseTichuStatus }
      );
      return updateTichuStatuses(final);
    });
  };

  const handleStatusClick = (id) => {
    setPlayers((prev) => {
      const updated = prev.map((p) =>
        p.id === id
          ? {
              ...p,
              baseTichuStatus: getNextTichuStatus(p.baseTichuStatus),
              tichuStatus: getNextTichuStatus(p.baseTichuStatus),
            }
          : p
      );
      return updateTichuStatuses(updated);
    });
  };

  useEffect(() => {
    const [blue, yellow] = calculateTeamTichuScores(players);
    setTichuScores([blue, yellow]);
    const first = players.find((p) => p.order === 1);
    const second = players.find((p) => p.order === 2);
    setIsDoubleWin(first && second && first.team === second.team);
  }, [players]);

  return { players, handlePlayerClick, handleStatusClick };
}
