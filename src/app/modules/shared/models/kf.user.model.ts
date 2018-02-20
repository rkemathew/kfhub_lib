export class KFUser {
    private userId: number;
    private username: string;
    private firstName: string;
    private lastName: string;
    private clientId: number;
    private authToken: string;
    private locale: string;
    private expirationDateTime: number;
    private noOfInvalidAttempts: number;
    private accountStatus: number;
    private idleTimeoutInMinutes: number;
    private passwordExpirationDateTime: number;
    private lastLoginDateTime: number;
    // The productTypesRaw is being stored here only for passing the session information to the Angular 1 app
    // This can be removed once the entire app is ported over.
    private productTypesRaw: any;
    private hasTalentProduct: boolean;
    private hasPayProduct: boolean;
    private hasTalentAcquisitionProduct: boolean;
    private hasPayDataProduct: boolean;

    constructor(data: any) {
        this.userId = data && data.userId ? data.userId : null;
        this.username = data && data.username ? data.username : null;
        this.firstName = data && data.firstName ? data.firstName : null;
        this.lastName = data && data.lastName ? data.lastName : null;
        this.clientId = data && data.clientId ? data.clientId : null;
        this.authToken = data && data.authToken ? data.authToken : null;
        this.locale = data && data.locale ? data.locale : null;
        this.expirationDateTime = data && data.expirationDateTime ? data.expirationDateTime : null;
        this.noOfInvalidAttempts = data && data.noOfInvalidAttempts ? data.noOfInvalidAttempts : null;
        this.accountStatus = data && data.accountStatus ? data.accountStatus : null;
        this.idleTimeoutInMinutes = data && data.idleTimeoutInMinutes ? data.idleTimeoutInMinutes : null;
        this.passwordExpirationDateTime = data && data.passwordExpirationDateTime ? data.passwordExpirationDateTime : null;
        this.lastLoginDateTime = data && data.lastLoginDateTime ? data.lastLoginDateTime : null;
        this.productTypesRaw = data && data.productTypesRaw ? data.productTypesRaw : null;
        this.hasTalentProduct = data && data.hasPayProduct ? data.hasPayProduct : null;
        this.hasPayProduct = data && data.hasPayProduct ? data.hasPayProduct : null;
        this.hasTalentAcquisitionProduct = data && data.hasTalentAcquisitionProduct ? data.hasTalentAcquisitionProduct : null;
        this.hasPayDataProduct = data && data.hasPayDataProduct ? data.hasPayDataProduct : null;
    }

    public get UserId(): number {
        return this.userId;
    }

    public get Username(): string {
        return this.username;
    }

    public get FirstName(): string {
        return this.firstName;
    }

    public get LastName(): string {
        return this.lastName;
    }
    
    public get ClientId(): number {
        return this.clientId;
    }

    public get AuthToken(): string {
        return this.authToken;
    }

    public get Locale(): string {
        return this.locale;
    }

    public get ExpirationDateTime(): number {
        return this.expirationDateTime;
    }

    public get NoOfInvalidAttempts(): number {
        return this.noOfInvalidAttempts;
    }

    public get AccountStatus(): number {
        return this.accountStatus;
    }

    public get IdleTimeoutInMinutes(): number {
        return this.idleTimeoutInMinutes;
    }

    public get PasswordExpirationDateTime(): number {
        return this.passwordExpirationDateTime;
    }

    public get LastLoginDateTime(): number {
        return this.lastLoginDateTime;
    }

    public get ProductTypesRaw(): string {
        return this.productTypesRaw;
    }

    public get HasTalentProduct(): boolean {
        return this.hasTalentProduct;
    }

    public get HasPayProduct(): boolean {
        return this.hasPayProduct;
    }

    public get HasTalentAcquisitionProduct(): boolean {
        return this.hasTalentAcquisitionProduct;
    }

    public get HasPayDataProduct(): boolean {
        return this.HasPayDataProduct;
    }
}
