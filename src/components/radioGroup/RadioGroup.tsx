interface RadioOption {
    label: string;
    value: string;
}

const RadioGroup: React.FC<{
    title: string;
    name: string;
    options: RadioOption[];
    onChange?: (value: string) => void;
}> = ({ title, name, options, onChange }) => (
    <div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <div className="flex flex-col">
            {options.map(({ label, value }) => (
                <div key={value} className="flex items-center gap-4 p-2">
                    <input
                        type="radio"
                        id={`${name}-${value}`}
                        name={name}
                        value={value}
                        onChange={() => onChange?.(value)}
                        className="w-4 h-4"
                    />
                    <label
                        htmlFor={`${name}-${value}`}
                        className="cursor-pointer"
                    >
                        {label}
                    </label>
                </div>
            ))}
        </div>
    </div>
);

export default RadioGroup;
