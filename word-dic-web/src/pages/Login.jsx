import React, {useEffect, useState} from 'react';
import { login } from '../api/user';
import useUserStore from '../recoil/user';
// import {trackEvent} from "../logging/amplitude";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setToken} = useUserStore();

  const goToRegister = () => {
    window.location.href = '/signup'
  }

  const geToTumblbug = () => {
    const url = 'https://tumblbug.com/perfect_emotion_dic';
    window.open(url, '_blank');
  }

  const handleLogin = async () => {
    try {
      const res = await login({
        email, password
      })
      
      if(res.type === '없음'){
        return alert('가입된 이메일이 아닙니다')
      }

      if(res.type === '비번오류'){
        return alert('비밀번호가 틀렸습니다')
      }

      alert(res.license)
      setToken(res.license)
      window.location.href = '/'

      return alert('로그인 완료')

    } catch (error) {
      console.error('로그인 중 오류:', error);
    }
  };

  return (
    <div className='flex items-center justify-center mx-60r mt-200r'>
      <div className="flex flex-col items-center w-500r">
      <img className='w-70r h-70r' src="/emoji/행복하다.png" alt="웃는얼굴" />
      <h2 className='font-bold headline-1 mt-10r mb-70r'>환영합니다</h2>
      <form className='flex flex-col w-full h-full gap-30r' action="">
        <input
          className='border-b-2 font-medium text-[#444444] outline-none w-full p-10r'
          type="email"
          placeholder='이메일'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='border-b-2 font-medium text-[#444444] outline-none w-full p-10r'
          type="password"
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button
        className="w-full px-4r py-14r my-30r rounded-3xl text-white font-semibold bg-gradient-to-r from-[#E94C5E] via-[#E9721B] to-[#768CFF] hover:opacity-70"
        onClick={handleLogin}
      >
        로그인
      </button>
      <button onClick={goToRegister} className='font-semibold text-[#b4b4b4]'>회원가입</button>
      <button onClick={geToTumblbug}
      className='absolute bottom-100r font-semibold text-[#b4b4b4]'>계정을 분실했나요?</button>
      </div>
    </div>
  );
};

export default Login;