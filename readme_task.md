Must
- NOT redesign the UI.
- NOT change the color palette.
- NOT modify typography.
- NOT change spacing unless required.
- NOT rename routes.
- NOT rename Angular components.
- NOT introduce new libraries.
- Keep Angular architecture unchanged.
- Maintain both light and dark themes.
- Preserve responsive behavior.
- Preserve all existing functionality.
- Never generate fake engineering assets or placeholder proof.

Always
- Audit the current implementation.
- Explain how proof/evidence is currently represented.
- List only the required changes.
- Implement only those changes.
- Report modified files.
- Suggest a Git commit message.

Objective
Strengthen the credibility of the portfolio by introducing an Engineering Proof section.
The purpose is NOT to add marketing content.
The purpose is to demonstrate real engineering capability using actual project artifacts.

Guidelines
The Engineering Proof section must support real assets only.
If an asset does not exist, it must not be rendered.
Never display fake screenshots, placeholder images, dummy repositories, or sample URLs.
The implementation should make it very easy to add future proof items by simply updating JSON.

Create a reusable data model.
Suggested JSON
content
    engineeringProof
        architectureDiagrams
        githubRepositories
        swaggerApis
Only these three categories should be implemented before deployment.
Future categories may be added later without changing the component.
Architecture Diagrams
Support
- id
- title
- description
- thumbnail
- fullImage
- technologies
- category
GitHub Repository
Support
- repositoryName
- description
- url
- technologies
- status
- featured
Swagger APIs
Support
- title
- description
- url
- service
- version
Rendering
Create a new reusable Engineering Proof section.
Display categories only if they contain data.
If a category is empty, do not render it.
No empty cards.
No "Coming Soon".
No placeholders.
Architecture Diagrams
Display as image cards.
Each card should support
- preview image
- title
- short description
- technology badges
GitHub
Display
- repository name
- short description
- technology badges
- GitHub button
Swagger
Display
- service name
- version
- description
- Open Swagger button
Current Content
Populate the Engineering Proof section only with real assets already available in the project.
If an item cannot be verified from the current repository, leave that category empty.
Do not invent content.
Placement
Place the Engineering Proof section naturally within the portfolio where it best supports credibility.
The UI should remain consistent with the existing design system.
No visual redesign.
Acceptance Criteria
✓ UI design remains unchanged.
✓ Navigation remains unchanged.
✓ Existing pages remain unchanged.
✓ Engineering Proof is fully data-driven.
✓ Empty categories are automatically hidden.
✓ Future proof items can be added by editing JSON only.
Deliverables
1. Updated JSON schema.
2. Updated interfaces/models.
3. New reusable Engineering Proof component.
4. Rendering logic.
5. Migration summary.
6. Modified file list.
7. Suggested Git commit message.

One recommendation based on experience
I would not implement this as a completely separate page before deployment.
Instead, integrate it into your existing Case Studies page. A case study becomes much stronger when each project includes its supporting evidence:
Business Problem
Solution
Architecture Diagram
GitHub Repository
Swagger API
Technologies Used
That way, the proof is directly tied to the work it validates. This creates a stronger narrative than having a standalone "Proof" page where unrelated artifacts are collected in one place. It also scales naturally as you add more case studies over time.