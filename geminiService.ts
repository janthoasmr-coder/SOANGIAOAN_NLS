import { FormInputs, GenerationResult } from "./types";

export const generateLessonPlan = async (inputs: FormInputs): Promise<GenerationResult> => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return await response.json() as GenerationResult;
};