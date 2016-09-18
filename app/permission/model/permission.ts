export class Permission {
    id: string;
    organizationId: string;
    organizationName: string;
    productName: string;
    pipelineId: string;
    pipelineName: string;
    accountId: string;
    accountName: string;
    roleId: string;
    roleName: string;

    constructor() {
        this.id = '';
        this.organizationId = '';
        this.organizationName = '';
        this.productName = '';
        this.pipelineId = '';
        this.pipelineName = '';
        this.accountId = '';
        this.accountName = '';
        this.roleId = '';
        this.roleName = '';
    }
}
