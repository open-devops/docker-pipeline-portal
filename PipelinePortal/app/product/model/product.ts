export class Product {
    id: string;
    organizationId: string;
    name: string;
    description: string;
    pipelineId: string;
    pipelineName: string;
    pipelineDescription: string;

    constructor() {
        this.id = '';
        this.organizationId = '';
        this.name = '';
        this.description = '';
        this.pipelineId = '';
        this.pipelineName = '';
        this.pipelineDescription = '';
    }
}