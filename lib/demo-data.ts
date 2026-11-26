// ─── DICT PNG AWS Cost Dashboard — Demo Data Layer ─────────────────────────
// Replace with live AWS Cost Explorer / CloudTrail API calls in production.

export type Month = {
  month: string; actual: number; prior: number; budget: number; forecast?: number;
}
export type ServiceCost = {
  service: string; cost: number; pct: number;
  trend: number; ou: string; optimization?: string;
}
export type OUCost = {
  ou: string; fullName: string; cost: number; budget: number;
  pct: number; variance: number; accounts: number; topService: string;
}
export type EngineerEvent = {
  time: string; event: string; service: string; resource: string;
  region: string; costDelta: number; account: string;
}
export type EngineerActivity = {
  id: string; name: string; email: string; team: string;
  costImpact: number; actions: number; summary: string;
  events: EngineerEvent[]; avatar: string;
}
export type WAFFinding = {
  id: string; title: string; description: string;
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  effort: 'Low' | 'Medium' | 'High'; saving?: number;
  status: 'open' | 'in-progress' | 'resolved';
}
export type WAFCheck = { label: string; status: 'pass' | 'warn' | 'fail'; }
export type WAFPillar = {
  pillar: string; score: number; target: number;
  color: string; findings: WAFFinding[]; checks: WAFCheck[];
}
export type SecurityFinding = {
  id: string; title: string; severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  service: string; account: string; ou: string; count: number;
  firstSeen: string; status: 'ACTIVE' | 'SUPPRESSED' | 'RESOLVED';
}

export const kpis = {
  currentMonthSpend:  48320.14,
  priorMonthSpend:    41890.60,
  ytdSpend:          268445.80,
  annualBudget:      600000.00,
  monthlyBudget:      52000.00,
  forecast:           54100.00,
  activeOUs:          6,
  totalAccounts:      18,
  engineerActions:    247,
  openFindings:       31,
  criticalFindings:   4,
  savingsOpportunity: 18400,
  lastRefreshed:     '2025-07-14T22:45:00+10:00',
}

export const monthlyTrend: Month[] = [
  { month: 'Feb', actual: 33210, prior: 29800, budget: 45000 },
  { month: 'Mar', actual: 36540, prior: 31200, budget: 45000 },
  { month: 'Apr', actual: 39870, prior: 33900, budget: 48000 },
  { month: 'May', actual: 41890, prior: 35400, budget: 48000 },
  { month: 'Jun', actual: 44210, prior: 37100, budget: 50000 },
  { month: 'Jul', actual: 48320, prior: 39600, budget: 52000, forecast: 54100 },
]

export const serviceCosts: ServiceCost[] = [
  { service: 'Amazon EKS',        cost: 12840, pct: 26.6, trend:  18.4, ou: 'SevisPass',  optimization: 'Right-size node groups; migrate 3x m5.xlarge to Graviton3 m7g.large. Est. saving: $3,200/mo' },
  { service: 'Amazon RDS',        cost:  9110, pct: 18.9, trend:   9.2, ou: 'HRIS',       optimization: 'Enable Aurora Serverless v2 for HRIS prod DB; idle 14h/day. Est. saving: $2,100/mo' },
  { service: 'Data Transfer',     cost:  6420, pct: 13.3, trend:  31.7, ou: 'ConnectPNG', optimization: 'Add VPC endpoints for S3/DynamoDB to reduce TGW data-processing charges. Est. saving: $1,800/mo' },
  { service: 'Amazon EC2',        cost:  5980, pct: 12.4, trend:  -3.1, ou: 'DPI',        optimization: 'Sandbox fleet lacks auto-shutdown; 6x t3.medium running 24/7. Est. saving: $980/mo' },
  { service: 'Amazon S3',         cost:  4230, pct:  8.8, trend:   5.6, ou: 'NICTA',      optimization: 'Enable Intelligent-Tiering on GIS buckets (847 GB cold). Est. saving: $620/mo' },
  { service: 'AWS Lambda',        cost:  2910, pct:  6.0, trend:  -1.2, ou: 'SevisPass',  optimization: 'Within free-tier buffer. No action needed.' },
  { service: 'CloudFront',        cost:  2480, pct:  5.1, trend:   4.3, ou: 'NIC',        optimization: 'Enable compression and cache-control headers on static assets.' },
  { service: 'Amazon DynamoDB',   cost:  1870, pct:  3.9, trend:  -0.8, ou: 'SevisPass',  optimization: 'Switch PITR to on-demand on 4 non-prod tables. Est. saving: $340/mo' },
  { service: 'AWS WAF & Shield',  cost:  1340, pct:  2.8, trend:   0.0, ou: 'NIC',        optimization: 'Mandatory security control. No reduction recommended.' },
  { service: 'Amazon CloudWatch', cost:  1140, pct:  2.4, trend:   7.1, ou: 'All OUs',    optimization: 'Reduce log retention 365d to 90d on non-compliance log groups. Est. saving: $280/mo' },
]

export const ouCosts: OUCost[] = [
  { ou: 'SevisPass',  fullName: 'SevisPass Digital Identity', cost: 16940, budget: 18000, pct: 35.1, variance:  -5.9, accounts: 4, topService: 'Amazon EKS'    },
  { ou: 'HRIS',       fullName: 'HR Information Systems',      cost: 11230, budget:  9500, pct: 23.3, variance:  18.2, accounts: 3, topService: 'Amazon RDS'    },
  { ou: 'ConnectPNG', fullName: 'ConnectPNG Network',          cost:  7810, budget:  8000, pct: 16.2, variance:  -2.4, accounts: 3, topService: 'Data Transfer' },
  { ou: 'DPI',        fullName: 'Dept. of Petroleum & Energy', cost:  5980, budget:  6500, pct: 12.4, variance:  -8.0, accounts: 3, topService: 'Amazon EC2'    },
  { ou: 'NICTA',      fullName: 'National ICT Authority',      cost:  4230, budget:  5000, pct:  8.8, variance: -15.4, accounts: 3, topService: 'Amazon S3'     },
  { ou: 'NIC',        fullName: 'National Information Centre', cost:  2130, budget:  2500, pct:  4.4, variance: -14.8, accounts: 2, topService: 'CloudFront'    },
]

export const engineerActivities: EngineerActivity[] = [
  {
    id: 'eng-001', name: 'James Kila', email: 'j.kila@dict.gov.pg',
    team: 'Cloud Infrastructure', costImpact: 14280, actions: 67, avatar: 'JK',
    summary: 'Remediated the SevisPass EKS cluster following a node-pool failure on 8 Jul. Provisioned a replacement m5.xlarge node group (3 nodes) in ap-southeast-2, re-applied Kubernetes manifests, and configured Cluster Autoscaler. Cluster is now HA across two AZs. Cost impact: +$3,200/mo for additional node capacity, offset by removing old single-node group (-$1,100/mo). Enabled EKS managed add-ons (CoreDNS, kube-proxy, VPC CNI).',
    events: [
      { time: '2025-07-08T09:14', event: 'CreateNodegroup',        service: 'EKS',  resource: 'sevispass-prod-ng-2',  region: 'ap-southeast-2', costDelta:  2100, account: '112233445566' },
      { time: '2025-07-08T09:31', event: 'DeleteNodegroup',        service: 'EKS',  resource: 'sevispass-prod-ng-1',  region: 'ap-southeast-2', costDelta: -1100, account: '112233445566' },
      { time: '2025-07-09T14:02', event: 'CreateAddon',            service: 'EKS',  resource: 'vpc-cni',              region: 'ap-southeast-2', costDelta:     0, account: '112233445566' },
      { time: '2025-07-10T11:45', event: 'ModifyDBInstance',       service: 'RDS',  resource: 'sevispass-auth-db',    region: 'ap-southeast-2', costDelta:   340, account: '112233445566' },
      { time: '2025-07-11T16:20', event: 'CreateAutoScalingGroup', service: 'EC2',  resource: 'eks-asg-prod',         region: 'ap-southeast-2', costDelta:   890, account: '112233445566' },
    ],
  },
  {
    id: 'eng-002', name: 'Mary Waine', email: 'm.waine@dict.gov.pg',
    team: 'Connectivity & Networks', costImpact: 6420, actions: 38, avatar: 'MW',
    summary: 'Established the inter-region Transit Gateway attachment between ap-southeast-2 (Sydney) and ap-east-1 (Hong Kong) on 5 Jul for the ConnectPNG project. Required to support Pacific Islands Forum partner connectivity. The attachment incurs $0.07/GB data processing plus $0.05/hr per attachment. Current monthly projection: $6,420. Advised to evaluate VPC endpoints for S3/DynamoDB to save ~$1,800/mo.',
    events: [
      { time: '2025-07-05T08:22', event: 'CreateTransitGatewayVpcAttachment',    service: 'TGW', resource: 'tgw-attach-connectpng', region: 'ap-southeast-2', costDelta: 3200, account: '223344556677' },
      { time: '2025-07-05T08:45', event: 'CreateRoute',                           service: 'EC2', resource: 'rtb-connectpng-prod',   region: 'ap-southeast-2', costDelta:    0, account: '223344556677' },
      { time: '2025-07-06T10:11', event: 'AssociateTransitGatewayRouteTable',     service: 'TGW', resource: 'tgw-rtb-connectpng',    region: 'ap-southeast-2', costDelta:  120, account: '223344556677' },
      { time: '2025-07-07T13:55', event: 'CreateNatGateway',                      service: 'EC2', resource: 'nat-connectpng-az1',    region: 'ap-southeast-2', costDelta: 1800, account: '223344556677' },
      { time: '2025-07-12T09:30', event: 'RunInstances',                          service: 'EC2', resource: 't3.medium (monitoring)', region: 'ap-southeast-2', costDelta:  420, account: '223344556677' },
    ],
  },
  {
    id: 'eng-003', name: 'Peter Namaliu', email: 'p.namaliu@dict.gov.pg',
    team: 'Data & Applications', costImpact: 9110, actions: 52, avatar: 'PN',
    summary: 'Scaled up the HRIS production RDS PostgreSQL instance from db.r6g.large to db.r6g.xlarge on 2 Jul following CPU contention during government payroll batch (02:00-05:00 AEST). Upgrade increased HRIS RDS costs by $2,100/mo. Also enabled Multi-AZ standby (+$1,340/mo). HRIS OU budget is 18.2% over. Investigating read-replica offloading for reporting queries as alternative to the larger instance class.',
    events: [
      { time: '2025-07-02T07:15', event: 'ModifyDBInstance',             service: 'RDS', resource: 'hris-prod-pg15',       region: 'ap-southeast-2', costDelta: 2100, account: '334455667788' },
      { time: '2025-07-02T07:16', event: 'RebootDBInstance',             service: 'RDS', resource: 'hris-prod-pg15',       region: 'ap-southeast-2', costDelta:    0, account: '334455667788' },
      { time: '2025-07-03T11:40', event: 'CreateDBInstanceReadReplica',  service: 'RDS', resource: 'hris-prod-pg15-rr1',   region: 'ap-southeast-2', costDelta: 1340, account: '334455667788' },
      { time: '2025-07-08T15:22', event: 'CreateDBSnapshot',             service: 'RDS', resource: 'hris-snap-20250708',   region: 'ap-southeast-2', costDelta:  210, account: '334455667788' },
      { time: '2025-07-11T09:05', event: 'PutObject (S3 backup)',        service: 'S3',  resource: 'hris-db-backups',      region: 'ap-southeast-2', costDelta:   88, account: '334455667788' },
    ],
  },
  {
    id: 'eng-004', name: 'Susan Tari', email: 's.tari@dict.gov.pg',
    team: 'Platforms & DevOps', costImpact: 3840, actions: 57, avatar: 'ST',
    summary: 'Provisioned DPI sandbox for the Petroleum Licensing System UAT on 1 Jul. Launched 6x t3.medium EC2 instances across two AZs and configured an Application Load Balancer. Instances running 24/7 without an auto-shutdown schedule — Security Hub has raised a finding. Susan acknowledged the issue and will apply Instance Scheduler stack by 18 Jul. Estimated saving once scheduler is active: $980/mo.',
    events: [
      { time: '2025-07-01T13:02', event: 'RunInstances',        service: 'EC2',     resource: 't3.medium x6 (DPI sandbox)', region: 'ap-southeast-2', costDelta: 1920, account: '445566778899' },
      { time: '2025-07-01T13:10', event: 'CreateLoadBalancer',  service: 'ELB',     resource: 'dpi-uat-alb',                region: 'ap-southeast-2', costDelta:  340, account: '445566778899' },
      { time: '2025-07-01T13:12', event: 'CreateTargetGroup',   service: 'ELB',     resource: 'dpi-uat-tg',                 region: 'ap-southeast-2', costDelta:    0, account: '445566778899' },
      { time: '2025-07-03T10:20', event: 'CreateLogGroup',      service: 'CW Logs', resource: '/dpi/uat/app',               region: 'ap-southeast-2', costDelta:  180, account: '445566778899' },
      { time: '2025-07-07T16:45', event: 'PutMetricAlarm',      service: 'CW',      resource: 'dpi-uat-cpu-alarm',          region: 'ap-southeast-2', costDelta:   22, account: '445566778899' },
    ],
  },
  {
    id: 'eng-005', name: 'Thomas Bani', email: 't.bani@dict.gov.pg',
    team: 'Security & Compliance', costImpact: 2480, actions: 33, avatar: 'TB',
    summary: 'Deployed AWS WAF v2 rules and Shield Standard across all 6 NIC CloudFront distributions on 6 Jul as part of DICT PNG Cyber Security uplift. Configured AWSManagedRulesCommonRuleSet, AWSManagedRulesSQLiRuleSet and a custom IP-reputation list. Activated Security Hub across all 18 accounts with cross-account aggregation into the management account. These are mandatory security controls; associated costs ($1,340/mo) are non-negotiable.',
    events: [
      { time: '2025-07-06T08:05', event: 'CreateWebACL',       service: 'WAF',    resource: 'dict-nic-waf-acl',    region: 'us-east-1',       costDelta:  800, account: '556677889900' },
      { time: '2025-07-06T08:10', event: 'AssociateWebACL',    service: 'WAF',    resource: 'cloudfront-nic-dist', region: 'us-east-1',       costDelta:    0, account: '556677889900' },
      { time: '2025-07-06T09:30', event: 'EnableSecurityHub',  service: 'SecHub', resource: 'all-accounts',        region: 'ap-southeast-2',  costDelta:  540, account: 'mgmt-001122' },
      { time: '2025-07-07T11:15', event: 'CreateInsight',      service: 'SecHub', resource: 'dict-png-critical',   region: 'ap-southeast-2',  costDelta:    0, account: 'mgmt-001122' },
      { time: '2025-07-09T14:44', event: 'PutConfigRule',      service: 'Config', resource: 'cis-level2-rules',    region: 'ap-southeast-2',  costDelta:  340, account: 'mgmt-001122' },
    ],
  },
]

export const wafPillars: WAFPillar[] = [
  {
    pillar: 'Cost Optimisation', score: 58, target: 80, color: '#d13212',
    findings: [
      { id: 'CO-01', title: 'No Savings Plans active', description: 'EC2 and Fargate Savings Plans can reduce on-demand spend by up to 40%. DICT PNG currently pays 100% on-demand rates across all 18 accounts.', impact: 'High', effort: 'Low', saving: 8400, status: 'open' },
      { id: 'CO-02', title: 'Dev/Test instances running 24/7', description: 'DPI sandbox (6x t3.medium) and HRIS dev DB have no shutdown schedule. Instances idle >18h/day.', impact: 'Medium', effort: 'Low', saving: 1960, status: 'open' },
      { id: 'CO-03', title: 'S3 lifecycle policies missing on 12 buckets', description: 'GIS data, HRIS backups and log archives have no Intelligent-Tiering or Glacier transitions configured.', impact: 'Medium', effort: 'Low', saving: 980, status: 'open' },
      { id: 'CO-04', title: 'EKS nodes not on Graviton3', description: 'SevisPass EKS node group uses x86 m5.xlarge. Graviton3 m7g.large provides 20% better price/performance.', impact: 'Medium', effort: 'Medium', saving: 3200, status: 'open' },
    ],
    checks: [
      { label: 'Cost allocation tags enforced on all resources', status: 'warn' },
      { label: 'Monthly budget alerts configured', status: 'pass' },
      { label: 'Rightsizing recommendations reviewed', status: 'fail' },
      { label: 'Reserved capacity / Savings Plans active', status: 'fail' },
      { label: 'Auto-shutdown for non-prod', status: 'fail' },
      { label: 'S3 lifecycle policies on all buckets', status: 'fail' },
      { label: 'Trusted Advisor cost checks reviewed', status: 'warn' },
    ],
  },
  {
    pillar: 'Security', score: 64, target: 90, color: '#d13212',
    findings: [
      { id: 'SEC-01', title: 'Security Hub not fully configured', description: 'CIS AWS Foundations Benchmark v1.4 not activated in 6 accounts.', impact: 'Critical', effort: 'Low', status: 'in-progress' },
      { id: 'SEC-02', title: 'IAM least-privilege SCPs missing', description: 'No SCPs restrict IAM privilege escalation in HRIS and DPI OUs.', impact: 'Critical', effort: 'Medium', status: 'open' },
      { id: 'SEC-03', title: 'CloudTrail data events not enabled', description: 'S3 and Lambda data events not logged. SevisPass S3 buckets store citizen PII.', impact: 'High', effort: 'Low', status: 'open' },
      { id: 'SEC-04', title: 'RDS encryption at rest missing on 2 instances', description: 'HRIS dev and ConnectPNG staging RDS provisioned without encryption.', impact: 'High', effort: 'High', status: 'open' },
    ],
    checks: [
      { label: 'MFA enforced for all IAM users', status: 'pass' },
      { label: 'CloudTrail enabled in all regions', status: 'pass' },
      { label: 'CloudTrail data events enabled', status: 'fail' },
      { label: 'Security Hub CIS benchmark active', status: 'warn' },
      { label: 'GuardDuty enabled all accounts', status: 'pass' },
      { label: 'IAM Access Analyzer enabled', status: 'pass' },
      { label: 'SCPs restricting privilege escalation', status: 'fail' },
      { label: 'RDS encryption at rest on all instances', status: 'warn' },
      { label: 'Secrets Manager for all credentials', status: 'warn' },
    ],
  },
  {
    pillar: 'Reliability', score: 71, target: 85, color: '#ff9900',
    findings: [
      { id: 'REL-01', title: 'No formal DR runbooks', description: 'SevisPass and HRIS have Multi-AZ but no documented, tested DR procedures. RTO/RPO targets undefined.', impact: 'High', effort: 'Medium', status: 'open' },
      { id: 'REL-02', title: 'Single-AZ RDS in ConnectPNG staging', description: 'ConnectPNG staging DB is single-AZ with no automated backup outside the region.', impact: 'Medium', effort: 'Low', status: 'open' },
      { id: 'REL-03', title: 'No chaos engineering or game days', description: 'No failure injection testing has been performed on any production system.', impact: 'Low', effort: 'High', status: 'open' },
      { id: 'REL-04', title: 'EKS PodDisruptionBudgets missing', description: 'SevisPass microservices lack PDBs, risking availability during node-pool rolling updates.', impact: 'Medium', effort: 'Low', status: 'open' },
    ],
    checks: [
      { label: 'Multi-AZ for production databases', status: 'pass' },
      { label: 'Automated RDS backups enabled', status: 'pass' },
      { label: 'Cross-region backup copies', status: 'warn' },
      { label: 'Documented RTO/RPO targets', status: 'fail' },
      { label: 'DR runbooks tested in last 12 months', status: 'fail' },
      { label: 'EKS PodDisruptionBudgets configured', status: 'fail' },
      { label: 'Service health notifications configured', status: 'pass' },
    ],
  },
  {
    pillar: 'Performance', score: 74, target: 85, color: '#ff9900',
    findings: [
      { id: 'PERF-01', title: 'EKS workloads not on Graviton3', description: 'Migrating to m7g.large provides ~40% better price-performance vs current m5.xlarge fleet.', impact: 'Medium', effort: 'Medium', status: 'open' },
      { id: 'PERF-02', title: 'No CloudFront caching for NIC portal API', description: 'NIC portal API responses uncached at edge; latency for Highlands/Islands regions is 800ms+.', impact: 'Medium', effort: 'Low', status: 'open' },
      { id: 'PERF-03', title: 'HRIS batch queries not on read replica', description: 'Payroll batch runs on primary RDS instance, competing with OLTP traffic.', impact: 'High', effort: 'Medium', status: 'in-progress' },
      { id: 'PERF-04', title: 'No load testing for SevisPass', description: 'SevisPass not tested above 500 concurrent users. National election registration may spike to 5,000+.', impact: 'High', effort: 'Medium', status: 'open' },
    ],
    checks: [
      { label: 'CloudFront CDN for static assets', status: 'pass' },
      { label: 'CloudFront caching for API responses', status: 'fail' },
      { label: 'Graviton instances for compute-heavy workloads', status: 'fail' },
      { label: 'Read replicas for reporting queries', status: 'warn' },
      { label: 'Load testing completed for critical apps', status: 'fail' },
      { label: 'Auto Scaling policies configured', status: 'pass' },
    ],
  },
  {
    pillar: 'Operational Excellence', score: 76, target: 85, color: '#1d8102',
    findings: [
      { id: 'OE-01', title: 'No centralised runbook repository', description: 'Runbooks exist as email attachments; no SSM Automation or Confluence wiki integration.', impact: 'Medium', effort: 'Medium', status: 'open' },
      { id: 'OE-02', title: 'CloudWatch dashboards incomplete', description: '3 of 6 OUs lack production CloudWatch dashboards covering SLO metrics.', impact: 'Medium', effort: 'Low', status: 'in-progress' },
      { id: 'OE-03', title: 'No tagging policy enforcement', description: 'Cost allocation tags (Project, Owner, Environment) missing on 34% of resources.', impact: 'Low', effort: 'Low', status: 'open' },
      { id: 'OE-04', title: 'Manual deployment pipelines in DPI', description: 'DPI Petroleum Licensing System deployed via SSH; no CI/CD pipeline exists.', impact: 'Medium', effort: 'High', status: 'open' },
    ],
    checks: [
      { label: 'CI/CD pipelines for all production apps', status: 'warn' },
      { label: 'Infrastructure as Code for all resources', status: 'warn' },
      { label: 'CloudWatch dashboards per OU', status: 'warn' },
      { label: 'Tagging policy enforced via AWS Config', status: 'fail' },
      { label: 'SSM Automation runbooks', status: 'fail' },
      { label: 'Change management process documented', status: 'pass' },
    ],
  },
  {
    pillar: 'Sustainability', score: 52, target: 75, color: '#d13212',
    findings: [
      { id: 'SUS-01', title: 'No workload carbon footprint tracking', description: 'AWS Customer Carbon Footprint Tool data not reviewed by DICT PNG environmental team.', impact: 'Low', effort: 'Low', status: 'open' },
      { id: 'SUS-02', title: 'No Graviton adoption plan', description: 'Moving EKS nodes and RDS to Graviton reduces energy ~60% with no code changes.', impact: 'High', effort: 'Medium', status: 'open' },
      { id: 'SUS-03', title: 'Lambda functions over-provisioned in memory', description: '12 Lambda functions configured at 3,008 MB; profiling shows average use 128-256 MB.', impact: 'Medium', effort: 'Low', saving: 340, status: 'open' },
      { id: 'SUS-04', title: 'S3 data not tiered to lower-energy storage', description: '2.3 TB older than 90 days stored in S3 Standard instead of Glacier Flexible Retrieval.', impact: 'Medium', effort: 'Low', saving: 620, status: 'open' },
    ],
    checks: [
      { label: 'Carbon Footprint Tool reviewed monthly', status: 'fail' },
      { label: 'Graviton instances for eligible workloads', status: 'fail' },
      { label: 'S3 cold data transitioned to Glacier', status: 'fail' },
      { label: 'Lambda memory right-sized', status: 'fail' },
      { label: 'Dev/Test resources scheduled off-hours', status: 'fail' },
      { label: 'Efficiency targets defined', status: 'warn' },
    ],
  },
]

export const securityFindings: SecurityFinding[] = [
  { id: 'SH-001', title: 'Root account login detected',           severity: 'CRITICAL', service: 'IAM',        account: 'mgmt-001122',  ou: 'Management', count: 1,  firstSeen: '2025-07-10', status: 'ACTIVE' },
  { id: 'SH-002', title: 'S3 bucket with public read ACL',        severity: 'CRITICAL', service: 'S3',         account: '334455667788', ou: 'HRIS',       count: 2,  firstSeen: '2025-07-08', status: 'ACTIVE' },
  { id: 'SH-003', title: 'IAM user with inline admin policy',     severity: 'CRITICAL', service: 'IAM',        account: '445566778899', ou: 'DPI',        count: 1,  firstSeen: '2025-07-06', status: 'ACTIVE' },
  { id: 'SH-004', title: 'Security group allows 0.0.0.0/0 SSH',  severity: 'CRITICAL', service: 'EC2',        account: '112233445566', ou: 'SevisPass',  count: 3,  firstSeen: '2025-07-05', status: 'ACTIVE' },
  { id: 'SH-005', title: 'CloudTrail data events disabled',       severity: 'HIGH',     service: 'CloudTrail', account: 'all-accounts', ou: 'All OUs',    count: 18, firstSeen: '2025-07-01', status: 'ACTIVE' },
  { id: 'SH-006', title: 'RDS instance not encrypted at rest',    severity: 'HIGH',     service: 'RDS',        account: '223344556677', ou: 'ConnectPNG', count: 2,  firstSeen: '2025-07-03', status: 'ACTIVE' },
  { id: 'SH-007', title: 'No MFA on IAM service account',        severity: 'HIGH',     service: 'IAM',        account: '334455667788', ou: 'HRIS',       count: 4,  firstSeen: '2025-07-09', status: 'ACTIVE' },
  { id: 'SH-008', title: 'EC2 instance without IMDSv2',          severity: 'MEDIUM',   service: 'EC2',        account: '445566778899', ou: 'DPI',        count: 6,  firstSeen: '2025-07-01', status: 'ACTIVE' },
  { id: 'SH-009', title: 'Lambda with wildcard resource policy',  severity: 'MEDIUM',   service: 'Lambda',     account: '112233445566', ou: 'SevisPass',  count: 3,  firstSeen: '2025-07-04', status: 'ACTIVE' },
  { id: 'SH-010', title: 'Unused IAM roles (90+ days)',           severity: 'LOW',      service: 'IAM',        account: 'all-accounts', ou: 'All OUs',    count: 22, firstSeen: '2025-06-15', status: 'ACTIVE' },
]

export const fmt = (n: number) =>
  n >= 1000000 ? `$${(n/1000000).toFixed(2)}M`
  : n >= 1000  ? `$${(n/1000).toFixed(1)}K`
  : `$${n.toFixed(2)}`

export const fmtFull = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`



