interface IErroCustomizado {
    status: number;
    name: string;
    message: string;
    stack?: string;
}

export default IErroCustomizado;