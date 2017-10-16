
export interface BResponse {
    status: number
    msg?: string
    resp?: any
}

export const stNull : number = 0; // semantically equal to a null value
export const st1200 : number = 1200; // OK
export const stOK   : number = 1200; // mnemonic for st1200
export const st1201 : number = 1201; // Created
export const st1202 : number = 1202; // Accepted
export const st1302 : number = 1302; // Found
export const st1500 : number = 1500; // generic error
export const st1501 : number = 1501; // not implemented
export const st1502 : number = 1502; // not supported
// 1601..: ODRL-RML-Builder specific statuses
export const st1601 : number = 1601; // Rejected (the requested function/method was not accepted)


