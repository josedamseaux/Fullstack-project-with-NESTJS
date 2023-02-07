import { PaymentsEntity } from './payments.entity';
import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly payService;
    constructor(payService: PaymentsService);
    getHello(): Promise<PaymentsEntity[]>;
    create(pay: PaymentsEntity): Promise<PaymentsEntity>;
}
