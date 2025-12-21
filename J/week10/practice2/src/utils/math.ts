export const isPrime = (num: number) => {
    if (num < 2) return false;

    // 2부터 num - 1까지 나누어 떨어지는 수가 있으면 소수가 아님
    for (let i = 3; i * i <= num; i++) {
        if (num % i === 0) return false;
    }

    return true;
}

export const findPrimeNumbers = (max: number): (number | null)[] => {
    const sieve = Array(max + 1).fill(true);
    sieve[0] = sieve[1] = false;    // 0과 1은 소수가 아님

    for (let i = 2; i * i <= max; i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= max; j += i) {
                sieve[j] = false;
            }
        }
    }

    return sieve.map((isPrime, i) => (isPrime ? i : null)).filter
    (Boolean);
}