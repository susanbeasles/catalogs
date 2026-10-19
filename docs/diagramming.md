# Diagramming practice

The picture should let someone answer a concrete question without reading a wall of text. These rules combine the user's layout requirements, our house defaults, and the primary sources linked below. Numeric spacing defaults are design choices, not claims about an industry standard.

## Choose the question, then the view

Write one sentence: “After seeing this, the reader can explain ___.” Identify the audience, scope, and whether this is the current system, a proposal, or a comparison. Choose the smallest view that answers that sentence.

| Reader's question | Start with | Keep out of that view |
| --- | --- | --- |
| Who uses this system, and what does it interact with? | System context | Internal classes and deployment replicas |
| Which applications and stores own which responsibilities? | Container or responsibility view | Every method and network appliance |
| How does one capability work internally? | Component view | Unrelated applications and enterprise detail |
| What happens, in what order, for this scenario? | Sequence or communication view | Every possible scenario at once |
| Where does this run in this environment? | Deployment view | Unverified redundancy or infrastructure |
| What records move, change, and persist? | Data-flow or lineage view | Long field lists inside nodes |
| How do entities relate? | Entity relationship view | Temporal ordering implied by arbitrary positioning |
| How do values compare or vary? | A chart with an appropriate quantitative encoding | Decorative architecture symbols |

Do not create every view automatically. Link a focused overview to the one detail view that resolves the reader's next question. A C4 container is an application or data store; it does not necessarily mean a Docker container. A logical group, a trust boundary, a deployment environment, and a team ownership boundary have different meanings. Name the boundary explicitly.

## Establish the facts before drawing

Make a short working inventory of entities and relationships from the provided evidence. Preserve the user's domain names. Record facts, assumptions, proposals, and unknowns separately. If ownership, protocol, retention, or volume is unknown, leave it unknown rather than adding plausible infrastructure.

A node should communicate its identity, kind when ambiguous, and principal responsibility. A relationship should communicate the interaction or the data moving in its direction. “API → DB” says little; “Catalog API → Definition store: reads definitions” explains intent. Protocol detail belongs in the relationship only when it helps the decision.

Use different diagrams for “is part of,” “calls,” “happens after,” and “is deployed on” when combining them creates ambiguous arrows. Shape position alone must not imply order, priority, throughput, or trust.

## Layout requirements

The following are release requirements for technical relationship diagrams:

- No connector crossings. Reorder nodes or reserve separate lanes before adding bends. When the graph cannot fit cleanly, split it into views. A shared, explicitly modeled junction is different from two independent lines touching.
- No arrows, connectors, or shape boundaries across text. A white fill placed over a collision is not a reliable repair. Move the text or route the connector through free space.
- No text sitting on a boundary stroke. Group titles get a dedicated header area; content gets a padded interior. Put boundary labels above or inside the boundary with clear separation from the stroke.
- No overlapping peer nodes, clipped labels, or connectors passing through unrelated nodes.
- No dense paragraphs in nodes. Use short domain names and brief responsibilities. Detailed schemas, constraints, and operational explanations belong in the companion definition.

These are starting dimensions in Excalidraw scene units, around 100% zoom:

| Space | Starting minimum |
| --- | ---: |
| Label to its node's inner edge | 16 |
| Child content to a group boundary | 24 |
| Top band inside a group for its title | 48 |
| Connector to text | 8 |
| Boundary stroke to text | 4 |
| Gap between sibling nodes | 40 |
| Separate parallel routing lanes | 24 |

Increase space to accommodate the actual font, line weight, arrowhead, and export size. These numbers do not guarantee perceptual clearance. For example, two thick hand-drawn strokes need more room than thin geometric lines. The final rendered image determines whether the result is readable.

Place nodes first, boundary envelopes second, connectors third, labels fourth. Then recheck all four together. Use consistent alignment and comparable node sizes for comparable roles. Extra box size should reflect required content space, not imply capacity. Keep a clear reading direction—often left to right for architecture and pipelines, top to bottom for branching workflows. Reserve outer lanes for feedback and error paths. Keep routing lanes out of boundary headers.

Use ports that express the reading direction: right to left for a left-to-right relationship, bottom to top for a vertical flow. Bind endpoints to the target shapes so edits keep the relationship attached. Multiple outgoing edges should fan out with distinct ports and lanes. Avoid a bundle of overlapping connectors that appears to be one relationship.

Before accepting a crossing, try: reorder siblings; change orientation; move an external actor to the receiving side; allocate an outer lane; replace repeated detail with a linked view. Do not delete a real relationship to make the picture prettier.

## Text and visual hierarchy

Use a title that states the subject and view. Prefer one font family, three size levels, restrained line weights, and a small palette. A useful starting point is 30-unit titles, 20-unit node labels, and 18-unit edge labels. Inspect at the actual delivery size; a huge canvas scaled down to fit a document can make these unreadable.

Aim for one or two label lines. Three short lines can work when type or responsibility matters. The geometry auditor flags labels beyond three lines or 100 characters for review; that is a diagnostic threshold, not permission to fill every box to the limit. Wrap at phrase boundaries. Grow the node before shrinking its font. Use a compact legend only for meaningful notation; avoid an extra legend for self-explanatory names.

Use color consistently for a single chosen meaning, with a text or shape cue carrying the same information. Avoid assigning one color to ownership in one frame and lifecycle state in another. Aim for 4.5:1 contrast for ordinary text and 3:1 for essential graphical boundaries against adjacent colors. Check actual exported colors and provide a short textual explanation of the diagram's meaning. This supports accessibility; it does not alone certify WCAG conformance.

## Data-flow and dataset diagrams

Model the record and its lifecycle, not just the machines. Establish the grain: one row or object represents what? Identify the primary identifier, foreign relationships, cardinality, source of truth, and the field or event that indicates a state change. Add provenance and the user's important constraints in the companion definition.

For each relevant flow, establish producer, consumer, payload, transformation, persistence, and failure outcome. Separate a command asking for action from an event recording that something happened. An asynchronous arrow should not imply exactly-once processing. Show retry, rejection, duplicate handling, and dead-letter routes only when supported by the implementation or explicitly proposed.

For a strict data-flow diagram, use processes, stores, external entities, and named data flows with a consistent notation. A data store does not itself perform a transformation; show the responsible process. If a detailed view decomposes a parent process, retain the parent view's external inputs and outputs. Distinguish a control dependency from a flow of records.

Keep field details out of the main diagram. Put a compact record shape beside the view or in its definition: `Definition {slug, category, blurb, keywords, sources}`. Describe uniqueness, nullability, cardinality, retention, and provenance there. Use synthetic examples when explaining shape. Never copy private records into a public diagram catalog.

## Quantitative charts require additional discipline

Choose the encoding for the question: position for precise comparison, distribution plots for spread, interval marks for uncertainty, and composition views when the denominator is meaningful. Label units, period, population, aggregation, and missingness. Do not infer causality from correlation or compare percentages with incompatible denominators.

Avoid visual effects that distort magnitude. Bar lengths generally need a zero baseline; a line chart may use a narrower clearly labeled range when changes are the question. Show uncertainty when it affects interpretation. Record bin widths, smoothing choices, normalization, and logarithmic scales when used.

Some charts intrinsically contain crossings or overlaps—line series, parallel coordinates, chord diagrams, and geographic networks are examples. Do not falsify the underlying values to remove them. Prefer small multiples, facets, filtering, adjacency matrices, or a different chart when the user's no-crossing preference can be met that way. A catalog recipe must identify this conflict explicitly.

## Worked repair: an ingestion diagram

Suppose the question is “Where do imported definitions become trusted catalog entries?” A weak version has boxes labeled `Input`, `Processor`, `DB`, `Errors`, with long paragraphs and every arrow crossing the center. It leaves the record shape and rejection outcome unclear.

A stronger version uses a left-to-right chain: `Source files` → `Validate definitions` → `Accepted definitions` → `Catalog index`. Name the main edges `raw definitions`, `valid definitions`, and `indexed definitions`. Put `Rejected definitions` below validation and route that failure branch downward in a separate lane. Give `Catalog index` a short store label; do not add an imaginary database server. The companion blurb explains slug uniqueness, schema checks, source provenance, and what causes rejection.

Wrap the validation and indexing stages in a named `Catalog build` boundary, with a 48-unit title band and 24-unit inner padding. Keep the source outside it if the diagram means to distinguish authoring input from build responsibility. That boundary does not automatically represent a security boundary. The review should be able to explain the accepted and rejected outcomes without reading the implementation.

## Review and preservation

Review semantic correctness before styling. Then run geometry checks against the native scene, render the entire scene, and inspect each frame at reading size. After fixes, take a fresh rendering. A clean geometry report cannot verify font metrics, curved paths, rotated elements, visual clutter, or the truth of the system model.

Treat any remaining crossing, text collision, clipping, unexplained boundary, or unsupported relationship as unfinished. A numerical quality score must not override these failures. If rendering is unavailable, report that limitation explicitly instead of calling the layout verified.

Keep the editable native scene, embedded image files, and an integrity manifest. A PNG is a presentation artifact; it is not an editable backup. A hash-verified export proves bytes were preserved, while a successful restore into a new scene adds recovery evidence. Never overwrite the source scene merely to test recovery.

## Sources and distinction from house rules

View selection and notation draw on the [C4 model](https://c4model.com/diagrams/notation), its [review checklist](https://c4model.com/diagrams/checklist), and its context, container, dynamic, and deployment view documentation. DFD boundary reasoning is supported by [OWASP's threat-modeling guidance](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html). Contrast and redundant color cues follow [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), and [use of color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color).

Excalidraw mechanics—native labels, persisted IDs, temporary IDs, bound connectors, semantic diagram generation, screenshots—come from the [Plus MCP tool guide](https://plus.excalidraw.com/docs/mcp/tools) and [scene schema](https://plus.excalidraw.com/docs/api/scene-content-schema). Specific spacing, text-density thresholds, no-crossing requirements, and release criteria above are our house practice, including the user's explicit requirements.
