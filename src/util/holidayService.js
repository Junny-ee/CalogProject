// src/util/holidayService.js

import axios from "axios";

const SERVICE_KEY = import.meta.env.VITE_HOLIDAY_API_KEY;
console.log("서비스 키:", SERVICE_KEY);

const BASE_URL =
  "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";

/**
//  * 2020~2030년 전체 공휴일을 병렬로 가져옵니다.
 * @param {number} startYear
 * @param {number} endYear
 * @returns {Promise<Array>} 공휴일 일정 객체 배열
 */
export async function getHolidayEventsByYears(
  startYear = 2020,
  endYear = new Date().getFullYear() + 2 // ← 현재연도 기준 +2년
) {
  const allRequests = [];

  for (let year = startYear; year <= endYear; year++) {
    for (let month = 1; month <= 12; month++) {
      const params = {
        solYear: year,
        solMonth: month.toString().padStart(2, "0"),
        _type: "json",
        ServiceKey: SERVICE_KEY,
      };

      const url = BASE_URL;

      allRequests.push(
        axios
          .get(url, { params })
          .then((response) => {
            const items = response.data.response.body.items?.item;
            if (!items) return [];

            const monthlyHolidays = Array.isArray(items) ? items : [items];

            return monthlyHolidays.map((h) => ({
              title: h.dateName,
              start: new Date(
                h.locdate
                  .toString()
                  .replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
              ),
              end: new Date(
                h.locdate
                  .toString()
                  .replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
              ),
              allDay: true,
              isHoliday: true,
            }));
          })
          .catch((err) => {
            console.error(`❌ ${year}년 ${month}월 공휴일 실패:`, err);
            return [];
          })
      );
    }
  }

  // 병렬로 한꺼번에 요청 보내기
  const results = await Promise.all(allRequests);

  // 2차원 배열 → 평탄화(flatten)
  return results.flat();
}
