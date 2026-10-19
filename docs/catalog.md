# Diagram catalog

312 definitions across 24 categories. Each link opens the four files that define one endpoint. The main recipe is in `index.json`.

## Architecture

- [API resource diagram](../app/diagrams/architecture/api-resource-model) — An API resource diagram describes client-visible resources, supported operations, and navigable relationships without exposing internal storage.
- [Bounded context map](../app/diagrams/architecture/bounded-context-map) — A bounded context map shows where domain models apply and how separately owned models integrate or translate.
- [Container diagram](../app/diagrams/architecture/container-diagram) — A container diagram decomposes one system into applications and data stores with explicit responsibilities and communication paths.
- [Layered architecture diagram](../app/diagrams/architecture/layered-architecture) — A layered architecture diagram assigns software responsibilities to ordered layers and makes permitted dependency directions explicit.
- [Ports and adapters diagram](../app/diagrams/architecture/ports-and-adapters) — A ports and adapters diagram separates application behavior from the technologies that invoke it or fulfill its external needs.
- [Service dependency map](../app/diagrams/architecture/service-dependency-map) — A service dependency map shows observed or declared runtime calls between services for a specified environment and observation window.
- [System context diagram](../app/diagrams/architecture/system-context) — A system context diagram explains one software system through its users and directly connected external systems.
- [System landscape diagram](../app/diagrams/architecture/system-landscape) — A system landscape locates software systems and their relationships across a bounded organizational scope.

## Comparison

- [Bar chart](../app/diagrams/comparison/bar-chart) — Compares category magnitudes through bar lengths measured from a common zero baseline.
- [Bullet chart](../app/diagrams/comparison/bullet-chart) — Combines an actual value, a target marker, and qualitative reference ranges on one compact scale.
- [Diverging bar chart](../app/diagrams/comparison/diverging-bar-chart) — Shows signed category deviations with bars extending in opposite directions from a meaningful reference.
- [Dot plot](../app/diagrams/comparison/dot-plot) — Compares category values using dots on a common quantitative axis without encoding magnitude as bar length.
- [Dumbbell chart](../app/diagrams/comparison/dumbbell-chart) — Connects two comparable values within each category so direction and absolute change are visible.
- [Grouped bar chart](../app/diagrams/comparison/grouped-bar-chart) — Places subgroup bars side by side to compare values within and across categories.
- [Isotype chart](../app/diagrams/comparison/isotype-chart) — Represents category counts with repeated identical symbols, each corresponding to a declared quantity.
- [Pareto chart](../app/diagrams/comparison/pareto-chart) — Combines descending category counts with cumulative percentage to reveal how contributions concentrate.
- [Range bar chart](../app/diagrams/comparison/range-bar-chart) — Displays a measured interval per category through a bar spanning its lower and upper endpoints.
- [Slope chart](../app/diagrams/comparison/slope-chart) — Links category values across two positions to reveal changes in levels and relative order.
- [Waterfall chart](../app/diagrams/comparison/waterfall-chart) — Reconciles an opening total to a closing total through sequential additive increases and decreases.

## Composition

- [Alluvial diagram](../app/diagrams/composition/alluvial-diagram) — Tracks weighted cohorts across repeated categorical observations while preserving complete cohort paths.
- [Chord diagram](../app/diagrams/composition/chord-diagram) — Connects circular category arcs with ribbons whose widths encode weighted pairwise relationships.
- [Circle-packing chart](../app/diagrams/composition/circle-packing-chart) — Uses nested circles to expose hierarchical containment while sizing leaf circles by nonnegative quantities.
- [Diverging stacked bar chart](../app/diagrams/composition/diverging-stacked-bar-chart) — Arranges ordered response categories around a central reference to compare the balance of opposing responses.
- [Funnel chart](../app/diagrams/composition/funnel-chart) — Displays nested stage counts to compare remaining quantity and drop-off through a defined sequence.
- [Icicle chart](../app/diagrams/composition/icicle-chart) — Represents hierarchical composition with aligned rectangular bands whose widths encode subtree totals at successive depths.
- [Mosaic plot](../app/diagrams/composition/mosaic-plot) — Partitions a rectangle by two categorical variables so cell area represents their joint frequency.
- [100% stacked bar chart](../app/diagrams/composition/normalized-stacked-bar-chart) — Normalizes each category total to the same length so component proportions can be compared independently of total size.
- [Pie chart](../app/diagrams/composition/pie-chart) — Shows a small set of mutually exclusive shares as sectors of one complete whole.
- [Sankey diagram](../app/diagrams/composition/sankey-diagram) — Encodes directed quantities through nodes with link widths proportional to flow magnitude.
- [Stacked area chart](../app/diagrams/composition/stacked-area-chart) — Stacks additive time series into bands to show how total magnitude and composition change together.
- [Stacked bar chart](../app/diagrams/composition/stacked-bar-chart) — Divides zero-based category bars into additive component segments to show totals and composition together.
- [Streamgraph](../app/diagrams/composition/streamgraph) — Stacks time-varying components around a shifting baseline to emphasize changing band shapes rather than a fixed total axis.
- [Sunburst chart](../app/diagrams/composition/sunburst-chart) — Partitions concentric rings into angular spans that show a hierarchy’s additive composition by depth.
- [Treemap](../app/diagrams/composition/treemap) — Partitions a rectangle into nested areas proportional to additive values within a hierarchy.
- [Waffle chart](../app/diagrams/composition/waffle-chart) — Displays a share or composition as equal-sized cells in a fixed grid with a declared unit value.

## Data Engineering

- [Change-data-capture diagram](../app/diagrams/data-engineering/change-data-capture) — A change-data-capture diagram explains how committed database changes become downstream change events.
- [Data-flow diagram](../app/diagrams/data-engineering/data-flow) — A data-flow diagram describes how named data moves between external entities, transformations, and stores.
- [Data lake zone diagram](../app/diagrams/data-engineering/data-lake-zones) — A data lake zone diagram separates datasets by their processing guarantees and permitted promotion paths.
- [Data lineage diagram](../app/diagrams/data-engineering/data-lineage) — A data lineage diagram traces datasets or fields through the transformations that produced downstream information.
- [ETL pipeline diagram](../app/diagrams/data-engineering/etl-pipeline) — An ETL pipeline diagram explains the movement and transformation stages that convert source data into a usable destination.
- [Event-time window diagram](../app/diagrams/data-engineering/event-time-windows) — An event-time window diagram shows how events are assigned to windows and when results may be emitted or revised.
- [Feature store flow diagram](../app/diagrams/data-engineering/feature-store) — A feature store flow diagram distinguishes feature definition, historical retrieval, online materialization, and prediction-time lookup.
- [LSM tree diagram](../app/diagrams/data-engineering/lsm-tree) — An LSM tree diagram explains buffered writes, immutable sorted runs, and compaction under a specified storage-engine strategy.
- [Machine-learning pipeline diagram](../app/diagrams/data-engineering/machine-learning-pipeline) — A machine-learning pipeline diagram connects data preparation, training, evaluation, and versioned model artifacts through explicit gates.
- [Orchestration DAG](../app/diagrams/data-engineering/orchestration-dag) — An orchestration DAG shows task prerequisites that determine when work may run in a workflow.
- [Query execution plan](../app/diagrams/data-engineering/query-execution-plan) — A query execution plan displays the database operators selected to execute a query and their estimated or observed behavior.
- [Schema compatibility graph](../app/diagrams/data-engineering/schema-compatibility) — A schema compatibility graph shows which reader and writer versions can exchange data under a named compatibility rule.
- [Storage partition diagram](../app/diagrams/data-engineering/storage-partition) — A storage partition diagram shows how a logical dataset maps to partition ranges, files, and internal storage groups.
- [Stream processing topology](../app/diagrams/data-engineering/stream-processing) — A stream processing topology shows continuous event sources, operators, keyed state, and sinks.

## Data Models

- [B-tree index diagram](../app/diagrams/data-models/btree-index) — A B-tree index diagram shows ordered key ranges, internal routing pages, and leaf entries under an explicitly named implementation.
- [Data vault diagram](../app/diagrams/data-models/data-vault) — A data vault diagram separates business identities, their relationships, and descriptive history into hubs, links, and satellites.
- [Dimensional schema diagram](../app/diagrams/data-models/dimensional-schema) — A dimensional schema diagram organizes analytic facts around dimensions while stating the grain of each fact table.
- [Document schema diagram](../app/diagrams/data-models/document-schema) — A document schema diagram shows nested document shape, arrays, optional fields, and references between documents.
- [Entity relationship diagram](../app/diagrams/data-models/entity-relationship) — An entity relationship diagram models domain entities and the cardinality and optionality of their relationships.
- [Key-value access model](../app/diagrams/data-models/key-value-access-model) — A key-value access model relates application queries to partition keys, sort keys, item shapes, and secondary indexes.
- [Object-relational mapping diagram](../app/diagrams/data-models/object-relational-mapping) — An object-relational mapping diagram connects application types and members to their database tables, columns, and relationship mappings.
- [Ontology diagram](../app/diagrams/data-models/ontology-diagram) — An ontology diagram presents classes, properties, and logical axioms used to describe or infer domain knowledge.
- [Property graph schema diagram](../app/diagrams/data-models/property-graph-schema) — A property graph schema diagram defines node labels, relationship types, properties, and applicable graph constraints.
- [RDF graph](../app/diagrams/data-models/rdf-graph) — An RDF graph depicts statements as subject-predicate-object triples with resources and literal values distinguished.
- [Relational schema diagram](../app/diagrams/data-models/relational-schema) — A relational schema diagram documents tables, column types, keys, and enforced relationships in a specific database design.
- [Wide-column data model](../app/diagrams/data-models/wide-column-model) — A wide-column data model shows query-oriented tables, partition keys, clustering order, and replicated entity representations.

## Decisions

- [Analytic hierarchy process](../app/diagrams/decisions/analytic-hierarchy-process) — Structures a decision hierarchy and derives relative priorities from explicit pairwise comparisons of its elements.
- [Cynefin framework](../app/diagrams/decisions/cynefin-framework) — Distinguishes decision contexts so that leaders choose responses suited to ordered, complex, chaotic or unresolved conditions.
- [Decision requirements diagram](../app/diagrams/decisions/decision-requirements-diagram) — Separates business decisions from the input data, reusable knowledge and authorities needed to make them.
- [Decision tree](../app/diagrams/decisions/decision-tree) — Expands sequential choices and uncertain events into mutually distinguishable paths leading to decision consequences.
- [DMN decision table](../app/diagrams/decisions/dmn-decision-table) — Expresses a business decision as input conditions and output rules under an explicit matching policy.
- [Game tree](../app/diagrams/decisions/game-tree) — Models strategic choices in their move order while showing which histories each player can distinguish.
- [Influence diagram](../app/diagrams/decisions/influence-diagram) — Summarizes a decision problem through controllable choices, uncertain quantities, value objectives and informational dependencies.
- [Morphological chart](../app/diagrams/decisions/morphological-chart) — Generates solution concepts by combining alternative means of satisfying independently stated functions.
- [Payoff matrix](../app/diagrams/decisions/payoff-matrix) — Represents how jointly selected strategies determine each player's payoff in a simultaneous strategic interaction.
- [Pugh matrix](../app/diagrams/decisions/pugh-matrix) — Screens concepts by comparing each criterion with a shared reference concept using better, similar or worse judgments.
- [Risk matrix](../app/diagrams/decisions/risk-matrix) — Places defined risk scenarios on likelihood and consequence bands to guide discussion and response priorities.
- [Weighted decision matrix](../app/diagrams/decisions/weighted-decision-matrix) — Compares alternatives against explicit criteria and agreed importance weights to make evaluation reasoning inspectable.

## Diagnostics

- [Autocorrelation plot](../app/diagrams/diagnostics/autocorrelation-plot) — Displays correlation between a series and its lagged copies to reveal persistence, seasonality, and residual dependence.
- [Bland–Altman plot](../app/diagrams/diagnostics/bland-altman-plot) — Plots paired method differences against their means to assess bias and the spread of agreement.
- [Block plot](../app/diagrams/diagnostics/block-plot) — Compares treatment responses within nuisance-factor blocks to see whether a treatment effect persists across conditions.
- [Calibration curve](../app/diagrams/diagnostics/calibration-curve) — Compares predicted probabilities with observed outcome frequencies to assess whether probability statements match reality.
- [Cook’s distance plot](../app/diagrams/diagnostics/cooks-distance-plot) — Plots each observation’s Cook’s distance to reveal how strongly removing it could change the fitted regression.
- [CUSUM chart](../app/diagrams/diagnostics/cusum-chart) — Accumulates departures from a stable target to detect persistent small shifts that individual-value charts may miss.
- [EWMA chart](../app/diagrams/diagnostics/ewma-chart) — Monitors an exponentially weighted process statistic with uncertainty limits designed to detect gradual or small sustained shifts.
- [Individuals control chart](../app/diagrams/diagnostics/individuals-control-chart) — Monitors single sequential measurements with control limits estimated from a stable process baseline, often paired with a moving-range panel.
- [Interaction plot](../app/diagrams/diagnostics/interaction-plot) — Compares response profiles across factor combinations to reveal whether one factor’s effect depends on another.
- [Lag plot](../app/diagrams/diagnostics/lag-plot) — Plots each ordered observation against an earlier observation to reveal serial dependence and unusual sequence structure.
- [Leverage plot](../app/diagrams/diagnostics/leverage-plot) — Combines residual size and predictor leverage to identify observations that may strongly affect a fitted regression.
- [Main effects plot](../app/diagrams/diagnostics/main-effects-plot) — Compares average responses at each factor level to identify broad main effects across an experimental design.
- [p chart](../app/diagrams/diagnostics/p-chart) — Monitors the proportion of nonconforming units with control limits that reflect each sample’s denominator.
- [Partial autocorrelation plot](../app/diagrams/diagnostics/partial-autocorrelation-plot) — Shows association at each lag after accounting for intervening lags to support time-series model diagnosis.
- [Periodogram](../app/diagrams/diagnostics/periodogram) — Displays estimated signal power by frequency to identify recurring cycles in a regularly sampled series.
- [Precision-recall curve](../app/diagrams/diagnostics/precision-recall-curve) — Shows the tradeoff between precision and recall across decision thresholds for a binary scoring classifier.
- [P–P plot](../app/diagrams/diagnostics/probability-probability-plot) — Compares cumulative probabilities from two distributions on a common 0–1 scale to assess distributional agreement.
- [Quantile-quantile plot](../app/diagrams/diagnostics/quantile-quantile-plot) — Compares corresponding quantiles from two distributions to reveal location, scale, and shape differences.
- [Residual plot](../app/diagrams/diagnostics/residual-plot) — Plots model residuals against fitted values to expose systematic shape, changing spread, and unusual observations.
- [Residual sequence plot](../app/diagrams/diagnostics/residual-sequence-plot) — Shows fitted-model residuals in observation order to reveal drift, runs, cycles, and unmodeled serial structure.
- [ROC curve](../app/diagrams/diagnostics/roc-curve) — Traces true-positive rate against false-positive rate as a binary classifier’s decision threshold changes.
- [Scale-location plot](../app/diagrams/diagnostics/scale-location-plot) — Plots transformed residual magnitude against fitted values to reveal changes in residual spread.
- [X-bar and R chart](../app/diagrams/diagnostics/xbar-r-chart) — Pairs subgroup means and ranges to monitor process location and within-subgroup variation under rational sampling.
- [Youden plot](../app/diagrams/diagnostics/youden-plot) — Plots paired measurements from two test materials for each laboratory to separate shared shifts from inconsistent behavior.

## Distributed Systems

- [Causal-order diagram](../app/diagrams/distributed-systems/causal-order) — A causal-order diagram represents local event order and message-induced precedence without inventing a shared global clock.
- [Competing-consumer diagram](../app/diagrams/distributed-systems/competing-consumers) — A competing-consumer diagram shows multiple workers drawing work from one logical queue with explicit acknowledgment and retry behavior.
- [Consensus protocol diagram](../app/diagrams/distributed-systems/consensus-protocol) — A consensus protocol diagram shows how replicas agree on ordered state changes under a named algorithm and failure model.
- [Consistent hash ring](../app/diagrams/distributed-systems/consistent-hash-ring) — A consistent hash ring maps keys and node tokens into an ordered hash space to explain partition ownership and reassignment.
- [CQRS diagram](../app/diagrams/distributed-systems/cqrs) — A CQRS diagram separates command handling from query handling and makes synchronization between their models explicit.
- [Event sourcing diagram](../app/diagrams/distributed-systems/event-sourcing) — An event sourcing diagram shows state reconstructed from an authoritative ordered history of domain events.
- [Publish-subscribe diagram](../app/diagrams/distributed-systems/publish-subscribe) — A publish-subscribe diagram shows independent consumers receiving messages through channels or subscriptions rather than direct producer knowledge.
- [Quorum intersection diagram](../app/diagrams/distributed-systems/quorum-intersection) — A quorum intersection diagram explains which replica sets participate in reads and writes and whether their membership overlaps.
- [Replication topology](../app/diagrams/distributed-systems/replication-topology) — A replication topology identifies authoritative writers, replicas, and the paths that copy state between failure domains.
- [Request-reply diagram](../app/diagrams/distributed-systems/request-reply) — A request-reply diagram connects requests and responses across explicit channels using correlation and timeout rules.
- [Saga choreography diagram](../app/diagrams/distributed-systems/saga-choreography) — A saga choreography diagram shows participants advancing a distributed business transaction by reacting to events without a central coordinator.
- [Saga orchestration diagram](../app/diagrams/distributed-systems/saga-orchestration) — A saga orchestration diagram shows a coordinator directing local transactions and compensating actions across independently owned data.
- [Scatter-gather diagram](../app/diagrams/distributed-systems/scatter-gather) — A scatter-gather diagram distributes one request to several recipients and combines correlated responses under a completion policy.
- [Transaction schedule diagram](../app/diagrams/distributed-systems/transaction-schedule) — A transaction schedule diagram shows interleaved reads, writes, commits, and aborts to analyze concurrency behavior.
- [Transactional outbox diagram](../app/diagrams/distributed-systems/transactional-outbox) — A transactional outbox diagram ties a database change and an outgoing message record to one local transaction before asynchronous publication.
- [Two-phase commit diagram](../app/diagrams/distributed-systems/two-phase-commit) — A two-phase commit diagram shows participants preparing a distributed transaction before a coordinator decides commit or abort.

## Distribution

- [Beeswarm plot](../app/diagrams/distribution/beeswarm-plot) — Packs individual observations perpendicular to their numeric axis while preserving exact measured positions.
- [Box plot](../app/diagrams/distribution/box-plot) — Summarizes distributions with a median, quartile box, IQR-based whiskers, and separately marked outside observations.
- [Density plot](../app/diagrams/distribution/density-plot) — Estimates a continuous distribution with a smooth density curve whose area integrates to one.
- [ECDF](../app/diagrams/distribution/ecdf) — Shows the fraction of observed values at or below each numeric threshold without binning or smoothing.
- [Frequency polygon](../app/diagrams/distribution/frequency-polygon) — Connects binned frequencies at numeric bin midpoints to compare distribution shapes with less filled overlap.
- [Histogram](../app/diagrams/distribution/histogram) — Groups quantitative observations into adjacent intervals to show their frequency distribution.
- [Letter-value plot](../app/diagrams/distribution/letter-value-plot) — Extends the box plot with nested tail quantile intervals to reveal distribution structure in large samples.
- [Min–max box plot](../app/diagrams/distribution/minmax-box-plot) — Combines a quartile box and median with whiskers extending to the full observed minimum and maximum.
- [Population pyramid](../app/diagrams/distribution/population-pyramid) — Compares two population groups across ordered age bands with mirrored bars sharing a central origin.
- [Raincloud plot](../app/diagrams/distribution/raincloud-plot) — Combines a half-density, raw observation strip, and concise interval summary to expose complementary aspects of a distribution.
- [Ridgeline plot](../app/diagrams/distribution/ridgeline-plot) — Offsets distribution curves along ordered baselines to compare shape across many groups.
- [Rug plot](../app/diagrams/distribution/rug-plot) — Marks every observation with a short tick on a common numeric axis, usually as a compact marginal display.
- [Stem-and-leaf plot](../app/diagrams/distribution/stem-leaf-plot) — Groups numeric values by leading digits while retaining trailing digits as countable leaves.
- [Strip plot](../app/diagrams/distribution/strip-plot) — Shows individual numeric observations in category strips, using only perpendicular jitter to reduce occlusion.
- [Variable-bin histogram](../app/diagrams/distribution/variable-bin-histogram) — Uses unequal numeric bin widths while scaling heights so each bar area represents frequency or probability.
- [Violin plot](../app/diagrams/distribution/violin-plot) — Mirrors a density estimate within each group to show distribution shape and optionally a median or quartile summary.
- [Wilkinson dot plot](../app/diagrams/distribution/wilkinson-dot-plot) — Stacks equal-sized dots within numeric bins so the distribution is expressed through countable observations.

## Geography

- [Cadastral map](../app/diagrams/geography/cadastral-map) — Organizes land parcels and their identifiers using the jurisdiction's recorded boundary and tenure information.
- [Cartogram](../app/diagrams/geography/cartogram) — Resizes geographic regions to encode a quantity while deliberately trading away some shape, distance or positional fidelity.
- [Choropleth map](../app/diagrams/geography/choropleth-map) — Compares a normalized quantity across geographic regions by encoding its magnitude with ordered area fills.
- [Dot-density map](../app/diagrams/geography/dot-density-map) — Represents regional totals with a fixed number of units per dot to show approximate geographic concentration.
- [Geographic flow map](../app/diagrams/geography/geographic-flow-map) — Shows movement between geographic origins and destinations using spatially anchored paths and explicit direction or volume encodings.
- [Geologic map](../app/diagrams/geography/geologic-map) — Shows the distribution of geologic units and structures, distinguishing mapped rock relationships from a terrain-only view.
- [Isochrone map](../app/diagrams/geography/isochrone-map) — Shows locations reachable from or toward a specified place within defined travel-time thresholds under stated travel assumptions.
- [Isoline map](../app/diagrams/geography/isoline-map) — Connects locations of equal value to describe a continuous geographic field such as temperature, pressure or elevation.
- [Proportional-symbol map](../app/diagrams/geography/proportional-symbol-map) — Shows numeric magnitudes at geographic locations by scaling symbol area according to the represented quantity.
- [Reference map](../app/diagrams/geography/reference-map) — Shows the locations and relationships of selected physical and human features so that readers can orient themselves geographically.
- [Topographic map](../app/diagrams/geography/topographic-map) — Combines terrain elevation and recognizable surface features to explain landforms and support geographic orientation.
- [Transit map](../app/diagrams/geography/transit-map) — Emphasizes stations, route continuity and transfer opportunities while deliberately simplifying geographic shape and distance.

## Infrastructure

- [Artifact promotion diagram](../app/diagrams/infrastructure/artifact-promotion) — An artifact promotion diagram traces one immutable release artifact through registries and deployment environments with explicit qualification gates.
- [Backup and restore diagram](../app/diagrams/infrastructure/backup-recovery) — A backup and restore diagram connects protected resources, recovery artifacts, and the steps needed to restore a usable target.
- [CI/CD pipeline diagram](../app/diagrams/infrastructure/ci-cd-pipeline) — A CI/CD pipeline diagram shows automated jobs and gates that transform a source change into a deployable or deployed result.
- [Container image layer diagram](../app/diagrams/infrastructure/container-image-layers) — A container image layer diagram shows ordered filesystem changes and distinguishes immutable image content from a running container’s writable state.
- [Deployment diagram](../app/diagrams/infrastructure/deployment-diagram) — A deployment diagram maps software instances or artifacts onto execution nodes in a particular environment.
- [DNS resolution diagram](../app/diagrams/infrastructure/dns-resolution) — A DNS resolution diagram traces a query through resolver behavior, caches, delegation, and authoritative answers.
- [Failover topology](../app/diagrams/infrastructure/failover-topology) — A failover topology shows how traffic, write authority, and dependent services move when a failure domain becomes unavailable.
- [Filesystem tree diagram](../app/diagrams/infrastructure/filesystem-tree) — A filesystem tree diagram explains directory entries and path organization while marking links or mounts that depart from a simple tree.
- [Git history graph](../app/diagrams/infrastructure/git-history) — A Git history graph shows commits, parent relationships, and references without mistaking branch names for separate copies of history.
- [Infrastructure dependency graph](../app/diagrams/infrastructure/infrastructure-dependency) — An infrastructure dependency graph shows the prerequisites that constrain resource creation, updates, or destruction in an infrastructure plan.
- [Kubernetes ownership diagram](../app/diagrams/infrastructure/kubernetes-ownership) — A Kubernetes ownership diagram distinguishes resource owner references, selectors, and reconciliation responsibilities.
- [Kubernetes traffic-flow diagram](../app/diagrams/infrastructure/kubernetes-traffic) — A Kubernetes traffic-flow diagram traces a request through the selected entry, Service abstraction, endpoints, and workload path.
- [Logical network diagram](../app/diagrams/infrastructure/logical-network) — A logical network diagram shows addressing domains, routing relationships, gateways, and relevant overlay connectivity.
- [Packet format diagram](../app/diagrams/infrastructure/packet-format) — A packet format diagram assigns protocol fields to explicit bit or byte positions in a serialized message.
- [Physical network diagram](../app/diagrams/infrastructure/physical-network) — A physical network diagram documents devices, physical ports, and the actual links connecting them.
- [Service mesh diagram](../app/diagrams/infrastructure/service-mesh) — A service mesh diagram separates workload traffic handling from the control plane that supplies identity, policy, and routing configuration.
- [Tenant isolation diagram](../app/diagrams/infrastructure/tenant-isolation) — A tenant isolation diagram shows which resources tenants share, which they own separately, and where tenant context is enforced.
- [Traffic-shifting deployment diagram](../app/diagrams/infrastructure/traffic-shifting) — A traffic-shifting deployment diagram shows how a release changes request routing between versions under explicit promotion and rollback conditions.

## Multivariate

- [Andrews curves](../app/diagrams/multivariate/andrews-curves) — Transforms each multivariate record into a Fourier-series curve so similar records tend to produce similar curve shapes.
- [Biplot](../app/diagrams/multivariate/biplot) — Displays projected observations and variable loadings together to explain a low-dimensional multivariate representation.
- [Clustered heatmap](../app/diagrams/multivariate/clustered-heatmap) — Reorders a numeric matrix using hierarchical clustering and shows the resulting group structure with aligned dendrograms.
- [Correlation matrix](../app/diagrams/multivariate/correlation-matrix) — Summarizes pairwise association coefficients in a symmetric matrix with a common bounded scale.
- [Heatmap](../app/diagrams/multivariate/heatmap) — Maps a rectangular table of numeric values to cell colors so patterns across rows and columns can be compared.
- [Parallel coordinates](../app/diagrams/multivariate/parallel-coordinates) — Connects each record across parallel numeric axes to reveal multivariate profiles and relationships between adjacent variables.
- [Radar chart](../app/diagrams/multivariate/radar-chart) — Places multiple quantitative axes around a center and connects each record’s values into a profile polygon.
- [Scatterplot matrix](../app/diagrams/multivariate/scatterplot-matrix) — Arranges pairwise scatterplots in a matrix to reveal relationships among several quantitative variables.

## Organization

- [Organization chart](../app/diagrams/organization/organization-chart) — Shows formal reporting relationships and organizational units within a clearly defined institution or team.
- [Organizational network map](../app/diagrams/organization/organizational-network-map) — Reveals a defined pattern of informal relationships among people or teams beyond their formal reporting hierarchy.
- [RACI matrix](../app/diagrams/organization/raci-matrix) — Assigns performing, accountable, consulting and informed roles to specific activities or deliverables.
- [Skills matrix](../app/diagrams/organization/skills-matrix) — Cross-references people or roles with defined skills to expose capability coverage, development needs and reliance on individuals.
- [Sociocracy circle map](../app/diagrams/organization/sociocracy-circle-map) — Shows semi-autonomous governance circles, their domains and the leader-delegate links that connect related circles.
- [Stakeholder onion map](../app/diagrams/organization/stakeholder-onion-map) — Places stakeholder groups in contextual layers around an initiative to clarify involvement and surrounding organizational boundaries.
- [Stakeholder power-interest grid](../app/diagrams/organization/stakeholder-power-interest-grid) — Groups stakeholders by their ability to influence an initiative and their interest in its outcomes.
- [Team charter canvas](../app/diagrams/organization/team-charter-canvas) — Brings a team's purpose, membership, outcomes, operating agreements and boundaries into one shared visual working agreement.

## Planning

- [A3 report](../app/diagrams/planning/a3-report) — Arranges a concise problem-solving argument from current conditions and causes to countermeasures, implementation and follow-up.
- [Activity network](../app/diagrams/planning/activity-network) — Represents project activity dependencies so that feasible sequence, critical paths and schedule flexibility can be examined.
- [Critical-chain schedule](../app/diagrams/planning/critical-chain-schedule) — Shows a resource-feasible project chain and strategically placed buffers that protect completion from variation.
- [Dependency structure matrix](../app/diagrams/planning/dependency-structure-matrix) — Cross-references the same task or component set against itself to expose dependencies, coupled groups and possible iteration.
- [Gantt chart](../app/diagrams/planning/gantt-chart) — Places scheduled activities against calendar time so that duration, overlap, milestones and approved changes are visible.
- [Hoshin X matrix](../app/diagrams/planning/hoshin-x-matrix) — Relates long-term objectives, annual priorities, improvement initiatives, measures and ownership in a compact strategy-deployment view.
- [Impact-effort matrix](../app/diagrams/planning/impact-effort-matrix) — Compares candidate actions by anticipated benefit and implementation effort to guide a first prioritization conversation.
- [Kanban board](../app/diagrams/planning/kanban-board) — Visualizes work items in their actual workflow states together with policies and limits that support controlled flow.
- [Milestone roadmap](../app/diagrams/planning/milestone-roadmap) — Places significant delivery events and decision gates in time without expanding the full activity schedule.
- [Now-next-later roadmap](../app/diagrams/planning/now-next-later-roadmap) — Groups outcome-oriented initiatives by current focus, subsequent intent and longer-term options without inventing fixed delivery dates.
- [Process decision program chart](../app/diagrams/planning/process-decision-program-chart) — Extends a proposed plan with potential failures and countermeasures so that teams can prepare before execution.
- [Product breakdown structure](../app/diagrams/planning/product-breakdown-structure) — Decomposes a project's final result into the products and component deliverables that must exist for acceptance.
- [Risk breakdown structure](../app/diagrams/planning/risk-breakdown-structure) — Organizes potential risk sources hierarchically to support systematic identification and coverage reviews.
- [Work breakdown structure](../app/diagrams/planning/work-breakdown-structure) — Decomposes project scope into deliverable-oriented work packages that collectively account for the authorized work.

## Processes

- [BPMN choreography](../app/diagrams/processes/bpmn-choreography) — Defines the required ordering of participant interactions without exposing each party's internal workflow.
- [BPMN collaboration](../app/diagrams/processes/bpmn-collaboration) — Shows how autonomous participants coordinate business processes through messages across explicit organizational boundaries.
- [BPMN conversation](../app/diagrams/processes/bpmn-conversation) — Summarizes which participants communicate about related business topics while leaving message order and internal activities unspecified.
- [BPMN process](../app/diagrams/processes/bpmn-process) — Models the internal order of business activities, events and gateway choices within one participant.
- [Flowchart](../app/diagrams/processes/flowchart) — Explains a procedure through ordered actions, explicit decisions and clearly marked entry and exit points.
- [IDEF0 function model](../app/diagrams/processes/idef0-function-model) — Describes what an organization does by separating transformed inputs, governing controls, produced outputs and enabling mechanisms.
- [IDEF3 process description](../app/diagrams/processes/idef3-process-description) — Captures an expert's scenario of process behavior using units of behavior, precedence links and explicit junction semantics.
- [Process classification hierarchy](../app/diagrams/processes/process-classification-hierarchy) — Organizes business processes into increasingly specific categories so that teams can share scope, terminology and ownership.
- [SIPOC diagram](../app/diagrams/processes/sipoc) — Bounds a business process by linking its suppliers and inputs to major activities, outputs and receiving customers.
- [Spaghetti diagram](../app/diagrams/processes/spaghetti-diagram) — Traces observed physical movement over a workplace plan to reveal unnecessary travel, backtracking and handling.
- [Swimlane flowchart](../app/diagrams/processes/swimlane-flowchart) — Adds responsibility lanes to a procedural flow so that ownership and cross-role handoffs remain visible.
- [Value-stream map](../app/diagrams/processes/value-stream-map) — Relates material and information flows across an end-to-end value stream to expose waiting, inventory and production control.

## Product Research

- [Affinity diagram](../app/diagrams/product-research/affinity-diagram) — Groups individual observations or ideas by meaningful affinity to discover themes without imposing a predefined hierarchy.
- [Assumption map](../app/diagrams/product-research/assumption-map) — Prioritizes explicit assumptions by their importance to success and the strength of supporting evidence.
- [Customer journey map](../app/diagrams/product-research/customer-journey-map) — Shows one actor's actions, thoughts and feelings while pursuing a particular goal across relevant touchpoints.
- [Empathy map](../app/diagrams/product-research/empathy-map) — Organizes evidence about what a person says, thinks, does and feels in a specific situation.
- [Experience map](../app/diagrams/product-research/experience-map) — Models a broader human activity across contexts and providers to reveal needs beyond one organization's existing offer.
- [Forces of progress diagram](../app/diagrams/product-research/forces-of-progress) — Explains a customer's movement toward or away from change through the pushes, pulls, habits and anxieties present in a situation.
- [Hierarchical task analysis](../app/diagrams/product-research/hierarchical-task-analysis) — Breaks a user's goal into subtasks and explicit plans describing their order, conditions and repetition.
- [House of Quality](../app/diagrams/product-research/house-of-quality) — Translates prioritized customer needs into technical or service characteristics while making their relationships and conflicts visible.
- [Impact map](../app/diagrams/product-research/impact-map) — Connects a business goal to relevant actors, desired behavior changes and possible deliverables that could support those changes.
- [Job map](../app/diagrams/product-research/job-map) — Describes the functional job a person is trying to accomplish through solution-independent steps from preparation to conclusion.
- [Kano model](../app/diagrams/product-research/kano-model) — Distinguishes requirement types by how their fulfillment and absence affect customer satisfaction.
- [Lean UX Canvas](../app/diagrams/product-research/lean-ux-canvas) — Frames a product challenge as a business problem and links outcomes, user needs, solution ideas and testable hypotheses.
- [Mental model diagram](../app/diagrams/product-research/mental-model-diagram) — Organizes people's thinking and intentions into a research-based skyline and compares that model with available organizational support.
- [Opportunity solution tree](../app/diagrams/product-research/opportunity-solution-tree) — Connects one desired product outcome to researched customer opportunities, alternative solutions and the assumption tests used to evaluate them.
- [Persona profile](../app/diagrams/product-research/persona-profile) — Synthesizes a research-backed user pattern into a memorable profile of goals, behavior, needs and constraints.
- [Service blueprint](../app/diagrams/product-research/service-blueprint) — Relates a customer's service journey to visible staff actions, backstage work and supporting processes.
- [Service ecosystem map](../app/diagrams/product-research/service-ecosystem-map) — Shows the actors involved in a service and the distinct value, material or information exchanges that connect them.
- [Storyboard](../app/diagrams/product-research/storyboard) — Explains a situated experience through a short sequence of visual frames showing actors, context, actions and consequences.
- [Test card](../app/diagrams/product-research/test-card) — Defines a focused experiment by linking a testable hypothesis to a method, observable measure and advance success criterion.
- [User story map](../app/diagrams/product-research/user-story-map) — Arranges user activities and tasks into a narrative backbone with smaller options and coherent delivery slices beneath it.

## Relationships

- [Bubble chart](../app/diagrams/relationships/bubble-chart) — Extends a scatterplot with proportional symbol area to encode a third nonnegative quantitative variable.
- [Connected scatterplot](../app/diagrams/relationships/connected-scatterplot) — Connects paired numeric observations in a third ordering, usually time, to reveal a trajectory through value space.
- [Density contour plot](../app/diagrams/relationships/density-contour-plot) — Draws equal-density curves over paired observations to summarize the shape of a two-dimensional distribution.
- [Hexbin plot](../app/diagrams/relationships/hexbin-plot) — Aggregates dense paired observations into hexagonal cells whose color or area reveals local frequency.
- [2D histogram](../app/diagrams/relationships/histogram-2d) — Counts paired observations within a rectangular numeric grid to show a joint distribution.
- [Regression plot](../app/diagrams/relationships/regression-plot) — Overlays a fitted relationship on observed paired data to show model form and departures.
- [Scatterplot](../app/diagrams/relationships/scatterplot) — Plots paired numeric observations to reveal association, clusters, and departures from a relationship.

## Security

- [Attack graph](../app/diagrams/security/attack-graph) — An attack graph connects security conditions and assets through feasible steps an adversary could chain together.
- [Attack tree](../app/diagrams/security/attack-tree) — An attack tree decomposes an adversary goal into alternative or jointly required subgoals.
- [Authorization graph](../app/diagrams/security/authorization-graph) — An authorization graph connects principals, policies, actions, and resources to explain possible or effective access.
- [Data protection map](../app/diagrams/security/data-protection) — A data protection map identifies where information is plaintext or encrypted and who controls the relevant encryption keys.
- [Identity federation diagram](../app/diagrams/security/identity-federation) — An identity federation diagram shows which systems accept identity assertions from which providers and under what trust configuration.
- [Merkle tree](../app/diagrams/security/merkle-tree) — A Merkle tree diagram shows how leaf hashes combine into a root and how a compact proof establishes membership under stated hashing rules.
- [Network segmentation map](../app/diagrams/security/network-segmentation) — A network segmentation map groups workloads into security zones and states which directional connections policy allows.
- [OAuth authorization diagram](../app/diagrams/security/oauth-authorization) — An OAuth authorization diagram shows protocol roles, browser redirects, code exchange, and token use for a selected grant.
- [PKI certificate chain](../app/diagrams/security/pki-chain) — A PKI certificate chain diagram connects a subject certificate through issuers to a configured trust anchor.
- [Role-permission matrix](../app/diagrams/security/role-permission-matrix) — A role-permission matrix compares defined permissions across roles while keeping assignment and inheritance rules explicit.
- [Secret distribution diagram](../app/diagrams/security/secret-distribution) — A secret distribution diagram traces how authenticated workloads obtain, refresh, and revoke narrowly scoped credentials.
- [Software supply-chain provenance graph](../app/diagrams/security/supply-chain-provenance) — A software supply-chain provenance graph traces a released artifact to its source, dependencies, builder, and attested build process.
- [Threat-model data-flow diagram](../app/diagrams/security/threat-model-data-flow) — A threat-model data-flow diagram adds security-relevant trust boundaries and assumptions to information flows, processes, stores, and external entities.
- [Zero-trust policy diagram](../app/diagrams/security/zero-trust-policy) — A zero-trust policy diagram separates access decisions, policy administration, and enforcement around a protected resource.

## Software Behavior

- [Activity diagram](../app/diagrams/software-behavior/activity-diagram) — An activity diagram models token flow through actions, decisions, and concurrent paths in a behavior.
- [Communication diagram](../app/diagrams/software-behavior/communication-diagram) — A communication diagram emphasizes collaborating participants while numbering messages to express one interaction’s order.
- [Interaction overview diagram](../app/diagrams/software-behavior/interaction-overview) — An interaction overview diagram coordinates referenced interactions using activity-style control flow.
- [Petri net](../app/diagrams/software-behavior/petri-net) — A Petri net models concurrent behavior through places, transitions, tokens, and explicitly defined firing rules.
- [Sequence diagram](../app/diagrams/software-behavior/sequence-diagram) — A sequence diagram orders messages among participants for a bounded interaction scenario.
- [State machine diagram](../app/diagrams/software-behavior/state-machine) — A state machine diagram defines an entity’s stable states and the events, guards, and effects that permit transitions.
- [Timing diagram](../app/diagrams/software-behavior/timing-diagram) — A timing diagram plots participant states or values against an explicit time axis and timing constraints.
- [Use case diagram](../app/diagrams/software-behavior/use-case) — A use case diagram relates external actors to goals offered by a system within a declared subject boundary.

## Software Structure

- [Abstract syntax tree](../app/diagrams/software-structure/abstract-syntax-tree) — An abstract syntax tree represents the semantic syntactic structure of source code without retaining every punctuation token.
- [Call graph](../app/diagrams/software-structure/call-graph) — A call graph connects functions or methods according to possible or observed calls.
- [Class diagram](../app/diagrams/software-structure/class-diagram) — A class diagram describes types, their members, and structural relationships using explicitly chosen UML notation.
- [Component diagram](../app/diagrams/software-structure/component-diagram) — A component diagram shows implementation units, their responsibilities, and the interfaces through which they collaborate.
- [Composite structure diagram](../app/diagrams/software-structure/composite-structure) — A composite structure diagram describes the internal roles and connections of a structured classifier.
- [Control-flow graph](../app/diagrams/software-structure/control-flow-graph) — A control-flow graph represents possible transfers of execution between basic blocks within a program region.
- [Domain aggregate diagram](../app/diagrams/software-structure/domain-aggregate) — A domain aggregate diagram shows the entity boundary that protects invariants and the root through which changes are made.
- [Heap object graph](../app/diagrams/software-structure/heap-object-graph) — A heap object graph shows objects and references relevant to reachability or memory retention at a captured instant.
- [Module dependency graph](../app/diagrams/software-structure/module-dependency) — A module dependency graph maps source modules and the imports or references that couple them.
- [Object diagram](../app/diagrams/software-structure/object-diagram) — An object diagram illustrates a concrete configuration of instances and links at a stated moment.
- [Package diagram](../app/diagrams/software-structure/package-diagram) — A package diagram describes namespace organization and package-level relationships rather than runtime communication.
- [Profile diagram](../app/diagrams/software-structure/profile-diagram) — A profile diagram defines a controlled UML vocabulary through stereotypes, metaclass extensions, properties, and constraints.
- [Program dependence graph](../app/diagrams/software-structure/program-dependence) — A program dependence graph exposes which operations depend on values and which depend on control decisions.
- [Railroad diagram](../app/diagrams/software-structure/railroad-diagram) — A railroad diagram expresses a grammar rule as traversable paths through tokens, alternatives, optional branches, and repetition.

## Strategy

- [Ansoff matrix](../app/diagrams/strategy/ansoff-matrix) — Distinguishes growth directions by whether products and markets are existing or new relative to a defined business.
- [BCG matrix](../app/diagrams/strategy/bcg-matrix) — Positions business units by market growth and relative market share to support portfolio allocation discussions.
- [Business Model Canvas](../app/diagrams/strategy/business-model-canvas) — Shows how a specific business model creates, delivers and captures value through nine interdependent building blocks.
- [GE–McKinsey matrix](../app/diagrams/strategy/ge-mckinsey-matrix) — Evaluates business units using composite industry attractiveness and competitive strength rather than growth and share alone.
- [Lean Canvas](../app/diagrams/strategy/lean-canvas) — Summarizes a startup's risky business-model assumptions with explicit attention to problems, solutions, metrics and defensibility.
- [PESTLE analysis](../app/diagrams/strategy/pestle-analysis) — Organizes external macro-environmental forces into six domains to examine their strategic implications over a stated horizon.
- [Porter Five Forces](../app/diagrams/strategy/porter-five-forces) — Examines the structural forces that shape competition and the distribution of economic value within an industry.
- [Strategy diamond](../app/diagrams/strategy/strategy-diamond) — Brings five linked strategic choices together to test whether a business has a coherent overall strategy.
- [Strategy map](../app/diagrams/strategy/strategy-map) — Connects strategic objectives through an explicit value-creation hypothesis, often across balanced-scorecard perspectives.
- [SWOT analysis](../app/diagrams/strategy/swot-analysis) — Separates internal strengths and weaknesses from external opportunities and threats relevant to a defined strategic objective.
- [TOWS matrix](../app/diagrams/strategy/tows-matrix) — Generates strategic options by deliberately matching internal strengths and weaknesses with external opportunities and threats.
- [Value chain](../app/diagrams/strategy/value-chain) — Disaggregates an organization's strategically relevant activities to examine sources of cost advantage and differentiation.
- [Value Proposition Canvas](../app/diagrams/strategy/value-proposition-canvas) — Relates a customer segment's jobs, pains and gains to the offer's products, pain relievers and gain creators.
- [Wardley map](../app/diagrams/strategy/wardley-map) — Positions a chain of user needs and supporting capabilities by visibility and market evolution to support strategic choices.

## Systems Thinking

- [Bow-tie diagram](../app/diagrams/systems-thinking/bow-tie-diagram) — Connects threats to a loss-of-control event and onward consequences, separating preventive controls from recovery controls.
- [Causal-loop diagram](../app/diagrams/systems-thinking/causal-loop-diagram) — Expresses a hypothesis about how variables influence one another through reinforcing and balancing feedback loops.
- [Event tree](../app/diagrams/systems-thinking/event-tree) — Works forward from an initiating event through successive protection successes or failures to distinct consequence sequences.
- [Fault tree](../app/diagrams/systems-thinking/fault-tree) — Works backward from an undesired top event to the combinations of lower-level failures that could produce it.
- [Fishbone diagram](../app/diagrams/systems-thinking/fishbone-diagram) — Organizes plausible contributing causes beneath a clearly stated effect to guide a structured investigation.
- [Force-field analysis](../app/diagrams/systems-thinking/force-field-analysis) — Places forces supporting and restraining a proposed change in opposing groups to identify practical ways to shift the situation.
- [Iceberg model](../app/diagrams/systems-thinking/iceberg-model) — Connects visible events with recurring patterns, underlying structures and mental models to deepen investigation of a persistent situation.
- [Interrelationship diagram](../app/diagrams/systems-thinking/interrelationship-diagram) — Explores directional influences among problem factors to identify promising drivers and outcomes for further investigation.
- [Logic model](../app/diagrams/systems-thinking/logic-model) — Summarizes how program resources and activities are expected to produce direct outputs and progressively longer-term outcomes.
- [Rich picture](../app/diagrams/systems-thinking/rich-picture) — Brings multiple perspectives, relationships, tensions and contextual features of a messy situation into an exploratory visual account.
- [Stock-and-flow diagram](../app/diagrams/systems-thinking/stock-and-flow-diagram) — Separates accumulating quantities from the rates that change them and the information relationships governing those rates.
- [Theory of change](../app/diagrams/systems-thinking/theory-of-change) — Explains how and why an intervention is expected to produce a long-term outcome through intermediate conditions and explicit assumptions.

## Time Series

- [Area chart](../app/diagrams/time-series/area-chart) — Fills the space between a time series and a meaningful baseline to emphasize quantitative magnitude over time.
- [Bump chart](../app/diagrams/time-series/bump-chart) — Tracks changes in ordered rank over time while deliberately discarding absolute numeric gaps.
- [Calendar heatmap](../app/diagrams/time-series/calendar-heatmap) — Positions daily observations in a calendar grid so weekday and seasonal patterns are visible.
- [Candlestick chart](../app/diagrams/time-series/candlestick-chart) — Summarizes each time interval with opening and closing values inside a body and full observed high–low wicks.
- [Difference chart](../app/diagrams/time-series/difference-chart) — Highlights the signed gap between two aligned quantitative series across time.
- [Event raster](../app/diagrams/time-series/event-raster) — Places discrete event marks on parallel entity rows to reveal timing, bursts, and synchronization.
- [Horizon chart](../app/diagrams/time-series/horizon-chart) — Folds equal-sized positive and negative value bands onto a compact time strip using ordered color intensity.
- [Indexed line chart](../app/diagrams/time-series/indexed-line-chart) — Rebases multiple time series to a common reference so proportional change can be compared across different initial levels.
- [Lasagna plot](../app/diagrams/time-series/lasagna-plot) — Encodes many aligned time series as colored cells, retaining temporal patterns while avoiding crossing paths.
- [Line chart](../app/diagrams/time-series/line-chart) — Connects time-ordered measurements to show the direction and rate of change in a quantitative series.
- [Seasonal overlay plot](../app/diagrams/time-series/seasonal-overlay-plot) — Overlays repeated cycles on a common seasonal axis to compare their timing, shape, and magnitude.
- [Seasonal subseries plot](../app/diagrams/time-series/seasonal-subseries-plot) — Groups repeated seasonal positions into separate mini time series to reveal both seasonal differences and within-season trends.
- [Step chart](../app/diagrams/time-series/step-chart) — Shows a quantity that remains constant between observations and changes at discrete effective times.

## Uncertainty

- [Confidence band](../app/diagrams/uncertainty/confidence-band) — Places a defined uncertainty interval around an estimated curve across a continuous predictor or time axis.
- [Ensemble trajectory plot](../app/diagrams/uncertainty/ensemble-trajectory-plot) — Draws coherent sampled trajectories to show possible joint behavior across a forecast or predictor range.
- [Error bar chart](../app/diagrams/uncertainty/error-bar-chart) — Shows point estimates with explicitly defined intervals so location and uncertainty can be compared together.
- [Fan chart](../app/diagrams/uncertainty/fan-chart) — Displays a forecast distribution through nested probability intervals that often widen with forecast horizon.
- [Forest plot](../app/diagrams/uncertainty/forest-plot) — Compares study or subgroup effect estimates with intervals and optionally a weighted pooled effect.
- [Gradient interval plot](../app/diagrams/uncertainty/gradient-interval-plot) — Shows an uncertainty distribution through a density-colored strip combined with explicit interval and point summaries.
- [Kaplan–Meier curve](../app/diagrams/uncertainty/kaplan-meier-curve) — Estimates the probability of remaining event-free over time while accounting for right-censored observations.
- [Quantile dotplot](../app/diagrams/uncertainty/quantile-dotplot) — Represents a probability distribution with equally weighted dots placed at selected quantiles and stacked into readable columns.
