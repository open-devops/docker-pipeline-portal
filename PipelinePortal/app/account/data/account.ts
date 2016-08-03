export class Account {
    id: string;
    orgId: string;
    name: string;
    token: string;
    email: string;
    role: string;

    constructor() {
        this.id = '';
        this.orgId = '';
        this.name = '';
        this.token = '';
        this.email = '';
        this.role = '';
    }
}