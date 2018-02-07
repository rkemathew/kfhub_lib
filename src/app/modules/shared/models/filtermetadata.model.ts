export interface FilterMetadata {
    id: number,
    name: string,
    value: string,
    type: string,
    searchOn: FilterMetadata[],
    options: FilterMetadata[]
}
