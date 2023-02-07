import { PaymentsEntity } from '../payments/payments.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    dni: number;
    startDate: string;
    affiliateType: string;
    phoneNumber: string;
    emailAdress: string;
    payments: PaymentsEntity;
}
