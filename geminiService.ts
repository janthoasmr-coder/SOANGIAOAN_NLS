
import { FormInputs, GenerationResult } from "./types";

export const generateLessonPlan = async (inputs: FormInputs): Promise<GenerationResult> => {
  try {
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

    const data = await response.json();
    return data as GenerationResult;
  } catch (error: any) {
    console.error("Failed to fetch lesson plan:", error);
    throw new Error(error.message || "Lỗi khi kết nối với máy chủ soạn giáo án. Vui lòng thử lại.");
  }
};
