import clsx from "clsx";
import { THEME, useTheme } from "./ThemeProvider";

export default function ThemeContent() {
  const { theme, toggleTheme } = useTheme();
  
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div className={clsx('p-4 h-dvh', isLightMode ? 'bg-white' : 'bg-gray-800')}>
      <h1
        className={clsx(
          'text-wxl font-bold',
          isLightMode ? 'text-black' : 'text-white'
        )}
      >
        신경망을 위한 데이터 표현
      </h1>
      <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
        ● 이전 예제에서 텐서(tensor)라고 부르는 다차원 넘파이 배열에 데이터를 저장하는 것부터 시작
        ● 최근의 모든 머신 러닝 시스템은 일반적으로 텐서를 기본 데이터 구조로 사용
        ● 텐서는 머신 러닝의 기본 구성 요소
        ● 텐서플로 이름을 여기에서 따옴
        ● 핵심적으로 텐서는 데이터를 위한 컨테이너(container)
        ● 일반적으로 수치형 데이터를 다루므로 숫자를 위한 컨테이너
        ● 아마 랭크(rank)-2 텐서인 행렬에 대해 이미 알고 있을 것
        ● 텐서는 임의의 차원 개수를 가지는 행렬의 일반화된 모습(텐서에서는 차원(dimension)을 종종
        축(axis)이라고 부름)
      </p>
    </div>
  )
}
