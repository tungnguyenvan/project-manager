interface IInputForm {
    get value(): string;
    set value(value: string);

    clear(): void;
}

export default IInputForm;