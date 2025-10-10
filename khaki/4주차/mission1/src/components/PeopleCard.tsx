interface PeopleCardProps {
  photo:string | null;
  name: string;
  character?:string;
}

const PeopleCard = ({photo,name,character}:PeopleCardProps) => {
  return (
    <div className='flex flex-col items-center text-cente'>
      <div className="w-20 h-20">
        {photo ? (
          <img
            src={`https://image.tmdb.org/t/p/w185${photo}`}
            alt={name}
            className="w-full h-full rounded-full object-cover object-center ring-2 ring-white/20"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-600 flex items-center justify-center text-sm text-white/80">
            N/A
          </div>
        )}
      </div>
      <p className="mt-2 text-sm font-medium text-white">{name}</p>
      {character && (
        <p className="text-xs text-gray-400 line-clamp-1">{character}</p>
      )}
    </div>
  )
}

export default PeopleCard
