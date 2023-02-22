export function parseBool(value: string){
    try {
        var res = value === "true";
        return res;
    } catch (error:any) {
        console.error(error.message);
        return false;
    }
};