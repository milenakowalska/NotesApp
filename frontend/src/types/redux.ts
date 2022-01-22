export interface IAction {
    type: string
    payload: any
}

export interface IState {
 isLoading: boolean,
 isError: any,
 data: any
}