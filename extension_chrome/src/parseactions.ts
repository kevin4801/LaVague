import { fromError } from 'zod-validation-error';
import { toolSchemaUnion } from './actionSchemas';

// sometimes AI replies with a JSON wrapped in triple backticks
export function extractJsonFromMarkdown(input: string): string[] {
    // Create a regular expression to capture code wrapped in triple backticks
    const regex = /```(json)?\s*([\s\S]*?)\s*```/g;

    const results = [];
    let match;
    while ((match = regex.exec(input)) !== null) {
        // If 'json' is specified, add the content to the results array
        if (match[1] === 'json') {
            results.push(match[2]);
        } else if (match[2].startsWith('{')) {
            results.push(match[2]);
        }
    }
    return results;
}

export function parseResponse(text: string) {
    let action;
    const action_list = [];
    try {
        action = JSON.parse(text);
    } catch (_e) {
        try {
            action = JSON.parse(extractJsonFromMarkdown(text)[0]);
        } catch (_e) {
            throw new Error('Response does not contain valid JSON.');
        }
    }

    for (let i = 0; i < action.length; i++) {
        const act = action[i];
        console.log(act);

        if (act.action == null) {
            throw new Error('Invalid response: Action is required');
        }

        let operation;
        try {
            operation = toolSchemaUnion.parse(act.action);
        } catch (err) {
            const validationError = fromError(err);
            // user friendly error message
            throw new Error(validationError.toString());
        }

        const res = {
            thought: act.thought,
            operation,
        };

        action_list.push(res);
    }

    return action_list;
}
