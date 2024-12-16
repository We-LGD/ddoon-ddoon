import { PositionProps } from '@/utils/interface/constants';

const buttonPositions: { [key: string]: PositionProps } = {
  default: { top: '39%', left: '25%' },
  4: { top: '37%', left: '21%' },
  8: { top: '39%', left: '35%' },
};

export function getClickButtonPosition(index: number): PositionProps {
  return buttonPositions[index.toString()] || buttonPositions.default;
}
