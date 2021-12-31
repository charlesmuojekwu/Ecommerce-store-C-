import { Iproduct } from "./product";

export interface Ipagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: Iproduct[];
}