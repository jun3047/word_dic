import { useRouter } from 'next/router';
import { useEffect, ReactNode, ComponentType } from 'react';
import useUserStore from '../stores/user';

interface LogoutRouteProps {
  component: ComponentType<any>;
}

const LogoutRoute = ({ component: Component }: LogoutRouteProps) => {
  const { userToken } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (userToken) {
      router.replace('/');
    }
  }, [userToken, router]);

  if (userToken) {
    return null; // 또는 로딩 스피너를 반환할 수 있습니다.
  }

  return <Component />;
};

export default LogoutRoute;