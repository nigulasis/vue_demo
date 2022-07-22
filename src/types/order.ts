
interface ListInt {
    name: string
    
    id: number
    body: string
}

interface selectDataInt {
    name: string
    body: string
    page: number
    count: number
}

export class InitData {
    selectData: selectDataInt = {
        name: "",
        body: "",
        page: 0,
        count: 0
    }
    list: ListInt[] = []
    datalist: ListInt[] = []
}
