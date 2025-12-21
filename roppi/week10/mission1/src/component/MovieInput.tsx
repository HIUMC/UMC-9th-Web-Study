interface MovieInputProps {
  value: string;
  setQuery: (query: string) => void;
}

const MovieInput = ({value, setQuery} : MovieInputProps) => {
  return (
    <div className="flex-1 max-w-[1000px]">
      
      <input 
        type="text" 
        value={value}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search movies..."
        className="w-full min-h-[60px]  rounded-lg
          focus:outline-none p-[10px]
          focus:ring-2 text-lg focus:ring-[#000000]/50
          "
        />
    </div>
  )
} 
export default MovieInput;