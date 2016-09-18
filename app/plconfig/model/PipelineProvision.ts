export class PipelineProvision {
    pipelineId: string;
    pipelineName: string;
    capabilities: PipelineCapability [];

    constructor() {
        this.pipelineId = '';
        this.pipelineName = '';
        this.capabilities = new Array<PipelineCapability>();
    }
}

export class PipelineCapability {
    kind: string;
    class: string;
    driver: string;
    provider: string;
    providerName: string;
    url: string;
    img: string;
    description: string;
    configItems: PipelineCapabilityConfigItem[];
    status: CapabilityStatus;

    constructor() {
        this.kind = '';
        this.class = '';
        this.driver = '';
        this.provider = '';
        this.providerName = '';
        this.url = '';
        this.img = '';
        this.description = '';
        this.configItems = new Array<PipelineCapabilityConfigItem>();
        this.status = CapabilityStatus.NA;
    }
}

export class PipelineCapabilityConfigItem {
    kind: string;
    name: string;
    value: string;

    constructor() {
        this.kind = '';
        this.name = '';
        this.value = '';
    }
}

export class PipelineStatus {
    pipelienId: string;
    ca: string;
    scm: string;
    ci: string;
    cq: string;
    rpa: string;
    rpd: string;
    cov: string;
    cmp: string;
}

export enum PLOperation {
    StartOne = 1,
    StopOne,
    RestartOne,
    StartAll,
    StopAll,
    RestartAll
}

export enum CapabilityStatus {
    NA = 0,
    Up = 1,
    Down = 2
}
