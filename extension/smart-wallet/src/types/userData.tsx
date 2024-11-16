export type AssetUserBalance = {
    name: string,
    value: number,
    amount: string
}

export type UserData = {
    totalBalance: number,
    assets: Array<AssetUserBalance>
}

export type IconLabel = {
    label : string,
    icon: any
}