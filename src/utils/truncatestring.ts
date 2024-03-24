export const TruncateText = (str: string) => {
    if(str.length <= 25) return str;
    str = str.substring(0,25) + '...';
    return str;
}