import { useState } from "react";

interface Pet{
  id : number;
  name : string;
  category? : string;
  photoUrls : string[];
  tags : Tag[];
  status? : Status;
}

interface Tag {
  id : number;
  name : string;
}

type Status = "available" | "pending" | "sold"

function App() {

  const [pets,setPets] = useState<Pet[]>([]);

  return(
    <div>
      <h1>Pets</h1>
      <ul>
        {pets.map((pet)=> (
          <li key = {pet.id}>{pet.nickname}</li>
        ))}
      </ul>
    </div>
  )
}

export default App;