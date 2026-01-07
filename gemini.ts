
import { GoogleGenAI, Type } from "@google/genai";

const SCHEMA = {
  type: Type.OBJECT,
  required: [
    "form_inputs",
    "lesson_plan",
    "digital_competency_map",
    "quality_checklist",
    "giao_an_markdown"
  ],
  properties: {
    form_inputs: {
      type: Type.OBJECT,
      required: ["ten_bai_day", "khoi_lop", "so_tiet", "ghi_chu"],
      properties: {
        ten_bai_day: { type: Type.STRING },
        khoi_lop: { type: Type.INTEGER },
        so_tiet: { type: Type.INTEGER },
        ghi_chu: { type: Type.STRING }
      }
    },
    lesson_plan: {
      type: Type.OBJECT,
      required: ["thong_tin_chung", "muc_tieu", "thiet_bi", "tien_trinh", "huong_dan_ve_nha"],
      properties: {
        thong_tin_chung: {
          type: Type.OBJECT,
          required: ["dong_dau_trang", "tieu_de_bai", "mon_lop_thoi_luong"],
          properties: {
            dong_dau_trang: { type: Type.ARRAY, items: { type: Type.STRING } },
            tieu_de_bai: { type: Type.STRING },
            mon_lop_thoi_luong: { type: Type.STRING }
          }
        },
        muc_tieu: {
          type: Type.OBJECT,
          required: ["kien_thuc", "nang_luc", "nang_luc_so", "pham_chat"],
          properties: {
            kien_thuc: { type: Type.ARRAY, items: { type: Type.STRING } },
            nang_luc: {
              type: Type.OBJECT,
              required: ["nang_luc_chung", "nang_luc_dac_thu_toan"],
              properties: {
                nang_luc_chung: { type: Type.ARRAY, items: { type: Type.STRING } },
                nang_luc_dac_thu_toan: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            nang_luc_so: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["ma", "mo_ta", "dia_chi_tich_hop"],
                properties: {
                  ma: { 
                    type: Type.STRING,
                    description: "Mã NLS. Quy tắc: Lớp 6-7 dùng đuôi TC1 (VD: 1.1.TC1a); Lớp 8-9 dùng đuôi TC2 (VD: 5.2.TC2b)."
                  },
                  mo_ta: { type: Type.STRING },
                  dia_chi_tich_hop: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      required: ["hoat_dong", "muc_do", "minh_chung"],
                      properties: {
                        hoat_dong: { type: Type.STRING },
                        muc_do: { type: Type.STRING },
                        minh_chung: { type: Type.STRING }
                      }
                    }
                  }
                }
              }
            },
            pham_chat: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        },
        thiet_bi: {
          type: Type.OBJECT,
          required: ["giao_vien", "hoc_sinh"],
          properties: {
            giao_vien: { type: Type.ARRAY, items: { type: Type.STRING } },
            hoc_sinh: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        },
        tien_trinh: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            required: ["ten_phan", "loai_phan", "cac_hoat_dong"],
            properties: {
              ten_phan: { type: Type.STRING },
              loai_phan: { type: Type.STRING },
              cac_hoat_dong: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  required: ["ten_hoat_dong", "muc_tieu", "noi_dung", "san_pham", "to_chuc_thuc_hien_2_cot", "danh_gia_thuong_xuyen", "tich_hop_nls", "phuong_an_khong_thiet_bi"],
                  properties: {
                    ten_hoat_dong: { type: Type.STRING },
                    muc_tieu: { type: Type.ARRAY, items: { type: Type.STRING } },
                    noi_dung: { type: Type.STRING },
                    san_pham: { type: Type.STRING },
                    to_chuc_thuc_hien_2_cot: {
                      type: Type.OBJECT,
                      required: ["hoat_dong_gv_hs", "san_pham_du_kien"],
                      properties: {
                        hoat_dong_gv_hs: {
                          type: Type.OBJECT,
                          required: ["buoc_1", "buoc_2", "buoc_3", "buoc_4"],
                          properties: {
                            buoc_1: { type: Type.STRING },
                            buoc_2: { type: Type.STRING },
                            buoc_3: { type: Type.STRING },
                            buoc_4: { type: Type.STRING }
                          }
                        },
                        san_pham_du_kien: {
                          type: Type.OBJECT,
                          required: ["tom_tat", "kien_thuc_moi", "vi_du", "bai_tap"],
                          properties: {
                            tom_tat: { type: Type.STRING },
                            kien_thuc_moi: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { loai: { type: Type.STRING }, noi_dung: { type: Type.STRING } } } },
                            vi_du: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { de_bai: { type: Type.STRING }, loi_giai_chi_tiet: { type: Type.STRING } } } },
                            bai_tap: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { de_bai: { type: Type.STRING }, loi_giai_chi_tiet: { type: Type.STRING } } } }
                          }
                        }
                      }
                    },
                    danh_gia_thuong_xuyen: { type: Type.ARRAY, items: { type: Type.STRING } },
                    tich_hop_nls: { type: Type.ARRAY, items: { type: Type.STRING } },
                    phuong_an_khong_thiet_bi: { type: Type.STRING }
                  }
                }
              }
            }
          }
        },
        huong_dan_ve_nha: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },
    digital_competency_map: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        required: ["hoat_dong", "ma_nls", "bieu_hien", "cong_cu_so", "minh_chung"],
        properties: {
          hoat_dong: { type: Type.STRING },
          ma_nls: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Mã NLS có định dạng X.Y.TC1[a/b/c] (lớp 6-7) hoặc X.Y.TC2[a/b/c] (lớp 8-9)."
          },
          bieu_hien: { type: Type.ARRAY, items: { type: Type.STRING } },
          cong_cu_so: { type: Type.ARRAY, items: { type: Type.STRING } },
          minh_chung: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    },
    quality_checklist: {
      type: Type.OBJECT,
      required: ["dung_bo_cuc_mau", "co_danh_gia_thuong_xuyen", "co_dia_chi_nls", "khong_qua_tai", "ghi_chu_loi_neu_co"],
      properties: {
        dung_bo_cuc_mau: { type: Type.BOOLEAN },
        co_danh_gia_thuong_xuyen: { type: Type.BOOLEAN },
        co_dia_chi_nls: { type: Type.BOOLEAN },
        khong_qua_tai: { type: Type.BOOLEAN },
        ghi_chu_loi_neu_co: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },
    giao_an_markdown: { type: Type.STRING }
  }
};

const SYSTEM_INSTRUCTION = `Bạn là Chatbot soạn Kế hoạch bài dạy (giáo án) môn Toán THCS theo Công văn 5512 và tích hợp năng lực số (NLS) theo Công văn 3456/BGDĐT-GDPT năm 2025.

QUY TẮC ĐỊNH DẠNG MÃ NĂNG LỰC SỐ (NLS) THEO KHỐI LỚP:
1) Đối với khối lớp 6 và 7 (Mức độ Sơ cấp): 
   - Mã NLS PHẢI có chứa cụm "TC1" và ký hiệu thành phần (a, b, c...).
   - Ví dụ: 1.1.TC1a, 2.3.TC1b, 3.1.TC1c.
2) Đối với khối lớp 8 và 9 (Mức độ Trung cấp): 
   - Mã NLS PHẢI có chứa cụm "TC2" và ký hiệu thành phần (a, b, c...).
   - Ví dụ: 1.2.TC2a, 5.2.TC2b, 4.3.TC2c.
3) Tuyệt đối không nhầm lẫn giữa TC1 (6-7) và TC2 (8-9).

CẤU TRÚC GIÁO ÁN (5512):
1) Phải đầy đủ các mục: Thông tin chung, I. Mục tiêu, II. Thiết bị, III. Tiến trình, V. Hướng dẫn về nhà.
2) Mục d) Tổ chức thực hiện trong mỗi hoạt động phải trình bày 4 bước: Bước 1 (Chuyển giao), Bước 2 (Thực hiện), Bước 3 (Báo cáo/thảo luận), Bước 4 (Kết luận/nhận định).
3) Cột "Sản phẩm dự kiến" phải trình bày lời giải chi tiết của các ví dụ, bài tập được nêu ở cột bên trái.
4) Dùng LaTeX ($...$ hoặc $$...$$) cho công thức toán học.`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { inputs } = req.body;
    if (!inputs) {
      return res.status(400).json({ error: 'Missing inputs in request body' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `Hãy soạn giáo án cực kỳ chi tiết cho bài: ${inputs.ten_bai_day}.
    Khối lớp: ${inputs.khoi_lop}. 
    
    YÊU CẦU QUAN TRỌNG VỀ NLS:
    ${inputs.khoi_lop && inputs.khoi_lop <= 7 
      ? "Khối lớp 6/7: Dùng mã NLS dạng X.Y.TC1 (ví dụ 3.1.TC1a, 1.1.TC1b)." 
      : "Khối lớp 8/9: Dùng mã NLS dạng X.Y.TC2 (ví dụ 5.2.TC2b, 4.3.TC2a)."}
      
    Thời lượng: ${inputs.so_tiet} tiết.
    Yêu cầu thêm: ${inputs.ghi_chu || "Không có"}.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: SCHEMA,
        temperature: 0.2,
        thinkingConfig: { thinkingBudget: 24000 }
      },
    });

    const text = response.text || "{}";
    const result = JSON.parse(text);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
