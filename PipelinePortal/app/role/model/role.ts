export class Role {
    id: string;
    organizationId: string;
    name: string;
    description: string;

    constructor() {
        this.id = '';
        this.organizationId = '';
        this.name = '';
        this.description = '';
    }
}