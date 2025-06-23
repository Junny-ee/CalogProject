import axios from "axios";

const SERVICE_KEY = import.meta.env.VITE_HOLIDAY_API_KEY;
console.log("서비스 키:", SERVICE_KEY);
const BASE_URL =
  "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService";

/**
 * 공공데이터포털 API에서 공휴일 데이터를 불러옵니다.
 * @param {number} year - 조회할 연도 (기본값: 올해)
 * @returns {Promise<Array>} 공휴일 일정 객체 배열
 */
export async function getHolidayEvents(year = new Date().getFullYear()) {
  const url = `${BASE_URL}/getHoliDeInfo`;
  const params = {
    solYear: year,
    solMonth: "", // 전체 월 다 가져오기
    _type: "json",
    ServiceKey: SERVICE_KEY,
  };

  try {
    const response = await axios.get(url, { params });
    const items = response.data.response.body.items.item;
    const holidays = Array.isArray(items) ? items : [items];

    // 일정 형식 맞게 변환 (react-big-calendar에 맞게)
    return holidays.map((h) => ({
      title: h.dateName,
      start: new Date(
        h.locdate.toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
      ),
      end: new Date(
        h.locdate.toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
      ),
      allDay: true,
      isHoliday: true,
    }));
  } catch (err) {
    console.error("공휴일 데이터 가져오기 실패:", err);
    return [];
  }
}
