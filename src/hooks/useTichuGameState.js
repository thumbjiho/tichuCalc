import { useEffect, useState } from "react";
import {
  TICHU_STATUS,
  getNextTichuStatus,
  calculateTeamTichuScores,
} from "../utils/tichuHelpers";

export function useTichuGameState({
  setTichuScores,
  setIsDoubleWin,
  setDoubleWinTeam,
}) {
  const [players, setPlayers] = useState([
    {
      id: "p1",
      name: "Jojo",
      team: "Blue",
      baseTichuStatus: TICHU_STATUS.NO_TICHU,
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      displayOrder: null,
      isSelected: false,
    },
    {
      id: "p2",
      name: "Lizzy",
      team: "Blue",
      baseTichuStatus: TICHU_STATUS.NO_TICHU,
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      displayOrder: null,
      isSelected: false,
    },
    {
      id: "p3",
      name: "Jiang",
      team: "Yellow",
      baseTichuStatus: TICHU_STATUS.NO_TICHU,
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      displayOrder: null,
      isSelected: false,
    },
    {
      id: "p4",
      name: "Hoo",
      team: "Yellow",
      baseTichuStatus: TICHU_STATUS.NO_TICHU,
      tichuStatus: TICHU_STATUS.NO_TICHU,
      order: null,
      displayOrder: null,
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
          ? {
              ...p,
              isSelected: !p.isSelected,
              order: null,
              displayOrder: null,
            }
          : p
      );

      const selected = toggled
        .filter((p) => p.isSelected)
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

      let first = selected[0];
      let second = selected[1];
      const isDouble = first && second && first.team === second.team;
      const doubleTeam = isDouble ? first.team : null;

      const final = toggled.map((p) => {
        if (!p.isSelected) {
          return {
            ...p,
            order: null,
            displayOrder: null,
            tichuStatus: p.baseTichuStatus,
          };
        }
        const actualOrder =
          selected.findIndex((sp) => sp.id === p.id) + 1;
        const displayOrder =
          isDouble && (p.id === first.id || p.id === second.id)
            ? "1 & 2"
            : actualOrder;
        return { ...p, order: actualOrder, displayOrder };
      });

      setIsDoubleWin?.(isDouble);
      setDoubleWinTeam?.(doubleTeam);
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
    setPlayers?.(players); // App에 전달
  }, [players]);

  useEffect(() => {
    const [blue, yellow] = calculateTeamTichuScores(players);
    setTichuScores([blue, yellow]);
  }, [players, setTichuScores]);

  return {
    players,
    handlePlayerClick,
    handleStatusClick,
  };
}
