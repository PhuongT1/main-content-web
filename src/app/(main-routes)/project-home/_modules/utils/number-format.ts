export const views = (
    value: number | null | undefined
) => {
    if (typeof value !== 'number' || value === 0) {
        return '-';
    }
    return `${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};