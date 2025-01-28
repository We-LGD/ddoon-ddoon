import { ChildrenProps } from '@/shared/interface/atomsType';

export default function Title({ children }: ChildrenProps) {
  return <h1 className="text-[1.125rem] font-bold mt-4 mb-4">{children}</h1>;
}
