// 소수인지 아닌지를 판별하는 함수
export const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// 주어진 숫자까지의 소수를 모두 찾아 배열로 반환하는 함수
export const findPrimeNumbers = (max: number): number[] => {
  const primeNumbers = [];

  for (let i = 2; i <= max; i++) {
    if (isPrime(i)) primeNumbers.push(i);
  }

  return primeNumbers;
};
