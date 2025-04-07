import { PositionProps } from '@/pages/interface';

const failurePositions: { [key: number]: PositionProps } = {
  1: { top: '39.2%', left: '5.2%', width: '29.8%' },
  4: { top: '54%', left: '18%', width: '27%' },
  7: { top: '64%', left: '40%', width: '30%' },
  8: { top: '73%', left: '68.5%', width: '31.5%' },
  9: { top: '83%', left: '11%', width: '31%' },
};

export function getFailureImagePosition(idx: number, style: PositionProps): PositionProps {
  return failurePositions[idx] || style;
}
