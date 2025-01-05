import { TitleProps } from '@/shared/interface/atomsType';

function Title({ children }: TitleProps) {
  return <h1 className="text-[1.125rem] font-bold mt-4 mb-4">{children}</h1>;
}

export default Title;
