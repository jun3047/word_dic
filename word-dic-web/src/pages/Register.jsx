import React, {useState} from 'react';
import { login, register } from '../api/user';
import useUserStore from '../recoil/user';
// import {trackEvent} from "../logging/amplitude";

const Reigster = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const {setToken} = useUserStore();

  const geToTumblbug = () => {
    const url = 'https://tumblbug.com/perfect_emotion_dic';
    window.open(url, '_blank');
  }

  const geToLogin = () => {
    window.location.href = '/login'
  }

  const handleRegister = async () => {
    try {
      const res = await register({
        email, password, licKey: licenseKey
      })
      
      if(res.type === '틀림'){
        return alert('라이센스 키가 잘못되었습니다')
      }

      if(res.type === '중복'){
        return alert('이미 사용된 라이센스 키입니다')
      }

      alert('가입 완료 되었습니다! \n 로그인으로 이동합니다.')
      window.location.href = '/login'

    } catch (error) {
      console.error('로그인 중 오류:', error);
    }
  };

  return (
    <div className='flex items-center justify-center mx-60r mt-200r'>
      <div className="flex flex-col items-center w-500r">
      <img className='w-70r h-70r' src="/emoji/좋다.png" alt="좋아하는얼굴" />
      <h2 className='font-bold headline-1 mt-10r mb-70r'>반가워요</h2>
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
        <input
          className='border-b-2 font-medium text-[#444444] outline-none w-full p-10r'
          type="password"
          placeholder='비밀번호 확인'
          onChange={(e) => {
            if (e.target.value === password) {
              setPasswordConfirm(true);
            }else {
              setPasswordConfirm(false);
            }
          }}
        />
        <input
          className='border-b-2 font-medium text-[#444444] outline-none w-full p-10r'
          type="text"
          placeholder='라이센스'
          value={licenseKey}
          onChange={(e) => setLicenseKey(e.target.value)}
        />
      </form>
      <button
        className="w-full px-4r py-14r my-30r rounded-3xl text-white font-semibold bg-gradient-to-r from-[#E94C5E] via-[#E9721B] to-[#768CFF] hover:opacity-70"
        onClick={handleRegister}
      >
        회원가입
      </button>
      {/* <button onClick={geToTumblbug} className='font-semibold text-[#b4b4b4]'>라이센스 키가 없나요?</button> */}
      <button onClick={geToLogin} className='font-semibold text-[#b4b4b4]'>로그인으로 가기</button>
      </div>
    </div>
  );
};

export default Reigster;