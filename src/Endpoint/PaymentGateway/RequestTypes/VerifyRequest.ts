
import { Fillable } from '../../Fillable';

export class VerifyRequest extends Fillable(class {}) {
    public merchantId?: string = undefined;
    public amount: number = 0;
    public authority: string = '';

    constructor(inputs: Partial<VerifyRequest> = {}) {
        super();
        this.fill(inputs);
    }

    public validate(): void {
        this.validateMerchantId();
        this.validateAmount();
        this.validateAuthority();
    }

    private validateMerchantId(): void {
        const uuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
        if (!this.merchantId || !uuidRegex.test(this.merchantId)) {
            throw new Error('Invalid merchant_id format. It should be a valid UUID.');
        }
    }

    private validateAmount(): void {
        if (this.amount <= 0) {
            throw new Error('Amount must be greater than zero.');
        }
    }

    private validateAuthority(): void {
        const authorityRegex = /^A[0-9a-zA-Z]{35}$/;
        if (!authorityRegex.test(this.authority)) {
            throw new Error('Invalid authority format. It should be a string starting with "A" followed by 35 alphanumeric characters.');
        }
    }

    public toString(): string {
        this.validate();

        return JSON.stringify({
            merchant_id: this.merchantId,
            amount: this.amount,
            authority: this.authority,
        });
    }
}