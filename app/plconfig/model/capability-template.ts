export var SelectOptions = [
    // Group0
    {
        'kind': 'ca',
        'dispWidth': 1,
        'description': 'Requirement Management',
        'selectOptions': [
            {
                'id': 'JIRA',
                'name': 'Jira',
                'img': '/app/share/img/app/jira.png',
                'url': 'http://16.187.145.11:9091',
                'configItems': []
            },
            {
                'id': 'REDMINE',
                'name': 'Redmine',
                'img': '/app/share/img/app/redmine.png',
                'url': 'http://16.187.145.11:9092',
                'configItems': []
            }
        ]
    },
    {
        'kind': 'scm',
        'dispWidth': 1,
        'description': 'Configuration Management',
        'selectOptions': [
            {
                'id': 'GITLAB',
                'name': 'Gitlab',
                'img': '/app/share/img/app/gitlab.png',
                'url': 'http://16.187.145.11:9010',
                'configItems': [
                    {
                        'id': 'Repository Name',
                        'dispName': 'Repository Name',
                        'kind': 'text',
                        'options': ''
                    },
                    {
                        'id': 'Branch',
                        'dispName': 'Branch',
                        'kind': 'option',
                        'options': [
                            'Master',
                            'Branch1',
                            'Branch2',
                            'Branch3'
                        ]
                    }
                ]
            },
            {
                'id': 'GITHUB',
                'name': 'Github',
                'img': '/app/share/img/app/github.png',
                'url': 'http://16.187.145.11:9010',
                'configItems': [
                    {
                        'id': 'Repository Url',
                        'dispName': 'Repository Url',
                        'kind': 'text',
                        'options': ''
                    },
                    {
                        'id': 'Branch',
                        'dispName': 'Branch',
                        'kind': 'option',
                        'options': [
                            'Master',
                            'Branch1',
                            'Branch2',
                            'Branch3'
                        ]
                    }
                ]
            }
        ]
    },
    {
        'kind': 'ci',
        'dispWidth': 1,
        'description': 'Continuous Integration',
        'selectOptions': [
            {
                'id': 'JENKINS',
                'name': 'Jenkins',
                'img': '/app/share/img/app/jenkins.png',
                'url': 'http://16.187.145.11:9080/blue',
                'configItems': []
            }
        ]
    },
    {
        'kind': 'cq',
        'dispWidth': 1,
        'description': 'Continuous Quality Inspection',
        'selectOptions': [
            {
                'id': 'SONARQUBE',
                'name': 'SonarQube',
                'img': '/app/share/img/app/sonarqube.png',
                'url': 'http://16.187.145.11:9000',
                'configItems': []
            }
        ]
    },
    {
        'kind': 'cov',
        'dispWidth': 2,
        'description': 'Pipeline Dashboard',
        'selectOptions': [
            {
                'id': 'HYGIEIA',
                'name': 'Hygieia',
                'img': '/app/share/img/app/hygieia.png',
                'url': 'http://16.187.145.11:9088',
                'configItems': []
            }
        ]
    },
    {
        'kind': 'rpa',
        'dispWidth': 1,
        'description': 'Artifact Registry',
        'selectOptions': [
            {
                'id': 'NEXUS',
                'name': 'Nexus',
                'img': '/app/share/img/app/nexus.png',
                'url': 'http://16.187.145.11:9011',
                'configItems': []
            }
        ]
    },
    {
        'kind': 'rpd',
        'dispWidth': 1,
        'description': 'Docker Registry',
        'selectOptions': [
            {
                'id': 'HARBOR',
                'name': 'Harbor',
                'img': '/app/share/img/app/harbor.png',
                'url': 'http://16.187.145.11:9021',
                'configItems': []
            }
        ]
    },
    {
        'kind': 'cmp',
        'dispWidth': 4,
        'description': 'Container Management',
        'selectOptions': [
            {
                'id': 'RANCHER',
                'name': 'Rancher',
                'img': '/app/share/img/app/rancher.png',
                'url': 'http://16.187.145.11:8090',
                'configItems': []
            }
        ]
    }
];
