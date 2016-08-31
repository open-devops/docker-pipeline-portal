export class Account {
    id: string;
    organizationId: string;
    name: string;
    accessToken: string;
    mail: string;
    roleId: string;
    roleName: string;

    constructor() {
        this.id = '';
        this.organizationId = '';
        this.name = '';
        this.accessToken = '';
        this.mail = '';
        this.roleId = '';
        this.roleName = '';
    }
}