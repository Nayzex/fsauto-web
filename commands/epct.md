---
description: Implement a feature using EPCT workflow (Explore, Plan, Code, Test)
argument-hint: <feature-description>
---

You are implementing a new feature following the EPCT workflow: Explore, Plan, Code, Test.

Feature to implement: $ARGUMENTS

# EPCT WORKFLOW

You MUST follow these phases sequentially and complete each phase before moving to the next.

---

## PHASE 1: EXPLORE

**Objective:** Gather all necessary context before planning.

**Your tasks:**
1. **Search for external information** if needed:
   - Use WebSearch to find documentation, best practices, or examples related to the feature
   - Use WebFetch to read specific documentation pages
   - Research similar implementations or patterns

2. **Understand the codebase context:**
   - Read CLAUDE.md to understand the project architecture
   - Use Grep to search for related code patterns, similar features, or relevant functions
   - Read key files that will be affected by this feature
   - Identify the data models, API endpoints, authentication patterns, or UI components involved
   - Check package.json for available dependencies

3. **Document your findings:**
   - Summarize what you learned about the feature requirements
   - List all relevant files and their purposes
   - Identify dependencies, constraints, or technical considerations

**Critical rules for Explore phase:**
- Be thorough - missing context leads to poor implementation
- Use multiple tools in parallel when possible for efficiency
- Don't make assumptions - verify everything by reading files
- If information is unclear, note it for clarification in the Plan phase

**When Explore is complete:** Explicitly state " EXPLORATION PHASE COMPLETE" and move to Plan phase.

---

## PHASE 2: PLAN

**Objective:** Create a comprehensive implementation plan and get user validation.

**Your tasks:**
1. **Create a detailed plan:**
   - Break down the feature into specific, actionable tasks
   - Identify which files need to be created or modified
   - Determine the sequence of implementation steps
   - Consider edge cases and error handling
   - Plan the data flow and component interactions

2. **Self-challenge and identify uncertainties:**
   - Critically examine your plan for potential issues
   - Identify ambiguities or areas where you need clarification
   - Question your assumptions about requirements or implementation details
   - Consider alternative approaches and their trade-offs

3. **Prepare questions for the user:**
   - List specific questions about unclear requirements
   - Ask about preferences when multiple valid approaches exist
   - Confirm assumptions about user expectations or business logic
   - Seek clarification on edge cases or error handling strategies

**Present your plan:**
- Use clear formatting with numbered steps
- Highlight files to be created/modified
- Include data schemas, component structure, or API signatures as relevant
- List your questions clearly and explicitly

**CRITICAL: STOP AND WAIT FOR USER VALIDATION**

You MUST stop here and ask the user:
- "Does this plan look correct?"
- "Should I proceed with this approach?"
- Present your questions and uncertainties
- Wait for explicit approval before moving to the Code phase

**Do NOT proceed to coding until the user approves the plan.**

---

## PHASE 3: CODE

**Objective:** Implement the feature according to the approved plan.

**Your tasks:**
1. **Implement systematically:**
   - Follow the approved plan step by step
   - Use TodoWrite to track your progress through implementation tasks
   - Mark tasks as in_progress and completed as you work
   - Create or modify files as planned

2. **Follow project patterns:**
   - Match the existing code style and conventions
   - Use the same patterns found in similar features
   - Respect the authentication, data access, and UI patterns from CLAUDE.md
   - Use TypeScript strict typing
   - Handle errors appropriately with toast notifications

3. **Be comprehensive:**
   - Implement all required functionality, not just the happy path
   - Add proper error handling and validation
   - Include appropriate loading states for async operations
   - Follow accessibility best practices

4. **Stay focused:**
   - Don't deviate from the approved plan without good reason
   - If you discover an issue with the plan, note it but complete the implementation
   - Maintain clear communication about what you're implementing

**When Code is complete:** Explicitly state " IMPLEMENTATION PHASE COMPLETE" and move to Test phase.

---

## PHASE 4: TEST

**Objective:** Verify the implementation using ONLY existing testing infrastructure.

**Your tasks:**
1. **Identify available testing commands:**
   - Read package.json to see available scripts (lint, build, test, etc.)
   - Check tsconfig.json for TypeScript configuration
   - Check eslint.config.mjs for linting setup
   - Note: This project may not have automated tests configured yet

2. **Run ONLY commands that exist:**
   - Execute `npm run lint` if available
   - Execute `npm run build` to check for TypeScript/build errors
   - Execute `npm run typecheck` if available
   - **NEVER** create new test files or test commands that don't exist
   - **NEVER** run test commands that aren't in package.json

3. **Fix any issues found:**
   - Address lint errors
   - Fix TypeScript compilation errors
   - Resolve build failures
   - Update code until all checks pass

4. **Manual testing guidance:**
   - Provide clear instructions for the user to manually test the feature
   - List the URLs to visit and actions to take
   - Describe expected behavior vs. error states
   - Remind user to check the browser console for errors

**When Test is complete:**
- Summarize what was tested
- Report results (all passing, or issues found and fixed)
- Provide manual testing instructions
- State " TESTING PHASE COMPLETE - EPCT WORKFLOW FINISHED"

---

## IMPORTANT REMINDERS

1. **Never skip phases** - each phase builds on the previous one
2. **Always STOP after Plan phase** - wait for user approval
3. **Be thorough in Explore** - context is critical for success
4. **Ask questions in Plan** - don't guess or hallucinate requirements
5. **Use TodoWrite during Code** - track your progress
6. **Only run existing tests** - never create phantom test infrastructure
7. **Think critically** - challenge your assumptions at every phase

Now begin with PHASE 1: EXPLORE for the feature: $ARGUMENTS
