export interface FilterMetadata {
    id: number,
    name: string,
    value: string,
    searchOn: FilterMetadata[],
    options: FilterMetadata[]
}
