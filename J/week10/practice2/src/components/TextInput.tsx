interface ITextInput {
    onChange: (text: string) => void;
}

export const TextInput = ({onChange}: ITextInput) => {
    console.log("TextInput rendered");

    return (
        <input
            type="text"
            className="border p-4 rounded-lg"
            onChange={(e) => onChange(e.target.value)}
        />
    );
};