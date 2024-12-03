import { TitleProps } from '@/shared/interface/atomsType';

function Title({ children }: TitleProps) {
  return <h1 className="text-[1.125rem] font-bold mb-4">{children}</h1>;
}

export default Title;
