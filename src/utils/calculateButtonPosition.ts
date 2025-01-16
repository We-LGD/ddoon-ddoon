const calculateButtonPosition = (id: number, bottom: number) => {
  const positionAdjustments: Record<number, number> = {
    6: -1.2,
    12: -0.8,
    14: -1,
    20: -1.2,
    21: -0.7,
    22: -0.8,
  };

  if (positionAdjustments[id] !== undefined) {
    return bottom + positionAdjustments[id];
  }

  if (id > 2 && id < 10) {
    return bottom - 1;
  } else if (id >= 10 && id < 11) {
    return bottom - 1;
  } else if (id >= 12 && id < 31) {
    return bottom - 0.9;
  }

  return bottom - 0.7;
};

export default calculateButtonPosition;
