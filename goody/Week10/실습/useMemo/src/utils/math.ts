/*
export const isPrime = (num : number) => {
    if (num < 2) return false;
    // 2부터 num - 1 까지 나누어 떨어지는 수가 있으면 소수가 아님
    // O(n)
    for (let i = 2; i < num; i++) {
        if(num%i === 0) return false;
    }
    

    return true;
}

export const findPrimeNumbers = (max : number) => {
    const primeNumbers = [];

    for (let i = 2; i <= max; i++){
        if (isPrime(i)) primeNumbers.push(i);
    }

    return primeNumbers; 
}
*/

// 에라토테네스의 체
// O(n) => O(sqrt(n))
export const isPrime = (num : number) => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i*i <= num; i++) {
        if(num % i === 0) return false;
    }
    // O(sqrt(n))
    return true;
}


export const findPrimeNumbers = (max : number) => {
    const sieve = Array(max+1).fill(true);
    sieve[0] = sieve[1] = false;

    for (let i = 2; i*i <= max; i++){
        if(sieve[i]) {
            for(let j = i * i; j <= max; j+=i){
                sieve[j] = false;
            }
        }
    }

    return sieve.map((isPrime,i) => (isPrime ? i : null)).filter(Boolean);
} 