export interface KFFilterMetadata {
    id: number,
    name: string,
    value: string,
    type: string,
    searchOn: KFFilterMetadata[],
    options: KFFilterMetadata[]
}
