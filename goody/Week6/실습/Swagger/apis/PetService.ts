// export const getSinglePet = async (id:number) => {
//     const response = await fetch(`https://petstore3.swagger.io/api/v3/pet/${id}`)

//     if(!response.ok){
//         throw new Error('Failed to fetch pet');
//     }

//     const data = await response.json();

//     return data;

// };

// PET API
// interface ApiRequest {
//     petId : number;
//     name? : string;
//     status? : string;
// }

// export const api = async ({petId,name,status}:ApiRequest) => {


//     // 분기 처리
//     const url = new URL(`/pet/${petId}`)
//     if (status) {
//         url.searchParams.set('status', status);
//     }
//     if(name) {
//         url.searchParams.set('name',name);
//     }

//     const response = await fetch(`/pet/${petId}?name=${name}&status=${status}`) // 순서 바껴도 상관 x

//     if(!response.ok){
//         throw new Error('Failed to fetch pet');
//     }

//     const data = await response.json();

//     return data;
// }

// USER API
interface User{
    id? : number;
    username?: string;
    firstName? : string;
    lastName? : string;
    email? : string;
    password? : string;
    phone? : string;
    userStatus? : number;
}

export const api = async ({
    id,
    username,
    firstName,
    lastName,
    email,
    password,
    phone,
    userStatus,
}:User)=> {
    const response = await fetch("/user",{
        method:"POST",
        body: JSON.stringify({
            id,
            username,
            firstName,
            lastName,
            email,
            password,
            phone,
            userStatus,
        }),
    });

    const data = await response.json();
    return data;
}