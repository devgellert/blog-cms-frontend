export type ApiResource = {
    id: number;
    createdAt: string;
    updatedAt: string;
};

export type Setter<T = string> = (value: T) => void;
