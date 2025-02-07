import { ChildrenProps } from '@/shared/interface/atomsType';

export default function ToolTip({ children }: ChildrenProps) {
  return (
    <div className="absolute invisible top-[80%] horizontal-center opacity-0 group-hover:visible group-hover:opacity-80 transition text-[0.7rem] text-black bg-white rounded-md px-2 py-1 whitespace-nowrap z-50">
      {children}
    </div>
  );
}
