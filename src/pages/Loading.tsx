import { Images } from '@/shared/assets/images';
import Layout from '@/shared/components/templates/Layout';

export default function LoadingPage() {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="relative w-64">
          <img src={Images.LoadingBar} className="w-full" />
          <img src={Images.로딩뚠뚠} className="absolute w-16 bottom-12 left-0 animate-loading" />
        </div>
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    </Layout>
  );
}
