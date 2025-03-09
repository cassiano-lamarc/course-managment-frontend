export class BaseResponse<T>{
    Success: boolean;
    Message: string;
    Data: T;
}