import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';
import useUserStore from '../stores/user';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { userToken } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!userToken) {
      router.replace('/login');
    }
  }, [userToken, router]);

  if (!userToken) {
    return null; // 또는 로딩 스피너를 반환할 수 있습니다.
  }

  return <>{children}</>;
};

export default PrivateRoute;